import { NextResponse } from "next/server";
import SessionDAL from "./lib/dal/session-dal";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', 'signup', '/']

export default async function middleware(req) {
  
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const session = await SessionDAL.verify()

  if (isProtectedRoute && !session.isAuth) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session.isAuth &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}

// TODO: perbaiki lagi macher nya, karena file .json tetep kena masuk middleware juga
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}