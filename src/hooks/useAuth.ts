import {
  forgetPasswordAction,
  registerUser,
  resetPasswordAction,
} from "@/actions/auth.actions";
import {
  ForgetPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
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
        throw new Error(
          result?.error || "OTP verification failed. Please try again.",
        );
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
        throw new Error(
          result?.error || "Login failed. Please check your Email or password.",
        );
      }

      return result;
    },
  });

  const forgetPassword = useMutation({
    mutationKey: ["forget-password"],
    mutationFn: async (payload: ForgetPasswordPayload) => {
      return forgetPasswordAction(payload);
    },
  });

  const resetPassword = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (payload: ResetPasswordPayload) => {
      return resetPasswordAction(payload);
    },
  });

  return {
    register,
    verifyOtp,
    login,
    forgetPassword,
    resetPassword,
  };
};
