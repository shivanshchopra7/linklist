'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faTelegram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";



export const allButtons = [
    { key: 'email', label: 'e-mail', icon: faEnvelope, placeholder: 'name@example.com' },
    { key: 'mobile', label: 'mobile', icon: faMobile, placeholder: '+1234567890' },
    { key: 'instagram', label: 'instagram', icon: faInstagram, placeholder: 'username' },
    { key: 'whatsapp', label: 'whatsapp', icon: faWhatsapp, placeholder: '+1234567890' },
    { key: 'facebook', label: 'facebook', icon: faFacebook, placeholder: 'username' },
    { key: 'linkedin', label: 'linkedin', icon: faLinkedin, placeholder: 'username' },
    { key: 'discord', label: 'discord', icon: faDiscord, placeholder: 'username' },
    { key: 'youtube', label: 'youtube', icon: faYoutube, placeholder: 'Channel Link' },
    { key: 'github', label: 'github', icon: faGithub, placeholder: 'username' },
    { key: 'telegram', label: 'telegram', icon: faTelegram },
];
export default function PageButtonsForm({ user, page }) {


    // Ensure page.buttons exists before trying to access it
    const pageButtons = page?.buttons || {};

    // Get the keys of the saved buttons
    const pageSaveButtonKeys = Object.keys(pageButtons);

    // Get button details from the keys
    const pageSaveButtonKeysInfo = pageSaveButtonKeys.map((key) =>
        allButtons.find((b) => b.key === key)
    );

    // Set the initial state of active buttons to what's already saved
    const [activeButtons, setActiveButtons] = useState(pageSaveButtonKeysInfo);

    function addButtonToProfile(button) {
        setActiveButtons((prevButtons) => {
            return [...prevButtons, button];
        });
    }

    const availableButtons = allButtons.filter(
        (b1) => !activeButtons.find((b2) => b1.key === b2.key)
    );

    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
    }

    function removeButton({ key: keyToRemove }) {
        setActiveButtons((prevButtons) => {
            return prevButtons.filter((b) => b.key !== keyToRemove);
        });
    }

    return (
        <SectionBox>
            <form action={saveButtons}>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>

                <ReactSortable
                    list={activeButtons} 
                    setList={setActiveButtons} 
                    handle=".handle" 
                    animation={150}
                >
                    {activeButtons.map((b) => (
                        <div key={b.key} className="mb-4 flex items-center">
                            <div className="w-48 capitalize flex p-2 h-full gap-2 items-center">
                                <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400 handle" />
                                <FontAwesomeIcon icon={b.icon} />
                                <span className="capitalize">{b.label} :</span>
                            </div>

                            <input
                                placeholder={b.placeholder}
                                name={b.key}
                                defaultValue={pageButtons[b.key] || ''}
                                type="text"
                                style={{ marginBottom: '0' }}
                            />

                            <button
                                onClick={() => removeButton(b)}
                                type="button" className="py-2 px-4 bg-gray-300 cursor-pointer">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </ReactSortable>

                <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
                    {availableButtons.map((b) => (
                        <button
                            type="button"
                            key={b.key}
                            onClick={() => addButtonToProfile(b)}
                            className="flex items-center gap-1 p-2 bg-gray-200"
                        >
                            <FontAwesomeIcon icon={b.icon} />
                            <span className="capitalize">{b.label}</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    ))}
                </div>

                <div className="mt-4 max-w-xs mx-auto">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}
