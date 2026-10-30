"use client";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema } from "@/schemas/auth.schemas";
import { VerifyOtpPayload } from "@/types/auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const VerifyOTPForm = () => {
  const [resendTime, setResendTime] = useState(60);
  // Get URl Search Param
  const searchParam = useSearchParams();

  // Navigation
  const router = useRouter();

  // Hook Control
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      code: "",
      email: searchParam.get("email") || undefined,
    },
    resolver: zodResolver(verifyOtpSchema),
  });

  // submit Verify OTP function
  const { verifyOtp } = useAuth();

  const onSubmit = (formvalues: VerifyOtpPayload) => {
    verifyOtp.mutate(formvalues, {
      onSuccess: (data) => {
        reset();
        if (data.ok) {
          toast.success("Account verified successfully, welcome");
          reset();

          // redirect user
          const callbackUrl = searchParam.get("callbackUrl") || "/";
          router.replace(String(callbackUrl));
        }
      },
      onError: (error) => {
        console.error("verify otp failed", error);
        toast.error(error.message || "Account verified failed");
      },
    });
  };

  const isResend = resendTime === 0;

  useEffect(() => {
    if (resendTime <= 0) return;
    const interval = setInterval(() => {
      setResendTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTime]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      {/* Resend timer */}
      {!isResend && (
        <p className="text-center">
          Resend OTP in <span className="text-app-primary">{resendTime}s</span>
        </p>
      )}

      {/* OTP input */}
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <InputOTP {...field} maxLength={4} defaultValue="1234">
            <InputOTPGroup>
              {Array.from({ length: 4 }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      {/* resend OTP */}
      {isResend && (
        <div className="flex items-center justify-center gap-2">
          <p>oTP not receive ?</p>
          <Button
            type="button"
            variant={"link"}
            className="text-app-primary px-0"
          >
            send again
          </Button>
        </div>
      )}

      <Button
        isLoading={verifyOtp.isPending}
        disabled={verifyOtp.isPending}
        type="submit"
        className="w-full"
      >
        Verify
      </Button>
    </form>
  );
};

export default VerifyOTPForm;
