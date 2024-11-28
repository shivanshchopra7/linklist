import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
export default async function Header() {
  const session = await getServerSession(authOptions);

    return (
        <header className=" py-4 w-full bg-[#0D0D0D]">
        <div className="max-w-full items-center  flex justify-between mx-auto md:px-32 ">
        <div className="flex items-center gap-6 px-8">
<Link href={'/'} className="font-bold flex items-center gap-2">

<span class=" font-bold text-white text-2xl px-2 lowercase tracking-tight transform -rotate-3">
    droppp.link
  </span></Link>
  {/* <nav className="flex gap-4 text-slate-500 text-sm items-center">
    <Link href={'/about'}>About</Link>
    <Link href={'/pricing'}>Pricing</Link>
    <Link href={'/contact'}>Contact</Link>
  </nav> */}
        </div>
  <div>
    <nav className="flex  gap-4 text-sm text-white-500 items-center">
     {!!session && (
      <>
      <Link href={'/account'} >
      <button className="items-center justify-center border px-6 py-2 mr-4 rounded-full text-md text-center text-white border-white/30">
      Go to dashboard &rarr;
      </button>
      </Link> 
     
      </>
      
     )}
     
      {!session && (
        <>
        <Link href={'/login'}>
        <button className="items-center justify-center border px-6 py-2 rounded-full text-md text-center text-white border-white/30">login</button>
         </Link>
   
        </>
      )}
    
    </nav>
  </div>

        </div>
      </header>
    )
}