import { type NextRequest, NextResponse } from 'next/server'
import { createSessionClient } from './lib/appwrite/clients';

export async function middleware(request: NextRequest) {
  const pathName = request.url.split("/").filter(Boolean).pop();
  // checks for the dashboard route
  if (pathName === "dashboard") {
    const sessionClient = await createSessionClient();
    if (sessionClient === null) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else if (pathName === "login" || pathName === "signup") {
    const sessionClient = await createSessionClient();
    if (sessionClient !== null) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path',],
}