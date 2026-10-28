"use client";
import MyInput from "../shared/MyInput";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas/auth.schemas";
import { ForgetPasswordPayload } from "@/types/auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ForgetPasswordForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    forgetPassword: { mutate, isPending },
  } = useAuth();

  const submitForgetPassword = (formValues: ForgetPasswordPayload) => {
    mutate(formValues, {
      onSuccess: (data) => {
        toast.success(
          data.message ||
            "Password reset OTP sent successfully check your mail.",
        );
        reset();
        const params = new URLSearchParams(searchParams.toString());
        params.set("email", formValues.email);
        // navigate user
        router.push(`/reset-password?${params}`);
      },
      onError: (error) => {
        console.error("forget password", error);
        toast.error(error.message);
      },
    });
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
        <Button isLoading={isPending} disabled={isPending} type="submit">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
