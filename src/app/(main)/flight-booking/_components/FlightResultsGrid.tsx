import FlightResultCard from "./FlightResultCard";
import type { FlightResult } from "@/types/flight.details";

interface FlightResultsGridProps {
  outboundFlights: FlightResult[];
  returnFlights: FlightResult[];
}

export default function FlightResultsGrid({
  outboundFlights,
  returnFlights,
}: FlightResultsGridProps) {
  const rowCount = Math.max(outboundFlights.length, returnFlights.length);

  if (rowCount === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-4">
      {Array.from({ length: rowCount }, (_, index) => {
        const outbound = outboundFlights[index];
        const returning = returnFlights[index];

        return (
          <div key={`flight-row-${index}`} className="contents">
            {outbound ? (
              <FlightResultCard flight={outbound} />
            ) : (
              <div aria-hidden="true" />
            )}

            {returning ? (
              <FlightResultCard flight={returning} />
            ) : (
              <div aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
