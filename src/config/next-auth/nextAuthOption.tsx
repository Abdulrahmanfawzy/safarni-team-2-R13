import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOption: NextAuthOptions = {
  providers: [
    // Login with email And Password
    Credentials({
      name: "login",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // call the API  for Login
      async authorize(credentials) {
        try {
          const response = await fetch("API URL", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          return {
            id: "",
            //  return user data
          };
        } catch (error) {
          console.error("Error:", error);
          throw new Error(
            (error as Error).message || "Login failed, please try again",
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt(props) {
      return props.token;
    },
    async session(props) {
      return props.session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
