import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { getTours, mapTourToUi } from "@/api/ToursList";
import TourListingClient from "./TourListingClient";

interface TourListingProps {
  page: number;
}

export default function TourListing({ page }: TourListingProps) {
  return (
    <ServerDataFetcher fetcherFn={() => getTours(10, page)}>
      {(payload) => (
        <TourListingClient
          tours={payload.items.map(mapTourToUi)}
          currentPage={payload.meta.currentPage}
          lastPage={payload.meta.lastPage}
        />
      )}
    </ServerDataFetcher>
  );
}