"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLink, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "../buttons/LogoutButton";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";
import Logo from "@/assets/logo.png";
import Copy from "@/assets/Copy.png";

export default function AppHeader({ session, page }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Save buttons functionality
  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings saved!");
    window.location.reload();
  }

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (page) {
      const textToCopy = `droppp.link/${page.uri}`;
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          toast.success("Copied to clipboard!");
        },
        (err) => {
          toast.error("Failed to copy text.");
          console.error(err);
        }
      );
    } else {
      toast.error("No text available to copy.");
    }
  };

  return (
    <header className="flex justify-between items-center bg-white p-2  fixed top-0 w-full z-30 border-b">
      {/* Left: Page Link */}
      <div className="flex items-center gap-2 p-2 text-md text-black font-medium">
        {/* Logo */}
        <Image src={Logo} width={16} height={16} alt="Droppp Logo" />

        {/* Page Link */}
        {page && (
          <Link
            target="_blank"
            href={"/" + page.uri}
            className="flex items-center gap-1 hover:underline"
          >
            <span className="font-bold text-lg">droppp.link</span>
            <span className="font-bold text-lg">/{page.uri}</span>
          </Link>
        )}

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="hover:bg-gray-100 rounded-full"
          aria-label="Copy to clipboard"
        >
          <Image src={Copy} width={40} height={40} alt="Copy Icon" />
        </button>
      </div>

      {/* Right: Save and Publish + Profile Section */}
      <div className="flex items-center gap-4">
       
        {/* <button
          onClick={saveButtons}
          className="bg-[#9333EA] hover:bg-purple-700 text-white px-4 py-2 rounded-3xl font-medium"
        >
          Save and Publish
        </button> */}

        {/* Profile Section */}
        {session && (
          <div className="flex items-center gap-2 relative">
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt="User avatar"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Dropdown Icon */}
            <button
              className="focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-500" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-16 w-32 bg-white border-2 rounded shadow-lg z-50">
                <LogoutButton
                  iconLeft={true}
                  className="flex gap-4 p-2 items-center hover:font-bold"
                  iconClasses="w-6 h-6"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
