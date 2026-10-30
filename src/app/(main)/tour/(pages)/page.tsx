import { Suspense } from "react";

import TourListing from "../_components/TourListing";
import TourListingSkeleton from "@/components/skeletons/TourListingSkeleton";

export const metadata = {
  title: "Tours | Safarni",
  description: "Explore tours and destinations.",
};

interface TourPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default function TourPage({ searchParams }: TourPageProps) {
  return (
    <Suspense fallback={<TourListingSkeleton />}>
      <TourListing searchParams={searchParams} />
    </Suspense>
  );
}