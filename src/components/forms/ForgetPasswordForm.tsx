"use client";
import FormHeader from "./FormHeader";
import MyInput from "./MyInput";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
const ForgetPasswordForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const submitForgetPassword = (formValues: any) => {
    console.log(formValues);
  };
  return (
    <div className="flex flex-col gap-2 text-center w-full">
      <FormHeader
        title="Forgot Password?"
        description="please enter your email to reset that password"
      />

      <form
        onSubmit={handleSubmit(submitForgetPassword)}
        className="w-full flex flex-col gap-3.5"
      >
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
        <Button type="submit">Reset Password</Button>
      </form>

      <p className="text-sm font-medium">
        Remembered your password?{" "}
        <Link
          href={"/login"}
          className="text-app-primary hover:underline font-semibold"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ForgetPasswordForm;
