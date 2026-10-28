import Title from "./_components/Title";
import HotelCard from "./_components/HotelCard";
import { BackButton } from "@/components/shared/BackButton";
import SearchInput from "@/components/shared/SearchInput";
import ServerDataFetcher from "@/components/common/ServerDataFetcher";
import { getRecommendationHotels } from "@/api/hotel.api";
import { Suspense } from "react";
import HotelCardSkeleton from "@/components/skeletons/HotelCardSkeleton";
import { GetRecommendProps } from "@/types/hotel.type";
import RecomndedSection from "./_components/sections/RecomndedSection";
import NearbyHotelsSection from "./_components/sections/NearbyHotelsSection";

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
            fetcherFun={() =>
              getRecommendationHotels({
                search: searchValue,
                sections: "recommended",
              })
            }
          >
            {(payload) => (
              <RecomndedSection items={payload?.data?.data ?? []} />
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
            fetcherFun={() =>
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
