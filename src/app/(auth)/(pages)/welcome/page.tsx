import { Button } from "@/components/ui/button";
import AuthLayout from "../../_components/AuthLayouts";
import welcomeIamge from "@/assets/images/auth-images/welcome.jpg";
import Link from "next/link";
import FormHeader from "@/components/forms/FormHeader";
const Welcome = () => {
  return (
    <AuthLayout image={welcomeIamge}>
      <div className="flex justify-center text-center flex-col items-center gap-6">
        <FormHeader
          title="Welcome"
          description="Safarni is your all-in-one travel guide. Discover destinations,
          compare trip prices, book flights, hotels, car rentals, and local
          tours all through one interactive experience."
        />

        <div className="flex flex-col  w-full   gap-4">
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link href="/register">
            <Button className="w-full" variant="outline">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Welcome;
