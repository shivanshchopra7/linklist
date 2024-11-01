'use client';
import { faCloudArrowUp, faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/radioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import SectionBox from "../layout/SectionBox";

export default function PageSettingsForm({ page, user }) {
  // Moved useState outside of saveBaseSettings
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved');
    }
  }


async function upload(ev, callbackFn) {
  const file = ev.target.files[0];
  console.log(file);
  if (file) {
    const data = new FormData();
    data.set('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
    //  setBgImage(result.link);
callbackFn(result.link);

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error during file upload:', error);
      toast.error(`Upload failed: ${error.message}`);
    }
  }
}

  async function handleCoverImageChange(ev) {
   await upload(ev, link => {
    setBgImage(link);
   })
  }
  

  async function handleAvatarImageChange(ev) {
    await upload(ev, link => {
      setAvatar(link);
     })
  }
  return (
    <div >
      <SectionBox >
      <form action={saveBaseSettings}>
        <div 
        style={bgType === 'color' ? {backgroundColor: bgColor} : {backgroundImage: `url(${bgImage})`}} 
        className="flex min-h-[200px] justify-center -m-4 items-center py-4 bg-cover bg-center">
          <div>
            <RadioTogglers
              defaultValue={page.bgType}

              options={[
                { value: 'color', icon: faPalette, label: 'Color' },
                { value: 'image', icon: faImage, label: 'Image' },
              ]}
              onChange={(val) => setBgType(val)}
            />
           
              {bgType === 'color' && (
                 <div className="bg-gray-200 shadow text-gray-700 p-2 my-2">
                <div className="flex gap-2">
                  <span>Background Color</span>
                  <input type="color" name="bgColor"
                  onChange={(ev) => setBgColor(ev.target.value)}
                  defaultValue={page.bgColor} />
                </div>
                </div>
              )}
              {bgType === 'image' && (
                <div className="flex justify-center">
                  
                  <label className="bg-white shadow px-4 py-2 mt-2 flex gap-2" >
                    <input type="hidden" name="bgImage" value={bgImage} />  
                  <input type="file" onChange={handleCoverImageChange} className="hidden" />
                  <div className="flex gap-2 items-center cursor-pointer">
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  <span>Choose Image</span>
                  </div>
                    </label>
                  </div>
              )}
            
          </div>
        </div>
        <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
              <Image
            className="w-full h-full object-cover"
            src={avatar}
            alt="avatar"
            width={128}
            height={128}
          />
              </div>
          
          <label 
          htmlFor="avatarIn"
          className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow shadow-black/50 flex gap-1 items-cente cursor-pointer aspect-square">
            <FontAwesomeIcon icon={faCloudArrowUp} size={'lg'} />
          </label>
          <input id="avatarIn" type="file" onChange={handleAvatarImageChange} className="hidden" />
          <input type="hidden" name="avatar" value={avatar} />
            </div>
        
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Display Name</label>
          <input
          className="input"
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page.displayName}
            placeholder="John"
          />
          <label className="input-label" htmlFor="locationIn">Location</label>
          <input
            type="text"
            className="input"
            name="location"
            defaultValue={page.location}
            id="locationIn"
            placeholder="India"
          />
          <label className="input-label" htmlFor="bioIn">Bio</label>
          <textarea
          className="input"
            name="bio"
            defaultValue={page.bio}
            id="bioIn"
            placeholder="Your bio goes here.."
          />
          <div className="max-w-[200px] mx-auto mt-4">
            <SubmitButton>
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </SubmitButton>
          </div>
        </div>
      </form>
      </SectionBox>
  
    </div>
  );
}
