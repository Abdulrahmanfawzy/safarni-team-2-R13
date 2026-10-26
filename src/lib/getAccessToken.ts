"use client";

import { useSession } from "next-auth/react";

type sessionType = {
  data: {
    expires: string;
    user: { name: string; email: string };
  };
  status: "authenticated" | "unauthenticated" | "loading";
};

// Todo
const useAccessToken = () => {
  const data = useSession();
  console.log(data);
};

export default useAccessToken;
