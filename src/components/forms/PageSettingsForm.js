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

  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success('Saved');
    }
  }

function handleSubmit(ev) {
    const file = ev.target.files?.[0];
    if(file) {
        // const data = newFormData;
        // data.set('file', file);
        fetch('/api/upload', {
            method: 'POST',
        //   body: data,
        }).then(response => {response.json().then(link => {
            console.log(link); 
        })})
    }
}

  return (
    <div >
      <SectionBox >
      <form action={saveBaseSettings}>
        <div style={{ backgroundColor: bgColor }} className="flex min-h-[200px] justify-center -m-4 items-center py-4">
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
                  <input type="file" onChange={handleSubmit} className="hidden" />
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
            <div className="relative -top-8">
            <Image
            className="rounded-full  border-white border-4 shadow shadow-black/50"
            src={user?.image}
            alt="avatar"
            width={128}
            height={128}
          />
          <label 
          htmlFor="avatarIn"
          className="absolute -bottom-1 right-0 bg-white p-1 rounded-full shadow shadow-black/50 flex gap-1 items-cente cursor-pointer aspect-square">
            <FontAwesomeIcon icon={faCloudArrowUp} size={'lg'} />
          </label>
          <input id="avatarIn" type="file" className="hidden" />
            </div>
        
        </div>
        <div className="p-4">
          <label className="input-label" htmlFor="nameIn">Display Name</label>
          <input
            type="text"
            id="nameIn"
            name="displayName"
            defaultValue={page.displayName}
            placeholder="John"
          />
          <label className="input-label" htmlFor="locationIn">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={page.location}
            id="locationIn"
            placeholder="India"
          />
          <label className="input-label" htmlFor="bioIn">Bio</label>
          <textarea
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
