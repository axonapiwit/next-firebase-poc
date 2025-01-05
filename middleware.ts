import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    // const token = req.cookies.get("admin-token");

    // if (!token && (pathname.startsWith("/admin"))) {
    //   return NextResponse.redirect(`${req.nextUrl.origin}`);
    // }

    return NextResponse.next();

  },
)

export const config = { matcher: ['/', '/admin/:path*'] }



