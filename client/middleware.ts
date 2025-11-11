import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/arc"];
const AUTH_ROUTES = ["/login", "/register"];
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return "Expired Session Login Again!";
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const { pathname } = req.nextUrl;

  // ✅ If token is missing or invalid for protected routes
  if (!token || (token && !(await verifyToken(token)))) {
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
      const url = new URL("/login", req.url);
      const response = NextResponse.redirect(url);
      response.cookies.delete("token");
      return response;
    }
  }

  // ✅ If token exists and is valid
  if (token) {
    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }

    if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
      const url = new URL("/arc", req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/arc/:path*", "/login", "/register"],
};
