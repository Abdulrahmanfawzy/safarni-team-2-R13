"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ reset, error }: ErrorPageProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-16 text-gray-900">
      <div className="relative w-full max-w-lg text-center space-y-5">
        <div className="mx-auto   flex h-20 w-20 items-center justify-center rounded-3xl border border-gray-200 bg-white  ">
          <TriangleAlert className="text-app-primary size-10" />
        </div>

        <p className="  text-xl font-bold tracking-wider sm:text-2xl text-red-600">
          Something went wrong
        </p>

        <p className="mx-auto   max-w-md text-lg leading-7 text-slate-700">
          {error.message}
        </p>

        <Button onClick={() => reset()}> Try again</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
