import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { getTours, mapTourToUi } from "@/api/tours";
import TourListingClient from "./TourListingClient";

export default function TourListing() {
  return (
    <ServerDataFetcher fetcherFn={() => getTours(10)}>
      {(payload) => (
        <TourListingClient tours={payload.items.map(mapTourToUi)} />
      )}
    </ServerDataFetcher>
  );
}
