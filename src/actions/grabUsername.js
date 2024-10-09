"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function grabUsername(formData) {
    const username = formData.get('username');
    await mongoose.connect(process.env.MONGODB_URI);

    const existingPageDoc = await Page.findOne({ uri: username });
    
    if (existingPageDoc) {
        return false; // Return a plain value, indicating the username exists.
    } else {
        const session = await getServerSession(authOptions);
        
        const newPage = await Page.create({
            uri: username,
            owner: session?.user?.email
        });

        // Return a plain object instead of the Mongoose document
        return {
            uri: newPage.uri,
            owner: newPage.owner,
            _id: newPage._id // Return only necessary fields
        };
    }
}

   

    // if (existingPageDoc) {
    //     return false;  // Return a boolean
    // } else {
    //     const session = await getServerSession(authOptions);
    //     // Create a new document and return only necessary fields
    //     const newPage = await Page.create({ uri: username, owner: session?.user?.email });

    //     // Return the created document as a plain object (or return just `true` if success)
    //     return {
    //         success: true,
    //         uri: newPage.uri, // Send only the needed field as a plain object
    //         owner: newPage.owner
    //     };
    // }
