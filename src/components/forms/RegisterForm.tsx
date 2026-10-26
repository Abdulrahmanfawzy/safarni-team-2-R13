"use client";
import { useForm } from "react-hook-form";
import MyInput from "../shared/MyInput";
import { Lock, Mail, Phone, User } from "lucide-react";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/auth.schemas";
import { RegisterPayload } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      password_confirmation: "",
    },
    resolver: zodResolver(registerSchema),
  });

  // navigation hook
  const router = useRouter();

  // useAuth hook
  const { register } = useAuth();

  // submit register function
  const submitRegister = (formValues: RegisterPayload) => {
    register.mutate(formValues, {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        toast.success(
          data.message || "Register successfully , Verify Your Email.",
        );
        router.push(
          `/verify-otp?email=${encodeURIComponent(data.data.user.email)}`,
        );
        reset();
      },
      onError: (error) => {
        console.error("Registration failed:", error);
        toast.success(error.message || "Register Failed ,  try again!");
      },
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitRegister)}
        className="w-full flex flex-col gap-3.5"
      >
        {/* Name */}
        <div>
          <MyInput
            control={control}
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            isPassword={false}
            icon={<User className="size-5" />}
          />
        </div>

        {/* Email */}
        <div>
          <MyInput
            control={control}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            isPassword={false}
            icon={<Mail className="size-5" />}
          />
        </div>
        {/* Password */}
        <div>
          <MyInput
            control={control}
            label="pasword"
            name="password"
            type="password"
            placeholder="Enter your Password"
            isPassword={true}
            icon={<Lock className="size-5" />}
          />
        </div>

        {/* Password Confirmation */}
        <div>
          <MyInput
            control={control}
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            placeholder="Confirm your Password"
            isPassword={true}
            icon={<Lock className="size-5" />}
          />
        </div>

        {/* Phone */}
        <div>
          <MyInput
            control={control}
            label="Phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            isPassword={false}
            icon={<Phone className="size-5" />}
          />
        </div>

        <Button
          isLoading={register.isPending}
          disabled={register.isPending}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
