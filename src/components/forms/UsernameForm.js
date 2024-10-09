'use client';

import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import RightIcon from "../icons/RightIcon";
import { useRouter } from 'next/navigation'; // Import useRouter
import SubmitButton from "../buttons/SubmitButton";

export default function UsernameForm({ desiredUsername }) {
    const [taken, setTaken] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Initialize useRouter

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

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
            <h1 className="text-4xl font-bold text-center mb-2">Grab your username</h1>
            <p className="text-center mb-6 text-gray-500">
                Choose a username to get started
            </p>
            <div className="max-w-xs mx-auto w-full ">
                <input
                    name="username"
                    defaultValue={desiredUsername}
                    className="block p-2 mx-auto border w-full mb-2 text-center"
                    type="text"
                    placeholder="username"
                />
                {taken && (
                    <div className="text-center bg-red-200 border border-red-500 p-2 mb-2">
                        This username is taken
                    </div>
                )}

                <SubmitButton disabled={isLoading}> {/* Disable button when loading */}
                    <span>{isLoading ? 'Checking...' : 'Claim username'}</span>
                    <RightIcon />
                </SubmitButton>
            </div>
        </form>
    );
}
