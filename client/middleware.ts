import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/arc", "/agent"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const { pathname } = req.nextUrl;

  if (!token && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (token && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = new URL("/arc", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/arc/:path*", "/agent/:path*", "/login", "/register"],
};
