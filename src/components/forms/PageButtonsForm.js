'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faEnvelope, faGripLines, faMobile, faPlus, faSave, faTrash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
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
    // State for toggling the container visibility
    const [isOpen, setIsOpen] = useState(true);

    // Ensure page.buttons exists before trying to access it
    const pageButtons = page?.buttons || {};
    const pageSaveButtonKeys = Object.keys(pageButtons);
    const pageSaveButtonKeysInfo = pageSaveButtonKeys.map((key) =>
        allButtons.find((b) => b.key === key)
    );

    const [activeButtons, setActiveButtons] = useState(pageSaveButtonKeysInfo);

    // Handle adding a new button to the profile
    function addButtonToProfile(button) {
        setActiveButtons((prevButtons) => [...prevButtons, button]);
    }

    const availableButtons = allButtons.filter(
        (b1) => !activeButtons.find((b2) => b1.key === b2.key)
    );

    // Save button data
    async function saveButtons(formData) {
        await savePageButtons(formData);
        toast.success('Settings saved!');
        window.location.reload(); 
    }

    // Remove a button from the active list
    function removeButton({ key: keyToRemove }) {
        setActiveButtons((prevButtons) => {
            return prevButtons.filter((b) => b.key !== keyToRemove);
        });
    }

    // Function to handle the link input changes and format the links properly
    function handleLinkChange(event, platform) {
      let { value } = event.target;
      value = value.trim();  // Trim any spaces
  
      let fullLink = '';
      switch (platform.key) {
          case 'whatsapp':
              fullLink = `https://wa.me/${value}`;
              break;
          case 'instagram':
              fullLink = `https://www.instagram.com/${value}`;
              break;
          case 'facebook':
              fullLink = `https://www.facebook.com/${value}`;
              break;
          case 'linkedin':
              fullLink = `https://www.linkedin.com/in/${value}`;
              break;
          case 'discord':
              fullLink = `https://discord.com/users/${value}`;
              break;
          case 'youtube':
              fullLink = `https://www.youtube.com/channel/${value}`;
              break;
          case 'github':
              fullLink = `https://github.com/${value}`;
              break;
          case 'telegram':
              fullLink = `https://t.me/${value}`;
              break;
          default:
              fullLink = value;
      }
      console.log(`Full link for ${platform.label}: ${fullLink}`);
      return fullLink; 
    }

    return (
        <div className="bg-white rounded-lg mt-16  shadow-lg p-4  ">
            <form action={saveButtons}>
                {/* Section Title with Dropdown Icon */}
                <div className="text-left border-b-2 mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Social Links</h2>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600"
                    >
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                    </button>
                </div>

                {/* Container Content */}
                {isOpen && (
                    <>
                        {/* Active Buttons List */}
                        <ReactSortable
                            list={activeButtons}
                            setList={setActiveButtons}
                            handle=".handle"
                            animation={150}
                        >
                            {activeButtons.map((b) => (
                                <div key={b.key} className="flex items-center gap-4 mb-4 border-b pb-2">
                                    <div className="flex items-center gap-2 w-1/3">
                                        <FontAwesomeIcon icon={faGripLines} className="cursor-pointer text-gray-400 handle" />
                                        <FontAwesomeIcon icon={b.icon} className="text-blue-600" />
                                        <span className="text-gray-800">{b.label}</span>
                                    </div>
                                    <input
                                        placeholder={b.placeholder}
                                        name={b.key}
                                        className="flex-grow rounded border border-gray-300 text-gray-700"
                                        defaultValue={pageButtons[b.key] || ''}
                                        type="text"
                                        onBlur={(e) => {
                                            const fullLink = handleLinkChange(e, b);
                                        }}
                                    />
                                    <button
                                        onClick={() => removeButton(b)}
                                        type="button"
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                        </ReactSortable>

                        {/* Available Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
                            {availableButtons.map((b) => (
                                <button
                                    type="button"
                                    key={b.key}
                                    onClick={() => addButtonToProfile(b)}
                                    className="flex items-center justify-evenly gap-2 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                                >
                                    <FontAwesomeIcon icon={b.icon} className="text-blue-600" />
                                    <span className="text-gray-700">{b.label}</span>
                                    <FontAwesomeIcon icon={faPlus} className="text-gray-500" />
                                </button>
                            ))}
                        </div>

                        {/* Save Button */}
                        <div className="mt-8 flex justify-center">
                            <SubmitButton>
                            
                                <span>Save</span>
                            </SubmitButton>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
