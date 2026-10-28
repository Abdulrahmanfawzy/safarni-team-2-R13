import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { getFlights } from "@/api/flights";
import type { FlightSearchParams } from "@/types/flight.details";
import FlightResultsSection from "../../_components/FlightResultsSection";

type FlightDetailsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function parseSearchParams(
  params: Record<string, string | string[] | undefined>,
): FlightSearchParams | null {
  const type = getSingleParam(params.type);
  const location = getSingleParam(params.location)?.trim();
  const dest = getSingleParam(params.dest)?.trim();
  const departure = getSingleParam(params.departure);
  const returnDate = getSingleParam(params.return);
  const passengerValue = getSingleParam(params.passenger);
  const passenger = Number(passengerValue);

  if (
    (type !== "round_trip" && type !== "one_way") ||
    !location ||
    !dest ||
    !departure ||
    !passengerValue ||
    !Number.isInteger(passenger) ||
    passenger < 1
  ) {
    return null;
  }

  if (type === "round_trip" && !returnDate) {
    return null;
  }

  if (returnDate && returnDate < departure) {
    return null;
  }

  return {
    type,
    location,
    dest,
    departure,
    passenger,
    ...(type === "round_trip" && returnDate ? { return: returnDate } : {}),
  };
}

export default async function FlightResultsPage({
  searchParams,
}: FlightDetailsPageProps) {
  const params = await searchParams;
  const search = parseSearchParams(params);

  if (!search) {
    return (
      <main className="min-h-screen bg-white px-5 pb-10 pt-6 text-slate-900 sm:px-8">
        <p
          role="alert"
          className="mx-auto max-w-300 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
        >
          Your flight search details are missing or invalid. Return to the
          flight-booking page and search again.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-5 pb-10 pt-6 text-slate-900 sm:px-8">
      <ServerDataFetcher fetcherFn={() => getFlights(search)}>
        {(results) => (
          <FlightResultsSection results={results} search={search} />
        )}
      </ServerDataFetcher>
    </main>
  );
}
