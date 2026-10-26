"use server";
// Register action

import { apiClient } from "@/lib/axios";
import { RegisterPayload, RegisterResponse } from "@/types/auth.types";
import { ApiResponse } from "@/types/global.type";

export const registerUser = async (
  userPayload: RegisterPayload,
): Promise<ApiResponse<RegisterResponse>> => {
  const { data } = await apiClient.post("/auth/register", userPayload);
  return data;
};
