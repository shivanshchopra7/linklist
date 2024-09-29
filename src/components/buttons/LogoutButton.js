'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "next-auth/react";

 export default function LogoutButton() {
    return (
        <button
        onClick={() => signOut()}
        className=" FLEX border p-2 px-4 shadow  text-center w-full  flex gap-3 items-center justify-center" > 
      
            <span>Sign Out</span>
            <FontAwesomeIcon icon={faRightFromBracket} className="h-6" />
            </button>
    )
}