import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <main className="flex  h-full flex-col gap-4 bg-white text-center">
      <div className="pt-16.75">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
          <Check aria-hidden="true" className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-7 text-2xl font-semibold tracking-tight text-slate-900">
          Room Booked Successfully!
        </h1>
        <p className="mt-2 text-base text-slate-500">please go to payment.</p>
      </div>

      <Link href="/">
        <Button>Go to Payment</Button>
      </Link>
    </main>
  );
}
