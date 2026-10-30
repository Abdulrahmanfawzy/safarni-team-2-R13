import Title from "./_components/Title";
import { BackButton } from "@/components/shared/BackButton";
import SearchInput from "@/components/shared/SearchInput";
import { getRecommendationHotels } from "@/api/hotel.api";
import { Suspense } from "react";
import HotelCardSkeleton from "@/components/skeletons/HotelCardSkeleton";
import RecomndedSection from "./_components/sections/RecomndedSection";
import NearbyHotelsSection from "./_components/sections/NearbyHotelsSection";
import ServerDataFetcher from "@/components/shared/ServerDataFetcher";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const params = await searchParams;

  const searchValue = typeof params.q === "string" ? params.q.trim() : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Search and back button */}
      <div className="flex items-center gap-3">
        <BackButton />
        <SearchInput paramKey="q" />
      </div>

      <div className="space-y-3">
        {/* Header */}
        <Title title="Recommendation" linkPath="/hotels" />

        {/* Recommendation cards  */}
        <Suspense fallback={<HotelCardSkeleton variant="vertical" />}>
          <ServerDataFetcher
            fetcherFn={() =>
              getRecommendationHotels({
                search: searchValue,
                sections: "recommended",
              })
            }
          >
            {(payload) => (
              <>
                <RecomndedSection items={payload?.data?.data ?? []} />
              </>
            )}
          </ServerDataFetcher>
        </Suspense>
      </div>

      <div className="space-y-3">
        {/* Header */}
        <Title title="Nearby Hotel" linkPath="/hotels" />

        {/* Nearby Hotel cards*/}

        <Suspense fallback={<HotelCardSkeleton variant="horizontal" />}>
          <ServerDataFetcher
            fetcherFn={() =>
              getRecommendationHotels({
                search: null,
                sections: "recommended",
              })
            }
          >
            {(payload) => (
              <NearbyHotelsSection items={payload?.data?.data ?? []} />
            )}
          </ServerDataFetcher>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
