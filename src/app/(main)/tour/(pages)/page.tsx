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

export default async function TourPage({ searchParams }: TourPageProps) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  return (
    <Suspense key={currentPage} fallback={<TourListingSkeleton />}>
      <TourListing page={currentPage} />
    </Suspense>
  );
}