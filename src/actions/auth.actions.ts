"use server";

import { apiClient } from "@/lib/axios";
import {
  ForgetPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ResetPasswordPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/types/auth.types";
import { ApiResponse } from "@/types/global.type";

// Register action
export const registerUser = async (
  payload: RegisterPayload,
): Promise<ApiResponse<RegisterResponse>> => {
  const { data } = await apiClient.post("/auth/register", payload);
  return data;
};

// Lgin action
export const loginUser = async (
  payload: LoginPayload,
): Promise<ApiResponse<LoginResponse | null>> => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

// Verify OTP action
export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<ApiResponse<VerifyOtpResponse>> => {
  const { data } = await apiClient.post("/auth/verify-otp", payload);
  return data;
};

// forget password action
export const forgetPasswordAction = async (
  payload: ForgetPasswordPayload,
): Promise<ApiResponse<null | string>> => {
  const { data } = await apiClient.post("/auth/forgot-password", payload);
  return data;
};

// reset password action
export const resetPasswordAction = async (
  payload: ResetPasswordPayload,
): Promise<ApiResponse<null>> => {
  const { data } = await apiClient.post("/auth/reset-password", payload);
  return data;
};
