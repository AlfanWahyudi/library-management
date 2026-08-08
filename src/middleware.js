import { NextResponse } from "next/server";
import SessionDAL from "./lib/dal/session-dal";
import { ROUTE, ROUTE_AUTHORIZE } from "./lib/constants/route";

export default async function middleware(req) {
  const { publics: publicRoutes, protected: protectedRoutes } = ROUTE_AUTHORIZE
  
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const session = await SessionDAL.verify()

  // jika user belum/gagal autentikasi
  if (isProtectedRoute && !session.isAuth) {
    return NextResponse.redirect(new URL(ROUTE.LOGIN.url, req.nextUrl))
  }

  // jika user sudah/berhasil autentikasi
  if (
    isPublicRoute &&
    session.isAuth &&
    !req.nextUrl.pathname.startsWith(ROUTE.DASHBOARD.url)
  ) {
    return NextResponse.redirect(new URL(ROUTE.DASHBOARD.url, req.nextUrl))
  }
 
  return NextResponse.next()
}

export const config = {
  // Routes Middleware should not run on
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}