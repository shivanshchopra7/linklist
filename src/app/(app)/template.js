
import localFont from "next/font/local";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine, faChartSimple, faFileLines, faLink, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import AppSidebar from "@/components/layout/AppSidebar";
import { Toaster } from "react-hot-toast";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Droppp.link",
  description: "Generated by create next app",
};

export default async function AppLayout({ children, ...rest }) {
    const headersList = headers();

  
    const session = await getServerSession(authOptions)

    if(!session) {
        return redirect('/');
    } 
mongoose.connect(process.env.MONGODB_URI);
    const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
      <main className="md:flex min-h-screen ">
        
         <aside className="bg-white w-48 pt-6 shadow fixed md:static left-0 top-0 bottom-0  z-20 p-4 ">
          <div className="sticky top-0 pt-2">


        
          
         <div className ="flex flex-col gap-4 items-center">
           <div className='rounded-full flex-col  overflow-hidden aspect-square w-24 mx-auto '>
                    <Image src={session.user.image} width={256} height={256} alt={'avatar'} />
                   
                </div>
              

                <h1 className="text-center  text-2xl font-bold text-gray-900">{session.user.name}</h1>

                {page && (
   <Link
   target="_blank"
   href={'/' + page.uri}
   className="text-center flex gap-1 items-center justify-center">
    <FontAwesomeIcon size="lg" icon={faLink} className="text-blue-500" />
   <span className="text-xl text-gray-300">/</span>
   <span className="font-bold text-lg">{page.uri}</span>
 </Link>
                )}
             
                </div>
           <div className="text-center">
         <AppSidebar />
           </div>
           </div>
         </aside>
          <div className="grow">
 
            {children}
            
          
          </div>
          
        </main>
        
      </body>
    </html>
  );
}
