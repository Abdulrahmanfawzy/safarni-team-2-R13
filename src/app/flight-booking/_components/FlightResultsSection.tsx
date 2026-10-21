"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FlightDateHeader from "./FlightDateHeader";
import FlightResultsGrid from "./FlightResultsGrid";
import {
  outboundFlights,
  returnFlights,
} from "@/constants/flight-results.data";

export default function FlightResultsSection() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-300">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="mb-2 flex size-8 items-center justify-center rounded-full bg-[#f3f4f6] text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e429f]"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <FlightDateHeader date="Dec 16th, 2025" kind="departure" />

        <FlightDateHeader date="Jan 6th, 2025" kind="return" />
      </div>

      <div className="mt-5">
        <FlightResultsGrid
          outboundFlights={outboundFlights}
          returnFlights={returnFlights}
        />
      </div>
    </section>
  );
}
