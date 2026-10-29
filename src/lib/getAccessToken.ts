"use server";
import { nextAuthOption } from "@/config/next-auth/nextAuthOption";
import { getServerSession } from "next-auth";

// use it if you want send token with API request
export const getAccessToken = async () => {
  const session = await getServerSession(nextAuthOption);

  return session?.token;
};
