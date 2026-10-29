import { Skeleton } from "@/components/ui/skeleton";

export default function PickUpSkeleton() {
  return (
    <section
      aria-label="Loading car details"
      aria-busy="true"
      className="w-full px-4 pb-8 pt-1 sm:px-6 lg:px-0"
    >
      {/* Back button placeholder */}
      <Skeleton className="mb-3 size-8 rounded-full" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
        {/* Car gallery placeholder */}
        <div className="space-y-3">
          <Skeleton className="min-h-64 w-full rounded-lg" />

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Car information placeholder */}
        <div className="min-w-0 space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />

            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-12 w-full rounded-md" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-16" />

            {Array.from({ length: 2 }, (_, index) => (
              <Skeleton key={index} className="h-20 w-full rounded-md" />
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
