'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { faArrowLeft, faChartLine, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
    const path = usePathname();

    return (
        <nav className="inline-flex mx-auto flex-col text-center mt-16 gap-4  p-4 rounded-lg text-white"> 
            <Link href={'/account'} className={"flex gap-4 p-2 px-4 rounded-full " + (path === '/account' ? 'text-blue-500 font-bold border bg-white/20' : 'text-black hover:text-blue-500')}>
                {/* <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className="h-6 w-6" /> */}
                <span className="font-semibold">Page</span>
            </Link>
            <Link href={'/analytics'} className={"flex gap-4 p-2 px-4 rounded-full " + (path === '/analytics' ? 'text-blue-500 font-bold border bg-white/20' : 'text-black hover:text-blue-500')}>
                {/* <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="h-6 w-6" /> */}
                <span className="font-semibold">Analytics</span>
            </Link>
            <Link href={'/'} className={"flex gap-4 p-2 px-4 rounded-full " + (path === '/community' ? 'text-blue-500 font-bold border bg-white/20' : 'text-black hover:text-blue-500')}>
                {/* <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="h-6 w-6" /> */}
                <span className="font-semibold">Community</span>
            </Link>

            {/* <LogoutButton 
                iconLeft={true} 
                className="flex gap-4 p-2 items-center text-gray-300 hover:text-[#f1c40f]" 
                iconClasses="w-6 h-6"  
            /> */}
            {/* <Link href={'/'} className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4">
                <FontAwesomeIcon icon={faArrowLeft} className={'w-4 h-4 '} />
                <span>Back to website</span>
            </Link> */}
        </nav>
    )
}
