"use server";

import { apiClient } from "@/lib/axios";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
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
): Promise<ApiResponse<LoginResponse>> => {
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
