"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Car, CarBrand } from "@/types/car.types";
import CarsToolbar from "./CarsToolbar";
import BrandsSection from "./BrandsSection";
import PopularCarsSection from "./PopularCarsSection";

type CarsPageProps = {
  cars: Car[];
  brands: CarBrand[];
};

export default function CarsPage({ cars, brands }: CarsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const querySearch = searchParams.get("search") ?? "";
  const selectedBrand = searchParams.get("brand");

  const [search, setSearch] = useState(querySearch);

  useEffect(() => {
    setSearch(querySearch);
  }, [querySearch]);

  const visibleCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cars.filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query);

      const matchesBrand =
        !selectedBrand ||
        car.brand.toLowerCase() === selectedBrand.toLowerCase();

      return matchesSearch && matchesBrand;
    });
  }, [cars, search, selectedBrand]);

  function updateBrand(brandName: string) {
    const params = new URLSearchParams(searchParams.toString());
    const isAlreadySelected =
      selectedBrand?.toLowerCase() === brandName.toLowerCase();

    if (isAlreadySelected) {
      params.delete("brand");
    } else {
      params.set("brand", brandName);
    }

    // Reset pagination if pagination is added later.
    params.delete("page");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <CarsToolbar search={search} onSearchChange={setSearch} />

      <BrandsSection
        brands={brands}
        selectedBrand={selectedBrand}
        onSelectBrand={updateBrand}
      />

      <PopularCarsSection cars={visibleCars} />
    </main>
  );
}
