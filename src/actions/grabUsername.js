"use server";

import { Page } from "@/models/Page";
import mongoose from "mongoose";

export default async function grabUsername(formData) {
   
    const username = formData.get('username');
    mongoose.connect(process.env.MONGODB_URI);
    const pageDoc = await Page.create({uri: username});
return JSON.parse( JSON.stringify(pageDoc))
        }