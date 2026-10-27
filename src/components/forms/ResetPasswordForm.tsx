"use client";
import { useForm } from "react-hook-form";
import MyInput from "../shared/MyInput";
import { Lock, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas/auth.schemas";
import { ResetPasswordPayload } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
      code: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    resetPassword: { mutate, isPending },
  } = useAuth();

  const submitRegister = (formValues: ResetPasswordPayload) => {
    const values = { ...formValues, email: searchParams.get("email") };

    mutate(values, {
      onSuccess: (data) => {
        toast.success(
          data.message ||
            "Password has been reset successfully. You can now login with your new password.",
        );
        reset();
        const params = new URLSearchParams(searchParams.toString());
        // navigate user
        router.push(`/reset-password?${params}`);
      },
      onError: (error) => {
        console.error("reset password", error);
        toast.error(error.message);
      },
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitRegister)}
        className="w-full flex flex-col gap-3.5"
      >
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
        <div>
          <MyInput
            control={control}
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            placeholder="Enter your Password"
            isPassword={true}
            icon={<Lock className="size-5" />}
          />
        </div>

        <div>
          <MyInput
            control={control}
            label="Verify Code"
            name="code"
            type="text"
            inputMode="numeric"
            maxLength={4}
            pattern="[0-9]{4}"
            placeholder="Enter your Verify Code"
            isPassword={false}
            icon={<Shield className="size-5" />}
          />
        </div>

        <Button isLoading={isPending} disabled={isPending} type="submit">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
