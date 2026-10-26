import {
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/schemas/auth.schemas";
import { z } from "zod";

// login type from  zod schema
export type LoginPayload = z.infer<typeof loginSchema>;

// register type from  zod schema
export type RegisterPayload = z.infer<typeof registerSchema>;

// forget password  type from  zod schema
export type ForgetPasswordPayload = z.infer<typeof forgetPasswordSchema>;

// verify otp type from zod schema
export type VerifyOtpPayload = z.infer<typeof verifyOtpSchema>;

// reset password type from schema
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

// API response type

export interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string | null;
    avatar_url: string | null;
    role: string;
    status: string;
    is_verified: boolean;
    created_at: Date;
  };
}
