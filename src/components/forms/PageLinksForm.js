'use client'; 
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import SectionBox from "../layout/SectionBox";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({page,user}) {
    const [links, setLinks] = useState(page.links ||[]);

    function handleLinkChange(keyOfLinkChange, prop, ev) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach((link) => {
                if (link.key === keyOfLinkChange) {
                    link[prop] = ev.target.value;
                }
            });
            return newLinks;
        });
    }

    function addNewLink() {
        setLinks(prev => [
            ...prev, 
            {
                key: Date.now().toString() + Math.random().toString(), // Ensure a more unique key
                title: '',
                subtitle: '',
                icon: '',
                url: ''
            }
        ]);
    }

    async function save(ev) {
        ev.preventDefault(); // Prevent default form submission behavior
    
        await savePageLinks(links);
   toast.success('Links Added!')
    }

    function removeLink(linkKeyToRemove) {
        setLinks(prevLinks => [...prevLinks.filter(link => link.key !== linkKeyToRemove)]);
        toast.success('Link Removed!')
    }

    return (
        <SectionBox>
            <form onSubmit={save}>
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <button type="button" onClick={addNewLink} className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer">
                    <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
                    <span>Add new link</span>
                </button>
                <div className="">
                    <ReactSortable list={links} setList={setLinks}>
                        {links.map(l => (
                            <div key={l.key} className="mt-8 flex gap-2 items-center">
                                <div>
                                    <FontAwesomeIcon className="text-gray-700 mr-2 cursor-move" icon={faGripLines} />
                                </div>
                                <div className="text-center">
                                    <div className="bg-gray-300 p-4 rounded-full inline-block">
                                        <FontAwesomeIcon icon={faLink} />
                                    </div>
                                    <div className="mt-2 mb-2">
                                        <label type="button" className="border rounded justify-center flex items-center  gap-1  p-3 mb-2">
                                            <FontAwesomeIcon icon={faCloudArrowUp} />
                                            Change Icon
                                        </label>
                                    </div>
                                    
                                        <button
                                        onClick={() => removeLink(l.key)}
                                        type="button " className="rounded bg-gray-300 py-2 px-2 mb-2 h-full flex gap-1 items-center"><FontAwesomeIcon icon={faTrash} />
                                        <span>Remove this link</span>
                                        </button>
                                
                                </div>
                                <div className="grow">
                                <label className="input-label">Title:</label>
                                    <input value={l.title} onChange={ev => handleLinkChange(l.key, 'title', ev)} type="text" placeholder="Title" />
                                    <label className="input-label">Subtitle:</label>
                                    <input value={l.subtitle} onChange={ev => handleLinkChange(l.key, 'subtitle', ev)} type="text" placeholder="Subtitle (optional)" />
                                    <label className="input-label">Url:</label>
                                    <input value={l.url} onChange={ev => handleLinkChange(l.key, 'url', ev)} type="text" placeholder="URL" />
                                </div>
                               
                            </div>
                        ))}
                    </ReactSortable>
                </div>
                <div className="border-t pt-4 mt-4 max-w-xs mx-auto">
                    <SubmitButton>
                        <FontAwesomeIcon icon={faSave} />
                        <span>Save</span>
                    </SubmitButton>
                </div>
            </form>
        </SectionBox>
    );
}
