import type { Car } from "@/types/car.types";
import CarCard from "./CarCard";

type PopularCarsSectionProps = {
  cars: Car[];
};

export default function PopularCarsSection({ cars }: PopularCarsSectionProps) {
  return (
    <section aria-labelledby="popular-cars-heading" className="mt-4">
      <h2
        id="popular-cars-heading"
        className="mb-2.5 text-[13px] md:text-lg font-medium text-slate-800"
      >
        popular Cars
      </h2>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-slate-100 px-4 py-8 text-center text-sm text-slate-500">
          No cars match your search.
        </p>
      )}
    </section>
  );
}
