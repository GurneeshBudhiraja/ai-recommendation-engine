import { createSessionClient } from "@/lib/appwrite/clients";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await createSessionClient();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized user" }, { status: 401 });
  }
  const { account } = session
  try {
    // Gets the current id of the user
    const { $id } = await account.getSession("current");

    // Removes the session cookie 
    (await cookies()).delete("session")

    // Logouts the user
    await account.deleteSession($id)

    return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    console.log("Error in logout route:", error);
    return NextResponse.json({ success: false, message: "Error logging out" }, { status: 500 });
  }
}