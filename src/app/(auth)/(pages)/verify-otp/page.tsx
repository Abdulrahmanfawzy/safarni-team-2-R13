import { Mail } from "lucide-react";
import AuthLayout from "../../_components/AuthLayouts";
import OtpImage from "@/assets/images/auth-images/otp.png";
import FormHeader from "@/components/shared/FormHeader";
import VerifyOTPForm from "@/components/forms/VerifyOTPForm";
const VerifyOTP = () => {
  return (
    <AuthLayout image={OtpImage}>
      <div className="flex flex-col gap-3 text-center w-full">
        {/* Icon */}
        <div className="flex justify-center text-gray-400 ">
          <Mail className="size-7" />
        </div>
        {/* Header */}
        <FormHeader
          title="Verify Code"
          description="Please enter the code we just sent to email"
        />
        <VerifyOTPForm />
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;
