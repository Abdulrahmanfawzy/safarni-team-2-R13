import Image from "next/image";
import type { ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
interface AuthLayoutProps {
  children: ReactNode;
  image: string | StaticImport;
  imageAlt?: string;
}

const AuthLayout = ({
  children,
  image,
  imageAlt = "Authentication",
}: AuthLayoutProps) => {
  return (
    <div className="grid h-full grid-cols-12 gap-6 py-3">
      <div className="relative hidden items-center justify-center  md:col-span-6 md:flex">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="rounded-md object-contain"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
