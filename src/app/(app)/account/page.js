import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import clientPromise from "@/libs/mongoClient"; // Import your MongoClient
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import ProfilePreview from "@/components/ProfilePreview";
import Toggle from "@/components/Toggle";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  

  if (!session) {
    return redirect('/');
  }

  try {
    const client = await clientPromise; // Wait for the MongoDB client to connect
    const db = client.db("test"); // Replace with your DB name
    const page = await db.collection("pages").findOne({ owner: session?.user?.email });

    if (page) {
      return (
        <>
        <main className="flex flex-grow p-4 bg-[#F6F9FF] min-h-full">
        <div className="flex w-full">
        <div className="w-1/2">
        <PageSettingsForm page={page} user={session.user} />
           <div className="space-y-4 mt-6">
                
                </div>
        </div>
        <div className="w-11/12 ml-10">
        <PageButtonsForm page={page} user={session.user} />
        <PageLinksForm page={page} user={session.user} />
        </div>
        <div className="w-1/2 mr-10 pb-4">
        <ProfilePreview page={page} user={session.user} />
        </div>
       </div>
        </main>
      
        </>
      )
    }

    return (
      <div>
        <UsernameForm desiredUsername={desiredUsername} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch the page:", error);
    return <div>Failed to load page</div>;
  }
}
