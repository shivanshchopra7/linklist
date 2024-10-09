import { faImage, faPalette, faPallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RadioTogglers from "../formItems/radioTogglers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function PageSettingsForm ({page})  {
    const session = await getServerSession(authOptions);
    return(
        <div className="-m-4">
            <form>
            <div className="bg-gray-300 flex justify-center items-center py-16">
             <RadioTogglers  
             options={[
                {value:'color', icon:faPalette, label:'Color'},
                {value:'color', icon:faImage, label:'Image'},
             ]}
             onChange={() => {}}   />
            </div>
            <div className="flex justify-center ">
                <Image 
                className="rounded-full relative -top-8 border-white border-4 shadow shadow-black"
                src={session?.user?.image} alt="avatar" width={128} height={128} />
            </div>
            <div>
                <input type="text" placeholder="Display Name" />
                <input type="text" placeholder="Location" />
                <textarea type="" placeholder="Bio" />
            </div>
            </form>
        </div>
    )
}