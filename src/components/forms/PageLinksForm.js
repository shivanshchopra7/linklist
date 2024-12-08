'use client';
import { useState, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTrash, faPen, faCaretDown, faCaretUp, faChevronUp, faChevronDown, faSave } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { savePageLinks } from "@/actions/pageActions";

export default function PageLinksForm({ page }) {
    const [links, setLinks] = useState(page.links || []);
    const [menuOpen, setMenuOpen] = useState(null);
    const [editKey, setEditKey] = useState(null);
    const [newLinkKey, setNewLinkKey] = useState(null);
    const [containerOpen, setContainerOpen] = useState(true); // State to track container visibility
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLinkChange = (key, prop, value) => {
        if (prop === 'url') {
            // Check if the user has removed the https:// prefix, and prevent it from being prepended again
            if (value && !/^https?:\/\//i.test(value) && !value.startsWith('https://')) {
                value = 'https://' + value; // Prepend 'https://' only if not already present
            }
        }
        setLinks((prev) =>
            prev.map((link) => (link.key === key ? { ...link, [prop]: value } : link))
        );
    };
    
    

    const addNewLink = () => {
        const newKey = Date.now().toString();
        setLinks((prev) => [
            ...prev,
            { key: newKey, title: "", url: "", enabled: true }
        ]);
        setNewLinkKey(newKey);
        setEditKey(newKey);
    };

    const toggleEnabled = (key) => {
        setLinks((prev) =>
            prev.map((link) =>
                link.key === key ? { ...link, enabled: !link.enabled } : link
            )
        );
    };

    const saveLinks = async (ev) => {
        ev.preventDefault();
        await savePageLinks(links);
        toast.success("Links saved!");
        window.location.reload(); 
    };

    const deleteLink = (key) => {
        setLinks((prev) => prev.filter((link) => link.key !== key));
        toast.success("Link deleted!");
    };

    const startEditing = (key) => {
        setEditKey(key);
        setMenuOpen(null);
    };

    const stopEditing = () => {
        setEditKey(null);
        setNewLinkKey(null);
    };

    return (
        <div className="bg-white rounded-lg mt-6 mb-6 shadow-lg p-4  ">
            <div className="text-left border-b-2 mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Custom Links</h2>
                <button
                    onClick={() => setContainerOpen(!containerOpen)} // Toggle container visibility
                    className="text-gray-600 focus:outline-none"
                >
                    <FontAwesomeIcon icon={containerOpen ? faChevronUp : faChevronDown} />
                </button>
            </div>

            {containerOpen && ( // Conditional rendering based on the state of containerOpen
                <form onSubmit={saveLinks}>
                    <ReactSortable list={links} setList={setLinks}>
                        {links.map((link) => (
                            <div
                                key={link.key}
                                className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-4 shadow-sm"
                                ref={menuRef}
                            >
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setMenuOpen((prev) => (prev === link.key ? null : link.key));
                                        }}
                                        className="text-gray-600 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </button>
                                    {menuOpen === link.key && (
                                        <div className="absolute bg-white border shadow-md rounded-lg p-2 mt-2 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    startEditing(link.key);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <FontAwesomeIcon icon={faPen} className="mr-2" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteLink(link.key);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {editKey === link.key || newLinkKey === link.key ? (
                                    <div className="flex-grow flex flex-col gap-2 ml-4">
                                        <input
                                            type="text"
                                            value={link.title}
                                            onChange={(e) => handleLinkChange(link.key, "title", e.target.value)}
                                            className="border rounded-lg p-2 text-gray-700"
                                            placeholder="Link Title"
                                        />
                                        <input
                                            type="text"
                                            value={link.url}
                                            onChange={(e) => handleLinkChange(link.key, "url", e.target.value)}
                                            className="border rounded-lg p-2 text-gray-700"
                                            placeholder="Link URL"
                                        />
                                        <button
                                            type="button"
                                            onClick={stopEditing}
                                            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-600 transition"
                                        >
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex-grow ml-4">
                                        <div className="text-gray-800 text-md font-semibold">
                                            {link.title || "Untitled Link"}
                                        </div>
                                    </div>
                                )}

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={link.enabled}
                                        onChange={() => toggleEnabled(link.key)}
                                        className="toggle-checkbox hidden"
                                    />
                                    {/* <div
                                        className={`toggle-label block w-12 h-6 rounded-full ${link.enabled ? "bg-purple-600" : "bg-gray-300"} relative`}
                                    >
                                        <span
                                            className={`dot absolute w-4 h-4 bg-white rounded-full top-1 left-1 transition ${link.enabled ? "translate-x-6" : ""}`}
                                        ></span>
                                    </div> */}
                                </label>
                            </div>
                        ))}
                    </ReactSortable>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={addNewLink}
                            className="text-blue-500 hover:text-blue-600 font-semibold"
                        >
                            + Add New Link
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                        >
                        
                            <span>Save</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
