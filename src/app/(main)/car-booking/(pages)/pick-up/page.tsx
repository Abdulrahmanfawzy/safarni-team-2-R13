import { Suspense } from "react";

import { getCarDetails } from "@/api/cars";
import ServerDataFetcher from "@/components/shared/ServerDataFetcher";

import PickUpPage from "../../_components/PickUpPage";
import PickUpSkeleton from "../../../../../components/skeletons/PickUpSkeleton";

type PageProps = {
  searchParams: Promise<{
    carId?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { carId } = await searchParams;

  if (!carId || !/^\d+$/.test(carId)) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-lg font-semibold text-slate-900">Select a car</h1>

        <p className="mt-2 text-sm text-slate-500">
          Return to the car listing and choose a car to view its details.
        </p>
      </main>
    );
  }

  return (
    <Suspense fallback={<PickUpSkeleton />}>
      <ServerDataFetcher fetcherFn={() => getCarDetails(carId)}>
        {(car) => <PickUpPage car={car} />}
      </ServerDataFetcher>
    </Suspense>
  );
}
