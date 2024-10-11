import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const publicRoutes = ["/sign-in", "/sign-up"];
  const { pathname } = req.nextUrl;

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const token =
    req.cookies.get("auth-token") ||
    req.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith("auth-token="))
      ?.split("=")[1];
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
