"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

// use it if you want send token with API request
export const getAccessToken = async () => {
  const cookie = await cookies();
  const nextAuthToken = cookie.get("next-auth.session-token")?.value;

  const token = await decode({
    token: nextAuthToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.accessToken;
};
