import localFont from "next/font/local";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import { Toaster } from "react-hot-toast";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

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

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  // Connect to MongoDB and fetch the user's page
  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session.user.email });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {/* Pass session and page data to the AppHeader */}
        <AppHeader session={session} page={page} />
        <main className="md:flex min-h-screen">
          <aside className="border-r-2 w-44 pt-6 shadow fixed left-0 top-0 bottom-0 z-20 p-4 flex flex-col justify-between">
            <div>
         
              <AppSidebar />
            </div>
          </aside>
          <div className="grow ml-44 mt-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
