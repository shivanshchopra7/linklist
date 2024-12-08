'use client';
import { faCloudArrowUp, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";
import savePageSettings from "@/actions/pageActions";

export default function PageSettingsForm({ page, user }) {
  const [avatar, setAvatar] = useState(user?.image);
  const [bio, setBio] = useState(page.bio || "");

  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved');
    }
  }

  async function upload(ev, callbackFn) {
    const file = ev.target.files[0];
    if (file) {
      const data = new FormData();
      data.set("file", file);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const result = await response.json();
        callbackFn(result.link);
        toast.success("File uploaded successfully!");
      } catch (error) {
        console.error("Error during file upload:", error);
        toast.error(`Upload failed: ${error.message}`);
      }
    }
  }

  async function handleAvatarImageChange(ev) {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  }

  // Handle bio change and restrict to 100 words
  const handleBioChange = (ev) => {
    const text = ev.target.value;
    if (text.length <= 50) {
      setBio(text);
    }
  };

  return (
    <div className="bg-white rounded-lg mt-16 shadow p-4 w-80 ml-4">
      <SectionBox>
        <form action={saveBaseSettings}>
          {/* Profile Info Section */}
          <div className="text-left border-b-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Profile Info</h2>
          </div>

          <div className="flex flex-col mt-4">
            {/* Profile Picture */}
            <div className="relative w-[80px] h-[80px]">
            <div className="overflow-hidden rounded-full border-2 border-gray-200 shadow w-24 h-24">
  <Image
    className="object-cover"
    src={avatar}
    alt="avatar"
    width={80}
    height={80}
  />
</div>

              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer"
              >
                <FontAwesomeIcon icon={faCloudArrowUp} size="sm" />
              </label>
              <input
                id="avatarIn"
                type="file"
                onChange={handleAvatarImageChange}
                className="hidden"
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>

          {/* Input Fields */}
          <div className="mt-6 space-y-4">



          <div className="mt-4">
  <p className="text-center bg-blue-100 text-blue-700 font-medium rounded-full px-4 py-1 inline-block shadow transition-transform duration-300 hover:scale-105">
    @{page.uri}
  </p>
  
</div>





            <div>
              <input
                className=" text-left text-gray-700 border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="nameIn"
                name="displayName"
                defaultValue={page.displayName}
                placeholder="Your Name"
              />
            </div>
            <div>
              <textarea
                className="text-left text-gray-700 border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                name="bio"
                value={bio}
                onChange={handleBioChange}
                id="bioIn"
                rows="2"
                placeholder="Short bio"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center mt-6">
            <SubmitButton>
              <span>Save</span>
            </SubmitButton>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
