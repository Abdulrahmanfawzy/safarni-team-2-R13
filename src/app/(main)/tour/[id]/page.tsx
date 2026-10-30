import { Suspense } from "react";

import TourDetailsView from "../_components/TourDetailsView";

export const metadata = {
  title: "Tour Details | Safarni",
  description: "Tour details and booking information.",
};

interface TourDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function TourDetailsPage({ params }: TourDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-5xl px-4 py-6">
          <div className="h-56 w-full animate-pulse rounded-xl bg-gray-200 sm:h-96" />
          <div className="mt-4 h-7 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
      }
    >
      <TourDetailsView params={params} />
    </Suspense>
  );
}