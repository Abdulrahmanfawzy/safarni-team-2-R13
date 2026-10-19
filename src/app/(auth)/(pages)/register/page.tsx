import RegisterForm from "@/components/forms/RegisterForm";
import AuthLayout from "../../_components/AuthLayouts";
import registerImage from "@/assets/images/auth-images/register.png";
const Register = () => {
  return (
    <AuthLayout image={registerImage}>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
