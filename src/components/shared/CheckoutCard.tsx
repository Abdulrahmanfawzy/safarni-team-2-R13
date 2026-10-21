import { cn } from "@/lib/utils";

interface CheckoutCardProps {
  className?: string;
  cardholder?: string;
  cardNumber?: string;
}

export default function CheckoutCard({
  className,
  cardholder = "SAFARNI TRAVEL",
  cardNumber = "0000 0000 0000 0000",
}: CheckoutCardProps) {
  return (
    <div
      role="img"
      aria-label="Illustration of a payment card"
      className={cn(
        "relative aspect-[1.72/1] w-full max-w-[224px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#b4b5ff] via-[#8581ff] to-[#7169f5] p-5 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.65)]",
        className,
      )}
    >
      <div className="absolute -right-10 -top-12 size-36 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-14 -left-8 size-32 rounded-full bg-indigo-300/30 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="mb-1 flex gap-1">
            {[0, 1, 2, 3].map((segment) => (
              <span
                key={segment}
                className="h-1 w-1 rounded-full bg-[#ffe7a2]"
              />
            ))}
          </div>

          <div className="h-5 w-7 rounded-[4px] border border-[#ffc65a] bg-gradient-to-br from-[#ffe38a] to-[#ffbd42] shadow-sm" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="whitespace-nowrap text-[clamp(8px,1.1vw,12px)] font-medium tracking-[0.12em] text-white/90">
              {cardNumber}
            </span>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5 shrink-0 fill-none stroke-white/90"
              strokeWidth="1.3"
            >
              <path d="M8 4c5 4 5 12 0 16M12 6c4 3 4 9 0 12M16 8c2 2 2 6 0 8" />
            </svg>
          </div>

          <div className="flex items-end justify-between gap-2">
            <span className="h-1 w-12 rounded-full bg-gradient-to-r from-[#ff638c] to-[#ff9aab]" />

            <span className="max-w-[55%] truncate text-[7px] font-semibold tracking-[0.18em] text-white/80">
              {cardholder}
            </span>

            <span className="h-1 w-5 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
