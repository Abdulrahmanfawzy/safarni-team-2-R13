"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "PayPal" | "Mastercard" | "Visa";

interface PaymentMethodCardProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  className?: string;
}

const methods: {
  value: PaymentMethod;
  label: string;
  mark: string;
  markClass: string;
}[] = [
  {
    value: "PayPal",
    label: "Paypal",
    mark: "P",
    markClass: "bg-[#123e82] text-white italic",
  },
  {
    value: "Mastercard",
    label: "Mastercard",
    mark: "●",
    markClass: "text-[#eb001b]",
  },
  {
    value: "Visa",
    label: "Visa",
    mark: "VISA",
    markClass: "text-[#1a3e8a] text-[8px] italic",
  },
];

export default function PaymentMethodCard({
  value,
  onChange,
  className,
}: PaymentMethodCardProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      aria-label="Payment method"
    >
      {methods.map((method) => {
        const selected = value === method.value;

        return (
          <button
            key={method.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(method.value)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full border px-2 text-[11px] transition-colors",
              selected
                ? "border-[#1e429f]/30 bg-[#eef3ff] text-[#1e429f]"
                : "border-transparent bg-[#f3f4f6] text-[#475467] hover:bg-slate-200",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "flex size-3.5 items-center justify-center rounded-sm font-bold leading-none",
                method.markClass,
              )}
            >
              {method.mark}
            </span>

            <span>{method.label}</span>

            {selected && <Check aria-hidden="true" className="size-3" />}
          </button>
        );
      })}
    </div>
  );
}
