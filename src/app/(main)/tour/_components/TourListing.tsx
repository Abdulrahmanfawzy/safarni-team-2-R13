import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { getTours, mapTourToUi } from "@/api/ToursList";
import TourListingClient from "./TourListingClient";

interface TourListingProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TourListing({ searchParams }: TourListingProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  return (
    <ServerDataFetcher fetcherFn={() => getTours(10, currentPage)}>
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
