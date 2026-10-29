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

      // Login
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const response = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (!response.success) {
          throw new Error(response.message || "login failed");
        }

        const data = response.data;

        return {
          id: String(data?.user.id),
          email: data?.user.email,
          name: data?.user.name,
          accessToken: data?.token,
        };
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
          throw new Error("Otp code are required");
        }

        const response = await verifyOtp({
          email: credentials.email,
          code: credentials.code,
        });

        if (!response.success) {
          throw new Error(response.message);
        }

        const data = response.data;

        return {
          id: String(data?.user.id),
          email: data?.user.email,
          name: data?.user.name,
          accessToken: data?.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(param) {
      if (param.user) {
        param.token.accessToken = param.user.accessToken;
      }
      return param.token;
    },

    async session(param) {
      param.session.token = param.token.accessToken;
      return param.session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
