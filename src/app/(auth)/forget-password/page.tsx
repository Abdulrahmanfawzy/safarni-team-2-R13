import forgetPasswordImage from "@/assets/images/auth-images/forget-password.png";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";
import FormHeader from "@/components/shared/FormHeader";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../_components/AuthLayouts";

const ForgetPassword = () => {
  return (
    <AuthLayout image={forgetPasswordImage}>
      <div className="flex flex-col gap-3 text-center w-full">
        {/* Icon */}
        <div className="flex justify-center text-gray-400  ">
          <KeyRound className="size-7" />
        </div>

        {/* Header */}
        <FormHeader
          title="Forgot Password?"
          description="please enter your email to reset that password"
        />
        {/* Form */}
        <ForgetPasswordForm />

        {/* Sign in Link */}
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
    </AuthLayout>
  );
};

export default ForgetPassword;
