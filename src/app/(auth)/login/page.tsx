import LoginForm from "@/components/forms/LoginForm";
import AuthLayout from "../_components/AuthLayouts";
import loginImage from "@/assets/images/auth-images/login.png";
import FormHeader from "@/components/shared/FormHeader";
import Link from "next/link";
const Login = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const query = new URLSearchParams(params).toString();
  return (
    <AuthLayout image={loginImage}>
      <div className="flex flex-col gap-3 text-center w-full">
        {/* Header */}
        <div className="mb-4">
          <FormHeader
            title="Welcome Again"
            description="welcome back! please fill your Data"
          />
        </div>

        {/* Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <p className="text-sm font-medium">
          {"Don't"} have an account?{" "}
          <Link
            href={`/register?${query}`}
            className="text-app-primary hover:underline font-semibold"
          >
            sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
