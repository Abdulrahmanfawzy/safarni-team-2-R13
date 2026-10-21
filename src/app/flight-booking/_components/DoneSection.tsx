"use client";
import Image from "next/image";
import Rect from "@/assets/images/Rectangle 20.png"
import { useState, type FormEvent } from "react";
import { ChevronLeft, CircleCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaymentSection() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[1200px]">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="mb-3 flex size-8 items-center justify-center rounded-full bg-[#f3f4f6] text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e429f]"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>

      <div
        className="grid grid-cols-1 items-stretch gap-6 
      md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-10 lg:gap-16"
      >
        <div
          className="flex min-h-[280px] items-center justify-center rounded-[20px]
         bg-[#f4f4f5] p-8 sm:min-h-[360px]"
        >
          <Image
            src={Rect}
            alt="Airplane illustration"
            priority
            className=" size-44 lg:h-[70%]"
          />
        </div>

        <div className="flex min-w-0 w-127  flex-col justify-center items-center text-center space-y-6  py-1">
          <CircleCheck className="size-13.5 text-green-400 text-center" />
          <p className="mt-4 text-xs lg:text-2xl font-medium text-slate-700">
            Payment Successful
          </p>
          <span>Thank You for Your Trust </span>
          <Button
            type="submit"
            className="h-9 w-full rounded-sm bg-app-primary text-xs font-semibold text-white hover:bg-app-primary/90"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
