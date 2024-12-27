import { type NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
  const pathName = request.url.split("/").filter(Boolean).pop();
  if (pathName === "dashboard") {
    const session = request.cookies.get("session")
    if (!session) {
      // TODO: uncomment after the login route
      // return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/:path',],
}