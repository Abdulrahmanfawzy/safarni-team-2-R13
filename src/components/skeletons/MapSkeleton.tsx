import { Skeleton } from "@/components/ui/skeleton";

export default function MapSkeleton() {
  return (
    <section
      aria-label="Loading car pickup map"
      aria-busy="true"
      className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden"
    >
      <div className="relative h-[calc(100dvh-90px)] min-h-[520px] w-full overflow-hidden bg-slate-100">
        {/* Map background placeholder */}
        <Skeleton className="absolute inset-0 rounded-none" />

        {/* Map route placeholder */}
        <div className="pointer-events-none absolute left-[35%] top-[25%] h-[42%] w-[3px] rotate-[20deg] rounded-full bg-orange-300/70" />

        {/* Recenter control placeholder */}
        <Skeleton className="absolute right-4 top-4 z-10 size-9 rounded-full" />

        {/* Time badge placeholder */}
        <Skeleton className="absolute left-[65%] top-[18%] z-10 h-6 w-14 rounded-md" />

        {/* Car information card placeholder */}
        <div className="absolute bottom-3 left-1/2 z-10 w-[calc(100%-24px)] max-w-[520px] -translate-x-1/2 sm:bottom-5">
          <article className="rounded-lg bg-white px-3 pb-3 pt-3 shadow-[0_3px_18px_rgba(15,23,42,0.18)]">
            <div className="relative min-h-[74px]">
              <Skeleton className="mt-2 h-4 w-[42%]" />
              <Skeleton className="absolute -right-1 -top-1 h-[65px] w-[42%] rounded-md" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>

            <div className="mt-4 flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="mt-3 h-3 w-3/4" />
            <Skeleton className="mt-3 h-[30px] w-full rounded-[4px]" />
          </article>
        </div>
      </div>
    </section>
  );
}
