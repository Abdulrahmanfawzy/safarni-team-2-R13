import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import ResetImage from "@/assets/images/auth-images/new-password.png";

import FormHeader from "@/components/shared/FormHeader";
import { Lock } from "lucide-react";
import AuthLayout from "../_components/AuthLayouts";
const ResetPassword = () => {
  return (
    <AuthLayout image={ResetImage}>
      <div className="flex flex-col gap-3 text-center w-full">
        {/* Icon */}
        <div className="flex justify-center text-gray-400  ">
          <Lock className="size-7" />
        </div>
        {/* Header */}
        <div className="mb-4">
          <FormHeader
            title="Set New Password"
            description="Your New Password Must be Different to Previously Used Password"
          />
        </div>

        {/* Form */}
        <ResetPasswordForm />
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
