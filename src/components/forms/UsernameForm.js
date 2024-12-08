'use client';

import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import RightIcon from "../icons/RightIcon";
import { useRouter } from 'next/navigation'; // Import useRouter
import SubmitButton from "../buttons/SubmitButton";

export default function UsernameForm({ desiredUsername }) {
    const [taken, setTaken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(desiredUsername || ""); // Ensure it's a string
    const router = useRouter(); // Initialize useRouter

    // Handle username input with validation
    function handleUsernameChange(event) {
        let input = event.target.value;
        
        // Convert to lowercase
        input = input.toLowerCase();

        // Replace spaces with underscores
        input = input.replace(/\s+/g, '_');

        // Validate input (no special characters except underscore and dot)
        const validUsername = /^[a-z0-9_.]+$/.test(input);
        
        if (validUsername || input === '') {
            setUsername(input); // Update state with valid input
        }
    }

    // Check if username is valid based on the conditions
    function isValidUsername() {
        // Ensure username is not undefined or null
        return typeof username === "string" && username.length >= 3 && /^[a-z0-9_.]+$/.test(username);
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        if (!isValidUsername()) {
            setTaken(true); // Display error if username is invalid
            return;
        }

        setIsLoading(true); // Set loading state while processing
        const formData = new FormData(event.target); // Get form data

        const result = await grabUsername(formData);
        setTaken(result === false);
        setIsLoading(false); // Reset loading state

        if (result) {
            router.push('/account?created=' + formData.get('username')); // Use router.push for redirection
        }
    }

    return (
        <form onSubmit={handleSubmit}> {/* Use onSubmit instead of action */}
            <h1 className="text-4xl font-bold text-center mb-2 mt-24 text-white">Grab your username</h1>
            <p className="text-center mb-6 text-white">
                Choose a username to get started
            </p>
            <div className="max-w-xs mx-auto ">
                <input
                    name="username"
                    value={username} // Controlled input
                    onChange={handleUsernameChange} // Validate on change
                    className="block p-2 text-xl mx-auto border rounded-full mb-2 text-center"
                    type="text"
                    placeholder="Enter username"
                />
                {taken && (
                    <div className="text-center text-red-600 font-bold border rounded-full border-red-500 p-2 mt-4">
                        This username is taken
                    </div>
                )}
                {!isValidUsername() && username.length > 0 && (
                    <div className="text-center text-red-600 font-bold border  border-red-500 rounded-full p-1 mt-4">
                        Username must be at least 3 characters long.
                    </div>
                )}

                <SubmitButton className="mt-6 flex mx-auto" disabled={isLoading || !isValidUsername()}>
                    <span>{isLoading ? 'Checking...' : 'Claim username'}</span>
                    <RightIcon />
                </SubmitButton>
            </div>
        </form>
    );
}
