import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = [
  "login",
  "register",
  "verify-otp",
  "welcome",
  "forget-password",
  "reset-password",
];

export const proxy = async (req: NextRequest) => {
  const isAuthRoute = authRoutes.some(
    (route) =>
      req.nextUrl.pathname === `/${route}` ||
      req.nextUrl.pathname.startsWith(`/${route}/`),
  );

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isAuthRoute) {
    return token
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
  }

  if (!token) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/profile/:path*",
    "/flight-booking/:path*",
    "/car-booking/:path*",
    "/hotel-booking/:hotelId/:roomId/book-room",

    // auth routes
    "/login/:path*",
    "/register/:path*",
    "/verify-otp/:path*",
    "/welcome/:path*",
    "/forget-password/:path*",
    "/reset-password/:path*",
  ],
};
