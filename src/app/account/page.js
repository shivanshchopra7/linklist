import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
export default async function AccountPage({searchParams}) {
 
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;
   
    if(!session) {
        redirect('/');
    }
    return (
        <div>
          
<form action={grabUsername}>
    <h1 className="text-4xl font-bold text-center mb-2">Grab your username</h1>
    <p className="text-center mb-6 text-gray-500">
        Choose a username to get started
    </p>
    <div className="max-w-xs mx-auto  w-full ">
    <input
    name="username"
    defaultValue={desiredUsername} className="block p-2 mx-auto border w-full mb-2 text-center" type="text" placeholder="username" />
    <button type="submit" className="flex bg-blue-500 text-white gap-2 items-center justify-center py-2 px-4  mx-auto w-full">
        <span>Claim Username</span>
        <RightIcon  />
        </button>   
    </div>         
</form>
        </div>
    );
}