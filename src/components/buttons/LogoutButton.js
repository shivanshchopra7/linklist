'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "next-auth/react";

 export default function LogoutButton({
    className = " flex border p-2 px-4 shadow  text-center w-full   gap-3 items-center justify-center",
    iconLeft = false,
    iconClasses = ''
 }) {
    return (
        <button
        onClick={() => signOut()}
        className={className} > 
      {iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses}  />
      )}
            <span>Sign Out</span>
            {!iconLeft && (
        <FontAwesomeIcon icon={faRightFromBracket} className={iconClasses} />
      )}
            </button>
    )
}