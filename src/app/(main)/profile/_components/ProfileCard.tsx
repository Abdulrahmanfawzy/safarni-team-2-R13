"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function ProfileCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className='className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6"'>
      <Button variant={"link"} onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>

      <h1 className="text-xl font-semibold text-center text-gray-800 mb-8">
        {title}
      </h1>

      {children}
    </div>
  );
}
