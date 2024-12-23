import HeroForm from "@/components/forms/HeroForm";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-[#0D0D0D] h-full lg:h-screen">
      <section className=" p-4  pt-16">
        <div className="mb-16">
        <h1 className="hidden md:block text-5xl font-bold mb-4 text-white text-center">
  <span className="bg-clip-text text-transparent bg-gradient-to-r pb-4 from-[#ff99cc] to-[#a05bff]">
    Powerful link-in-bio{" "}
  </span>
  <br />
  for Creators & Brands
</h1>

<h1 className="md:hidden text-5xl font-bold mb-4 text-white text-center">
  <span className="bg-clip-text text-transparent bg-gradient-to-r pb-4 from-[#ff99cc] to-[#a05bff]">
    Powerful <br /> link-in-bio{" "}
  </span>
  <br />
  for Creators <br /> & Brands
</h1>


          <h2 className="hidden md:block text-md text-white text-center">
            Simply put, it&apos;s the coolest link in bio  to grow and earn more ✨
          </h2>
          
          <h2 className=" md:hidden text-md text-white text-center">
            Simply put, it&apos;s the coolest link in bio <br /> to grow and earn more ✨
          </h2>
        </div>

        <HeroForm user={session?.user} />

        {/* Left-aligned grid section */}
        <section className="mt-24 w-full  md:px-32 pb-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 text-balance">
            <div className="  text-center md:text-left text-balance">
              <h1 className="text-xl mb-2 ">👥</h1>
              <h3 className="text-lg font-semibold text-white mb-1">
                Turn Your Followers <br /> into Customers
              </h3>
              <p className="text-gray-400 text-balance">
                Drive traffic from your social handles to  your website, online store, latest blog <br /> post, or anywhere you want.
              </p>
            </div>
            <div className=" text-center md:text-left">
            <h1 className="text-xl mb-2">📈</h1>
              <h3 className="text-lg w-full font-semibold text-white mb-1">
                Grow Your Following on Every Platform
              </h3>
              <p className="text-gray-400">
                Help followers discover your featured content, social profiles, and mailing list to engage on every channel.
              </p>
            </div>
            <div className=" text-center md:text-left text-balance">
            <h1 className="text-xl mb-2">🔄</h1>
              <h3 className="text-lg font-semibold text-white mb-1">
                Automate Dropping Link on Follower Interactions
              </h3>
              <p className="text-gray-400 ">
                Automatically share your link when user comments, send message or even <br /> when  they follow.
              </p>
            </div>
            <div className=" text-center md:text-left">
            <h1 className="text-xl mb-2 ">🔗</h1>
              <h3 className="text-lg font-semibold text-white mb-1">
                Easily Manage All Your Links in One Place
              </h3>
              <p className="text-gray-400">
                Create a seamless <br /> experience for followers <br /> to   find  what they&apos;re <br /> looking for.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
