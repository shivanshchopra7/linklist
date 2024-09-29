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
        <header className="bg-white border-b py-4 w-full">
        <div className="max-w-4xl flex justify-between mx-auto px-6 ">
        <div className="flex items-center gap-6 px-8">
<Link href={'/'} className="font-bold flex items-center gap-2">
<FontAwesomeIcon icon={faLink} className="h-4 text-blue-500"/>
<span>LinkList</span></Link>
  <nav className="flex gap-4 text-slate-500 text-sm items-center">
    <Link href={'/about'}>About</Link>
    <Link href={'/pricing'}>Pricing</Link>
    <Link href={'/contact'}>Contact</Link>
  </nav>
        </div>
  <div>
    <nav className="flex  gap-4 text-sm text-slate-500 items-center">
     {!!session && (
      <>
      <Link href={'/account'} className="text-nowrap">Hello, {session?.user?.name}</Link> 
      <LogoutButton/>
      </>
      
     )}
     
      {!session && (
        <>
        <Link href={'/login'}>Sign In</Link>
        <Link href={'/login'}>Sign Up</Link>
        </>
      )}
    
    </nav>
  </div>

        </div>
      </header>
    )
}