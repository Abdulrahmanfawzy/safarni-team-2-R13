"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md   p-8 text-center sm:p-12">
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-red-500">
          Error 404
        </h1>
        <h3 className="mb-3 text-2xl font-semibold text-gray-800">
          Page not found
        </h3>
        <p className="mb-8 text-gray-500">
          The page you are looking for {"doesn't"} exist or may have moved.
        </p>
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </div>
    </div>
  );
};

export default NotFound;
