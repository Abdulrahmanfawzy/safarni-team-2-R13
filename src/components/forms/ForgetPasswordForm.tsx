"use client";
import MyInput from "../shared/MyInput";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas/auth.schemas";
import { ForgetPasswordPayload } from "@/types/auth.types";

const ForgetPasswordForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });
  const submitForgetPassword = (formValues: ForgetPasswordPayload) => {
    console.log(formValues);
  };
  return (
    <>
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
    </>
  );
};

export default ForgetPasswordForm;
