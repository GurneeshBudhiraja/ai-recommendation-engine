import { createSessionClient } from "@/lib/appwrite/clients";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await createSessionClient();
    if (session === null) {
      return NextResponse.json({ success: false, message: "Unauthorized user" }, { status: 401 });
    }
    const { account } = session;
    const loggedInUser = await account.get();
    return NextResponse.json({ success: true, data: loggedInUser }, { status: 200 });
  } catch (error) {
    console.log("Error in getting current user:", error);
    return NextResponse.json({
      success: false,
      message: "Error getting current user",
    }, { status: 500, })
  }
}