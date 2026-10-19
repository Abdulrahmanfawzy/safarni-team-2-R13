"use client";
import { useForm } from "react-hook-form";
import MyInput from "./MyInput";
import { Lock, Mail, User } from "lucide-react";
import FormHeader from "./FormHeader";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleIcon from "../ui/GooglIcon";

const RegisterForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const submitRegister = (formValues: any) => {
    console.log(formValues);
  };
  return (
    <div className="flex flex-col gap-2 text-center w-full">
      <FormHeader
        title="Register your Account"
        description="create your account to get the best experience"
      />

      <form
        onSubmit={handleSubmit(submitRegister)}
        className="w-full flex flex-col gap-3.5"
      >
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
        <Button type="submit">Sign Up</Button>
      </form>

      <p className="text-sm font-medium">
        Already have an account?{" "}
        <Link
          href={"/login"}
          className="text-app-primary hover:underline font-semibold"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
