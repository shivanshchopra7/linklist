import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { faEnvelope, faLink, faLocationDot, faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faWhatsapp, faFacebook, faLinkedin, faDiscord, faYoutube, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export const buttonIcons = {
    email: faEnvelope,
    mobile: faPhone,
    instagram: faInstagram,
    whatsapp: faWhatsapp,
    facebook: faFacebook,
    linkedin: faLinkedin,
    discord: faDiscord,
    youtube: faYoutube,
    github: faGithub,
    telegram: faTelegram
};

function buttonLink(key, value) {
    if (key === 'mobile') {
        return 'tel:' + value;
    }
    if (key === 'whatsapp') {
        return 'https://wa.me/' + value;
    }
    if (key === 'email') {
        return 'mailto:' + value;
    }
    return value;
}

export default async function UserPage({ params }) {
    const uri = params.uri;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const page = await Page.findOne({ uri });

        // Check if page was found
        if (!page) {
            console.error("No page found for the given URI:", uri);
            return <div>Error: Page not found</div>; // Render error message for user
        }

        const user = await User.findOne({ email: page.owner });

        // Check if user was found
        if (!user) {
            console.error("No user found for the owner:", page.owner);
            return <div>Error: User not found</div>; // Render error message for user
        }

        return (
            <div className="bg-blue-950 text-white min-h-screen pb-10">
                <div className="h-36 bg-gray-400 items-center bg-cover bg-center" style={{ backgroundColor: page.bgColor }}></div>
                <div className="aspect-square w-48 h-48 mx-auto relative -top-16 -mb-12">
                    <Image src={user.image} className="rounded-full w-full h-full object-cover" width={256} height={256} alt={'avatar'} />
                </div>

                <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
                <h3 className="text-md flex gap-2 justify-center items-center">
                    <FontAwesomeIcon className="h-4" icon={faLocationDot} />
                    {page.location}
                </h3>
                <div className="max-w-lg mx-auto text-center my-2">
                    <p className="text-lg ">{page.bio}</p>
                </div>
                <div className="flex gap-2 justify-center mt-4 pb-4">
                    {Object.keys(page.buttons).map(buttonKey => (
                        <Link key={buttonKey} target="_blank" href={buttonLink(buttonKey, page.buttons[buttonKey])}
                            className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center">
                            <FontAwesomeIcon className="w-6 h-6" icon={buttonIcons[buttonKey]} />
                        </Link>
                    ))}
                </div>

                <div className="max-w-xl md:mt-8 grid gap-6 mx-auto px-8">
                    {page.links.map(link => (
                        <Link key={link.url} href={link.url} target="_blank" className="bg-indigo-800 rounded-lg border p-2 flex">
                            <div className="relative -left-4 overflow-hidden ">
                                <div className="bg-blue-700 border border-white rounded-full aspect-square p-4 w-16 h-16 grow flex items-center justify-center">
                                    {link.icon ? (
                                        <FontAwesomeIcon className="w-8 h-8" icon={link.icon} />
                                    ) : (
                                        <FontAwesomeIcon className="w-8 h-8" icon={faLink} />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div>
                                    <h3>{link.title}</h3>
                                    <p className="text-white/70 overflow-ellipsis">{link.subtitle}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in UserPage:", error);
        return <div>Error: Something went wrong</div>; // Render error message for user
    }
}
