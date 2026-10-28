import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { SeatSelection } from "../../_components/SeatSelection";
import { fetchFlightSeats } from "@/api/fight.seats";

interface SeatSelectionPageProps {
  searchParams: Promise<{
    flightId?: string | string[];
  }>;
}

export default async function SeatSelectionPage({
  searchParams,
}: SeatSelectionPageProps) {
  const params = await searchParams;
  const flightIdParam = Array.isArray(params.flightId)
    ? params.flightId[0]
    : params.flightId;

  const flightId = Number(flightIdParam);

  if (!flightIdParam || !Number.isInteger(flightId) || flightId <= 0) {
    return (
      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <h1 className="text-lg font-semibold text-gray-900">
          Choose your seats
        </h1>
        <p className="mt-2 text-sm text-red-600" role="alert">
          A valid flight ID is missing. Open this page with a flightId query
          parameter, for example ?flightId=18.
        </p>
      </main>
    );
  }

  return (
    <ServerDataFetcher fetcherFn={() => fetchFlightSeats(flightId)}>
      {(seats) => <SeatSelection flightId={flightId} seats={seats} />}
    </ServerDataFetcher>
  );
}
