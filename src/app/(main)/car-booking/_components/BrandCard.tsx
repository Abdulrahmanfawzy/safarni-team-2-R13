import type { CarBrand } from "@/types/car.types";

type BrandCardProps = {
  brand: CarBrand;
  selected?: boolean;
  onSelect?: (brandName: string) => void;
};

export default function BrandCard({
  brand,
  selected = false,
  onSelect,
}: BrandCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(brand.name)}
      aria-label={`Filter cars by ${brand.name}`}
      aria-pressed={selected}
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-md border px-2 py-2 shadow-[0_1px_5px_rgba(15,23,42,0.04)] transition focus-visible:outline-2 focus-visible:outline-app-primary ${
        selected
          ? "border-app-primary bg-blue-50"
          : "border-slate-100 bg-white hover:border-app-primary/40"
      }`}
    >
      <span
        className={`flex h-7 items-center justify-center text-xl leading-none ${
          brand.markClass ?? "text-slate-600"
        }`}
      >
        {brand.mark}
      </span>

      <span className="text-center text-[11px] lg:text-lg leading-4 text-slate-900">
        {brand.name}
      </span>

      <span className="text-[10px] leading-3 text-app-primary">
        {brand.count}
      </span>
    </button>
  );
}
