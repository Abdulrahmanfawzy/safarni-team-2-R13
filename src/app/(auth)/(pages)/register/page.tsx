import RegisterForm from "@/components/forms/RegisterForm";
import AuthLayout from "../../_components/AuthLayouts";
import registerImage from "@/assets/images/auth-images/register.png";
import FormHeader from "@/components/shared/FormHeader";
import Link from "next/link";
const Register = () => {
  return (
    
    <AuthLayout image={registerImage}>
      <div className="flex flex-col gap-3 text-center w-full">
        {/* Header */}
        <div className="mb-4">
          <FormHeader
            title="Register your Account"
            description="create your account to get the best experience"
          />
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Sign Up Link */}
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
    </AuthLayout>
  );
};

export default Register;
