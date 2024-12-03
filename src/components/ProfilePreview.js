// components/ProfilePreview.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import PhoneFrame from "./PhoneFrame";

export default function ProfilePreview({ page, user }) {
  // Function to generate links for buttons
  function buttonLink(key, value) {
    if (key === "mobile") return "tel:" + value;
    if (key === "whatsapp") return "https://wa.me/" + value;
    if (key === "email") return "mailto:" + value;
    return value;
  }

  return (
    <PhoneFrame>
      <div className="bg-black text-white">
        {/* User Image */}
        <div className="aspect-square mt-20 w-32 mx-auto relative border rounded-full -top-28 -mb-24">
          <Image
            src={user.image}
            className="rounded-full w-full h-full object-cover"
            width={256}
            height={256}
            alt="avatar"
          />
        </div>

        {/* Display Name */}
        <h2 className="text-2xl text-center mb-1">{page?.displayName}</h2>

        {/* Bio */}
        <div className="max-w-lg mx-auto text-center my-2">
          <p className="text-lg">{page?.bio}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-center -mb-4 pb-4">
          {page?.buttons &&
            Object.keys(page.buttons).map((buttonKey) => (
              <Link
                key={buttonKey}
                href={buttonLink(buttonKey, page.buttons[buttonKey])}
                className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center"
              >
                <FontAwesomeIcon className="w-6 h-6" />
              </Link>
            ))}
        </div>

        {/* Links */}
        <div className="max-w-md md:mt-8 grid gap-6 mx-auto px-8">
          {page?.links?.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              target="_blank"
              className="items-center rounded-full border-white/30 border p-2 flex"
            >
              <div className="flex items-center justify-center">
                <div className="ml-6">
                  <h3>{link.title}</h3>
                  <p className="text-white/70 overflow-ellipsis">
                    {link.subtitle}
                  </p>
                </div>
              </div>
              <FontAwesomeIcon
                className="ml-auto mr-5 w-4 h-4"
                icon={faArrowRight}
              />
            </Link>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
