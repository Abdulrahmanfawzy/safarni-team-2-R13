import Link from "next/link";
import type { FlightResult } from "@/constants/flight-results.data";

interface FlightResultCardProps {
  flight: FlightResult;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  return (
    <Link
      href={`/flight-booking/seat-selection?flightId=${encodeURIComponent(
        flight.id,
      )}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Select flight from ${flight.departureAirport} to ${flight.arrivalAirport}`}
    >
      <article className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
        {/* Flight times and airports */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{flight.departureTime}</p>
            <p className="text-sm text-gray-500">{flight.departureAirport}</p>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <p className="text-xs text-gray-500">{flight.duration}</p>
            <div className="my-2 h-px w-full bg-gray-300" />
            <p className="text-xs text-gray-500">{flight.layover}</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">{flight.arrivalTime}</p>
            <p className="text-sm text-gray-500">{flight.arrivalAirport}</p>
          </div>
        </div>

        {/* Airline and price */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm font-medium">{flight.airline}</p>
          <p className="text-lg font-semibold">{flight.price}</p>
        </div>
      </article>
    </Link>
  );
}
