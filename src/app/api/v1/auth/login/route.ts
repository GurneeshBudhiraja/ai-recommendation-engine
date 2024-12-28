import { createSession } from "@/lib/appwrite/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formFields = (await request.formData())
    const email = formFields.get("email");
    const password = formFields.get("password");
    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "Please provide both email and password.",
      }, { status: 400 })
    }
    const session = await createSession({ email, password })
    // Login fails
    if (session === null) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      }, { status: 401, statusText: "Invalid email or password" })
    }
    // session id and expiry of the session
    const { secret, expire } = session;

    const cookieStore = await cookies();
    // sets the cookies
    cookieStore.set("session", secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(expire),
    })

    return NextResponse.json({
      success: true,
      message: "Logged in successfully.",
    }, { status: 200, })
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in login route: ", error.message);
      return NextResponse.json({
        success: false,
        message: error.message,
      }, { status: 401 })
    }
  }
}