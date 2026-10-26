import { loginUser, verifyOtp } from "@/actions/auth.actions";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOption: NextAuthOptions = {
  providers: [
    // Login with email And Password
    Credentials({
      id: "login-user",
      name: "login",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      //   Login
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          // Adjust this condition to match your ApiResponse type.
          if (!response.success) {
            return null;
          }

          const data = response.data;

          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.name,
            accessToken: data.token,
          };
        } catch (error) {
          console.error("login failed:", error);
          return null;
        }
      },
    }),

    // Verify OTP
    Credentials({
      id: "verify-otp",
      name: "Verify OTP",

      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "OTP", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) {
          return null;
        }

        try {
          const response = await verifyOtp({
            email: credentials.email,
            code: credentials.code,
          });

          // Adjust this condition to match your ApiResponse type.
          if (!response.success) {
            return null;
          }

          const data = response.data;

          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.name,
            accessToken: data.token,
          };
        } catch (error) {
          console.error("Verify OTP failed:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },

    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
