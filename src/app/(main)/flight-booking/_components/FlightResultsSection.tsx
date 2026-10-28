"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type {
  FlightSearchParams,
  FlightSearchResults,
} from "@/types/flight.details";
import FlightDateHeader from "./FlightDateHeader";
import FlightResultsGrid from "./FlightResultsGrid";

interface FlightResultsSectionProps {
  results: FlightSearchResults;
  search: FlightSearchParams;
}

function formatFlightDate(value?: string): string {
  if (!value) {
    return "Not selected";
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return value;
  }

  const [, year, month, day] = match;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
}

export default function FlightResultsSection({
  results,
  search,
}: FlightResultsSectionProps) {
  const router = useRouter();

  const { outboundFlights, returnFlights } = results;
  const isRoundTrip = search.type === "round_trip";

  const departureDate = formatFlightDate(search.departure);
  const returnDate = isRoundTrip
    ? formatFlightDate(search.return)
    : "One-way trip";

  const hasFlights = outboundFlights.length > 0 || returnFlights.length > 0;

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

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <p>
          {search.location} to {search.dest}
        </p>
        <p>
          {search.passenger}{" "}
          {search.passenger === 1 ? "passenger" : "passengers"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <FlightDateHeader date={departureDate} kind="departure" />

        <FlightDateHeader date={returnDate} kind="return" />
      </div>

      <div className="mt-5">
        {hasFlights ? (
          <FlightResultsGrid
            outboundFlights={outboundFlights}
            returnFlights={returnFlights}
          />
        ) : (
          <p
            role="status"
            className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600"
          >
            No flights are available for the selected route and dates.
          </p>
        )}
      </div>
    </section>
  );
}
