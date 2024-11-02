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
        <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-4 bg-[#2d2d2d] p-4 rounded-lg text-white"> 
            <Link href={'/account'} className={"flex gap-4 p-2 rounded " + (path === '/account' ? 'text-[#f1c40f] font-bold' : 'text-gray-300 hover:text-[#f1c40f]')}>
                <FontAwesomeIcon fixedWidth={true} icon={faFileLines} className="h-6 w-6" />
                <span className="font-semibold">My Page</span>
            </Link>
            <Link href={'/analytics'} className={"flex gap-4 p-2 rounded " + (path === '/analytics' ? 'text-[#f1c40f] font-bold' : 'text-gray-300 hover:text-[#f1c40f]')}>
                <FontAwesomeIcon fixedWidth={true} icon={faChartLine} className="h-6 w-6" />
                <span className="font-semibold">Analytics</span>
            </Link>

            <LogoutButton 
                iconLeft={true} 
                className="flex gap-4 p-2 items-center text-gray-300 hover:text-[#f1c40f]" 
                iconClasses="w-6 h-6"  
            />
            {/* <Link href={'/'} className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4">
                <FontAwesomeIcon icon={faArrowLeft} className={'w-4 h-4 '} />
                <span>Back to website</span>
            </Link> */}
        </nav>
    )
}
