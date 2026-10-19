import AuthLayout from "@/app/(auth)/_components/AuthLayouts";
import forgetPasswordImage from "@/assets/images/auth-images/forget-password.png";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";

const ForgetPassword = () => {
  return (
    <AuthLayout image={forgetPasswordImage}>
      <ForgetPasswordForm />
    </AuthLayout>
  );
};

export default ForgetPassword;
