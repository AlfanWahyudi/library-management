import { NextResponse } from "next/server";
import SessionDAL from "./lib/dal/session-dal";
import { ROUTE, ROUTE_AUTHORIZE } from "./lib/constants/route";

/*

-- daftar pengecekan di middleware 

---
cek apakah user berhasil authenticate,
jika tidak redirect ke halaman login dgn memberikan alert "user belum login (sesuaikan kalimatnya)",
jika berhasil masuk ke halaman dashboard dgn memberikan ucapan selamat "berhasil login (sesuaikan kalimatnya)"
---

=================================================
-- daftar routes that excluded tanpa melewati middleware
// TODO: tentukan route apa untuk di exclude
"api, _next/static, _next/image, .json, .png, dll"


*/

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

// Routes Middleware should not run on
export const config = {
  // TODO: perbaiki lagi macher nya, karena file .json tetep kena masuk middleware juga
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}