"use client";

import { useState, type FormEvent } from "react";
import { ChevronLeft, CreditCard, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CheckoutCard from "@/components/shared/CheckoutCard";
import PaymentMethodCard, {
  type PaymentMethod,
} from "@/components/shared/PaymentMethodCard";

export default function PaymentSection() {
  const router = useRouter();

  const [method, setMethod] = useState<PaymentMethod>("PayPal");
  const [showDetails, setShowDetails] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Booking details saved locally. No payment has been processed.");
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] main_container">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="mb-3 flex size-8 items-center justify-center rounded-full bg-[#f3f4f6] text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e429f]"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>

      <div className="grid grid-cols-1 items-stretch gap-6 
      md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10 lg:gap-16">
        <div className="flex min-h-[280px] items-center justify-center rounded-[20px]
         bg-[#f4f4f5] p-8 sm:min-h-[360px]">
          <CheckoutCard
            className="max-w-[224px]"
            cardholder={fullName || "SAFARNI TRAVEL"}
          />
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center py-1">
          <h1 className="text-base font-semibold text-slate-900">
            Payment Method
          </h1>

          <p className="mt-4 text-xs font-medium text-slate-700">
            Add You Payment Method
          </p>

          <PaymentMethodCard
            className="mt-2"
            value={method}
            onChange={setMethod}
          />

          {showDetails ? (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div className="space-y-1">
                <label
                  htmlFor="checkout-full-name"
                  className="block text-[11px] font-medium text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <CreditCard
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="checkout-full-name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter full name"
                    autoComplete="cc-name"
                    required
                    className="h-8 rounded-sm border-slate-200 pl-8 text-xs shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="checkout-email"
                  className="block text-[11px] font-medium text-slate-700"
                >
                  Your Email
                </label>

                <div className="relative">
                  <Mail
                    aria-hidden="true"
                    className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email address"
                    autoComplete="email"
                    required
                    className="h-8 rounded-sm border-slate-200 pl-8 text-xs shadow-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-9 w-full rounded-sm bg-app-primary text-xs font-semibold text-white hover:bg-app-primary/90"
              >
                Confirm Booking
              </Button>

              {message && (
                <p role="status" className="text-xs text-slate-600">
                  {message}
                </p>
              )}
            </form>
          ) : (
            <div className="mt-auto flex flex-col items-center gap-3 pt-8 md:pt-16">
              <button
                type="button"
                onClick={() => setShowDetails(true)}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-900 hover:text-app-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-primary"
              >
                Add Card
                <CreditCard aria-hidden="true" className="size-3.5" />
              </button>

              <Button
                type="button"
                onClick={() => setShowDetails(true)}
                className="h-9 w-full rounded-sm bg-app-primary text-xs font-semibold text-white hover:bg-app-primary/90"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
