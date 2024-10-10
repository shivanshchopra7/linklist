// route.js or wherever your /api/upload logic is
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

// Set up Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinaryV2.uploader.upload(file.path, {
      folder: 'backgrounds', // You can change the folder
    });

    // Return the uploaded image URL
    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  }
}
