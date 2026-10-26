import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (req: NextRequest) => {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const redirectUrl = new URL("/login", req.url);

    redirectUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/profile/:path*", "/flight-booking/:path*", "/car-booking/:path*"],
};
