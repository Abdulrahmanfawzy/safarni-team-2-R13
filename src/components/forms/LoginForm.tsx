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
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const searchParam = useSearchParams();
  const router = useRouter();

  // useAuth hook
  const { login } = useAuth();

  const submitLogin = async (formValues: LoginPayload) => {
    login.mutate(formValues, {
      onSuccess: (data) => {
        if (data.ok) {
          toast.success("Login successful.");
          reset();
          // redirect user
          const callbackUrl = searchParam.get("callbackUrl") || "/";
          router.push(String(callbackUrl));
        }
      },
      onError: (error) => {
        console.error("login failed", error);
        toast.error(error.message || "login failed");
      },
    });
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
          <Link
            href={`forget-password?${new URLSearchParams(searchParam.toString())}`}
            className={"flex justify-end!"}
          >
            <Button
              className={"w-fit px-0  flex! justify-end!"}
              variant={"link"}
            >
              Forgot Password?
            </Button>
          </Link>
        </div>

        <Button
          isLoading={login.isPending}
          disabled={login.isPending}
          type="submit"
        >
          Sign In
        </Button>
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
