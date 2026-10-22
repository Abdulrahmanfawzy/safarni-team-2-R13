import { CAR_BRANDS } from "@/constants/cars";
import type { CarBrand } from "@/types/car.types";
import BrandCard from "./BrandCard";

type BrandsSectionProps = {
  onSelectBrand: (brandName: string) => void;
};

export default function BrandsSection({ onSelectBrand }: BrandsSectionProps) {
  return (
    <section aria-labelledby="brands-heading">
      <h2
        id="brands-heading"
        className="mb-2.5 text-[13px] font-medium text-slate-800"
      >
        Brands
      </h2>

      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7 sm:gap-3.5">
        {CAR_BRANDS.map((brand: CarBrand) => (
          <BrandCard key={brand.name} brand={brand} onSelect={onSelectBrand} />
        ))}
      </div>
    </section>
  );
}
