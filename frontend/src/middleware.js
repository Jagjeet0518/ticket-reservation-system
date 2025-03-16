import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isAuthenticated = !!token;
  
  const protectedPaths = ["/"];
  // Admin-only paths
  const adminPaths = ["/dashboard"];
  
  const path = req.nextUrl.pathname;
  
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  const isAdminPath = adminPaths.some(ap => path.startsWith(ap));
  
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (isAdminPath && (!isAuthenticated || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/login?error=unauthorized", req.url));
  }
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};