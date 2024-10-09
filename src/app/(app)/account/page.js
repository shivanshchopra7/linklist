import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RightIcon from "@/components/icons/RightIcon";
import grabUsername from "@/actions/grabUsername";
import { redirect } from "next/navigation";
import UsernameForm from "@/components/forms/UsernameForm";
import clientPromise from "@/libs/mongoClient"; // Import your MongoClient
import PageSettingsForm from "@/components/forms/PageSettingsForm";

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
        <PageSettingsForm page={page} />
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
