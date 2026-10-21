import { Plane } from "lucide-react";
import type { FlightResult } from "@/constants/flight-results.data";

interface FlightResultCardProps {
  flight: FlightResult;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  return (
    <article
      className="relative min-w-0 rounded-[22px] border border-slate-100 bg-white 
    px-4 pb-4 pt-4 shadow-[0_2px_5px_rgba(16,24,40,0.045)] before:absolute before:-left-[11px]
    before:top-1/2 before:size-[22px] before:-translate-y-1/2 before:rounded-full before:border
     before:border-slate-50 before:bg-white before:content-[''] after:absolute
     after:-right-2.75 after:top-1/2 after:size-[22px] after:-translate-y-1/2
     after:rounded-full after:border after:border-slate-50 after:bg-white after:content-['']"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-start gap-1">
        <div className="min-w-0 mb-1  lg:space-y-2">
          <p className=" text-sm font-semibold leading-4 tracking-[-0.02em] lg:text-[23px]">
            {flight.departureTime}
          </p>

          <p className="mt-1 text-[12px] lg:text-[23px] leading-4 text-slate-500">
            {flight.departureAirport}
          </p>
        </div>

        <div className="flex flex-col items-center pt-1 text-slate-700">
          <Plane
            aria-hidden="true"
            className="size-[10px] lg:text-[13px] fill-current stroke-[1.5]"
          />

          <span className="mt-1 text-[9px] lg:text-[18px]  leading-none">
            {flight.duration}
          </span>
        </div>

        <div className="min-w-0 text-right lg:space-y-3">
          <p className="text-[12px] font-semibold leading-4 tracking-[-0.02em] lg:text-[23px]">
            {flight.arrivalTime}
          </p>

          <p className="mt-1 text-[12px] lg:text-[23px] leading-4 text-slate-500">
            {flight.arrivalAirport}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[9px] lg:text-[16px] leading-3 text-slate-500">
        {flight.layover}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3 ">
        <span className="text-[12px] lg:text-[23px] font-medium leading-4">
          {flight.airline}
        </span>

        <span
          className="whitespace-nowrap text-[12px] font-semibold leading-4 
        lg:text-[23px]"
        >
          {flight.price}
        </span>
      </div>
    </article>
  );
}
