import type { CarBrand } from "@/types/car.types";
import BrandCard from "./BrandCard";

type BrandsSectionProps = {
  brands: CarBrand[];
  selectedBrand: string | null;
  onSelectBrand: (brandName: string) => void;
};

export default function BrandsSection({
  brands,
  selectedBrand,
  onSelectBrand,
}: BrandsSectionProps) {
  return (
    <section aria-labelledby="brands-heading">
      <h2
        id="brands-heading"
        className="mb-2.5 text-[13px] md:text-lg font-medium text-slate-800"
      >
        Brands
      </h2>

      {brands.length > 0 ? (
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7 sm:gap-3.5">
          {brands.slice(0, 7).map((brand) => (
            <BrandCard
              key={brand.name.toLowerCase()}
              brand={brand}
              selected={
                selectedBrand?.toLowerCase() === brand.name.toLowerCase()
              }
              onSelect={onSelectBrand}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-slate-100 bg-white px-4 py-6 text-center text-sm text-slate-500">
          No brands available.
        </p>
      )}
    </section>
  );
}
