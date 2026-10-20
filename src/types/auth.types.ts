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
