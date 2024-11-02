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
            <h1 className="text-4xl font-bold text-center mb-2 mt-24 text-white">Grab your username</h1>
            <p className="text-center mb-6 text-white">
                Choose a username to get started
            </p>
            <div className="max-w-xs mx-auto ">
                <input
                    name="username"
                    defaultValue={desiredUsername}
                    className="block p-2 text-xl mx-auto border rounded-full mb-2 text-center"
                    type="text"
                    placeholder="Enter username"
                />
                {taken && (
                    <div className="text-center  text-red-600 font-bold border rounded-full  border-red-500 p-2 mt-4">
                        This username is taken
                    </div>
                )}

                <SubmitButton className="mt-6" disabled={isLoading}> {/* Disable button when loading */}
                    <span>{isLoading ? 'Checking...' : 'Claim username'}</span>
                    <RightIcon />
                </SubmitButton>
            </div>
        </form>
    );
}
