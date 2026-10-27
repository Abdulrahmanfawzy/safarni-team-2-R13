import { z } from "zod";

// passoword regex and massage error
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const passwordErrorMessage =
  "Password must be at least 8 characters long and contain at least one special character";

// login schema
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwordRegex, passwordErrorMessage),
});

// register schame
export const registerSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.email(),
  password: z.string().regex(passwordRegex, passwordErrorMessage),
  password_confirmation: z.string().regex(passwordRegex, passwordErrorMessage),
  phone: z.string().min(11, "phone is required"),
});

// forget password schema
export const forgetPasswordSchema = z.object({
  email: z.email(),
});

// Verify OTP schema
export const verifyOtpSchema = z.object({
  code: z.string().min(1, "OTP  is required"),
  email: z.email().optional(),
});

// reset password schema
export const resetPasswordSchema = z.object({
  password: z.string().regex(passwordRegex, passwordErrorMessage),
  password_confirmation: z.string().regex(passwordRegex, passwordErrorMessage),
  code: z.string().min(4, "otp code is required"),
});
