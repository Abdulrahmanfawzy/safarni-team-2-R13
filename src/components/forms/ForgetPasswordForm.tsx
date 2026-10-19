"use client";
import FormHeader from "../shared/FormHeader";
import MyInput from "../shared/MyInput";
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
