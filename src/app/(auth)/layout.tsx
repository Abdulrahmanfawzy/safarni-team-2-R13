import Image from "next/image";
import type { ReactNode } from "react";
import logo from "@/assets/images/logo.png";
import { BackButton } from "@/components/shared/BackButton";

interface AuthGroupLayoutProps {
  children: ReactNode;
}

const AuthGroupLayout = ({ children }: AuthGroupLayoutProps) => {
  return (
    <div className="container mx-auto h-screen px-4 py-4">
      <div className="flex justify-between items-center">
        {/* return back button */}
        <BackButton />
        {/* Logo */}
        <div>
          <div className="relative flex justify-center w-fit gap-1 flex-col">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="object-contain size-12"
            />
            <p>Safarni</p>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};

export default AuthGroupLayout;
