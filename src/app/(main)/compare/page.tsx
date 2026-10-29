import { BackButton } from "@/components/shared/BackButton";
import SearchInput from "@/components/shared/SearchInput";
import { Suspense } from "react";
import {
  CompareCardSkeleton,
  ComparePriceSkeleton,
} from "@/components/skeletons/CompareSkeleton";
import CompareCardList from "./_components/CompareCardList";
import ComparePriceCardList from "./_components/ComparePriceCardList";
import { getToursSearch } from "@/api/compare.api";
import { selectedTours } from "@/actions/compare.action";
import ServerDataFetcher from "@/components/shared/ServerDataFetcher";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;

  const searchValue = typeof params.q === "string" ? params.q.trim() : "";

  const tourIds = Array.isArray(params.tour_id)
    ? params.tour_id
    : params.tour_id
      ? [params.tour_id]
      : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <SearchInput
          resetParams={["tour_id", "tour_plane"]}
          paramKey="q"
          placeholder="Search for a tour..."
        />
      </div>

      {!searchValue ? (
        <div className="flex min-h-full items-center justify-center">
          <p className="text-sm text-gray-500">
            Search for a tour to start comparing.
          </p>
        </div>
      ) : (
        <>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <CompareCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <ServerDataFetcher fetcherFn={() => getToursSearch(searchValue)}>
              {(payload) => (
                <CompareCardList tourCards={payload?.data?.items ?? []} />
              )}
            </ServerDataFetcher>
          </Suspense>

          {/* Compare Price Cards */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium text-gray-900">
              Price Compare
            </h2>
            {tourIds.length === 0 ? (
              <div className="flex min-h-full items-center justify-center">
                <p className="text-sm text-gray-500">
                  Select a tour to start comparing.
                </p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {Array.from({ length: tourIds.length }).map((_, index) => (
                      <ComparePriceSkeleton key={index} />
                    ))}
                  </div>
                }
              >
                <ServerDataFetcher fetcherFn={() => selectedTours(tourIds)}>
                  {(payload) => (
                    <ComparePriceCardList
                      selctedTours={payload.data?.items ?? []}
                    />
                  )}
                </ServerDataFetcher>
              </Suspense>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
