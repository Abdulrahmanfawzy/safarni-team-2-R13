import { registerUser } from "@/actions/auth.actions";
import {
  LoginPayload,
  RegisterPayload,
  VerifyOtpPayload,
} from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const useAuth = () => {
  const register = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (payload: RegisterPayload) => registerUser(payload),
  });

  const verifyOtp = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async (payload: VerifyOtpPayload) => {
      const result = await signIn("verify-otp", {
        redirect: false,
        ...payload,
      });

      if (!result?.ok) {
        throw new Error("OTP verification failed. Please try again.");
      }

      return result;
    },
  });

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginPayload) => {
      const result = await signIn("login-user", {
        redirect: false,
        ...payload,
      });

      if (!result?.ok) {
        throw new Error("OTP verification failed. Please try again.");
      }

      return result;
    },
  });

  return {
    register,
    verifyOtp,
    login,
  };
};
