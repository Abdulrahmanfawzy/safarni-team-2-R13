import Image from "next/image";
import type { CarCardProps } from "@/types/car.types";

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-md border border-slate-100 bg-white px-2.5 pb-2.5 pt-3 shadow-[0_1px_5px_rgba(15,23,42,0.04)]">
      <div className="relative min-h-[52px]">
        <h3 className="relative z-10 max-w-[55%] pt-0.5 text-[13px] font-medium leading-5 text-slate-900">
          {car.name}
        </h3>

        <div className="absolute -right-1 -top-5 h-[72px] w-[53%]">
          <Image
            src={car.image}
            alt={car.imageAlt}
            fill
            sizes="(max-width: 640px) 50vw, 280px"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="mt-1 grid grid-cols-3 items-center gap-1 text-[10px] text-slate-500 sm:text-[11px]">
        <span>{car.transmission}</span>
        <span className="border-x border-slate-100 text-center">
          {car.seats} seats
        </span>
        <span className="text-right">{car.fuel}</span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="h-[27px] rounded-[4px] bg-app-primary px-2 text-[10px] font-semibold text-white hover:bg-app-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-primary"
        >
          Rent Now
        </button>

        <button
          type="button"
          className="h-[27px] rounded-[4px] border border-app-primary/60 bg-white px-2 text-[10px] font-semibold text-app-primary hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-primary"
        >
          Detail
        </button>
      </div>
    </article>
  );
}
