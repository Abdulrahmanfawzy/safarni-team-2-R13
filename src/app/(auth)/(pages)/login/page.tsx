import LoginForm from "@/components/forms/LoginForm";
import AuthLayout from "../../_components/AuthLayouts";
import loginImage from "@/assets/images/auth-images/login.png";
const Login = () => {
  return (
    <AuthLayout image={loginImage}>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
