import { Suspense } from "react";

import TourListing from "../_components/TourListing";
import TourListingSkeleton from "@/components/skeletons/TourListingSkeleton";

export const metadata = {
  title: "Tours | Safarni",
  description: "Explore tours and destinations.",
};

export default function TourPage() {
  return (
    <Suspense fallback={<TourListingSkeleton />}>
      <TourListing />
    </Suspense>
  );
}
