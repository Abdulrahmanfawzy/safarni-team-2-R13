"use client";

import { useMemo, useState } from "react";
import { POPULAR_CARS } from "@/constants/cars";
import CarsToolbar from "./CarsToolbar";
import BrandsSection from "./BrandsSection";
import PopularCarsSection from "./PopularCarsSection";

export default function CarsPage() {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const visibleCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    return POPULAR_CARS.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(query);

      const matchesBrand = selectedBrand === null;

      return matchesSearch && matchesBrand;
    });
  }, [search, selectedBrand]);

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <CarsToolbar search={search} onSearchChange={setSearch} />

      <BrandsSection
        onSelectBrand={(brandName) => {
          setSelectedBrand((current) =>
            current === brandName ? null : brandName,
          );
        }}
      />

      <PopularCarsSection cars={visibleCars} />
    </main>
  );
}
