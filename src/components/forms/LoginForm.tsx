"use client";
import { useForm } from "react-hook-form";
import MyInput from "../shared/MyInput";
import { Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleIcon from "../ui/GooglIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schemas";
import { LoginPayload } from "@/types/auth.types";

const LoginForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const submitLogin = (formValues: LoginPayload) => {
    console.log(formValues);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitLogin)}
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
          <Link href={"forget-password"} className={"flex justify-end!"}>
            <Button
              className={"w-fit px-0  flex! justify-end!"}
              variant={"link"}
            >
              Forgot Password?
            </Button>
          </Link>
        </div>
        <Button type="submit">Sign In</Button>
      </form>

      <div className="flex justify-center items-center gap-4 my-2">
        <div className="h-px w-full bg-gray-800"></div>
        <p>OR</p>
        <div className="h-px w-full bg-gray-800"></div>
      </div>

      <Button variant={"outline"} className={"p-2 w-xs mx-auto "}>
        <GoogleIcon />
      </Button>
    </>
  );
};

export default LoginForm;
