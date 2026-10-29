import { Skeleton } from "@/components/ui/skeleton";

export default function TourListingSkeleton() {
  return (
    <main
      aria-label="Loading tours"
      aria-busy="true"
      className="container mx-auto px-4 py-6"
    >
      {/* Back button placeholder */}
      <Skeleton className="mb-4 h-6 w-20" />

      {/* Page heading placeholder */}
      <Skeleton className="mb-4 h-8 w-48" />

      {/* Search input placeholder */}
      <div className="mb-6">
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      {/* Tour cards placeholders */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-slate-200"
          >
            {/* Tour image */}
            <Skeleton className="h-52 w-full rounded-none" />

            <div className="space-y-3 p-4">
              {/* Tour title */}
              <Skeleton className="h-5 w-3/4" />

              {/* Tour details */}
              <Skeleton className="h-4 w-1/2" />

              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
