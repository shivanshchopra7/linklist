"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function savePageSettings(formData) {
    mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);
    if(session) {
        const displayName = formData.get('displayName');
        const location = formData.get('location');
        const bio = formData.get('bio');
        const bgType = formData.get('bgType');
        const bgColor = formData.get('bgColor');
        await Page.updateOne(
            {owner: session?.user?.email},
            {displayName, location, bio, bgType, bgColor}
        );
        return true;
    }
    return false; 
}


export async function savePageButtons(formData) {
    // Ensure the DB connection
    await mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);

    if(session) {
        const buttonValues = {};
        formData.forEach((value, key) => {
            buttonValues[key] = value;
        });

        // Now update dataToUpdate with the buttonValues
        const dataToUpdate = {
            buttons: buttonValues // Store the button values here
        };

        // Perform the update in the DB
        await Page.updateOne(
            { owner: session?.user?.email }, // Find the page by owner
            { $set: dataToUpdate }           // Update the 'buttons' field
        );
    }
}

export async function savePageLinks(links) {
    await mongoose.connect(process.env.MONGODB_URI);

    const session = await getServerSession(authOptions);

    if (session) {
        // Perform the database operation to save the links here
        // await Page.updateOne(
        //     { owner: session?.user?.email }, // Find the page by owner
        //     { $set: { links: links } }       // Update the 'links' field
        // );
    await Page.updateOne(
        {owner: session?.user?.email},
        {links}
    )
    } else {
        return false;
    }
}
