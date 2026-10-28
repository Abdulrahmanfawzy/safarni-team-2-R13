import { Skeleton } from "@/components/ui/skeleton";

export default function FlightDetailsLoading() {
  return (
    <main
      aria-busy="true"
      className="min-h-screen bg-white px-5 pb-10 pt-6 text-slate-900 sm:px-8"
    >
      <section className="mx-auto w-full max-w-300">
        <Skeleton className="mb-4 size-8 rounded-full" />

        <div className="mb-4 flex flex-wrap justify-between gap-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <Skeleton className="h-11" />
          <Skeleton className="h-11" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="rounded-[22px] border border-slate-100 p-4"
            >
              <Skeleton className="mb-4 h-5 w-2/5" />

              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-8 w-16" />
              </div>

              <Skeleton className="mt-5 h-4 w-3/4" />
            </div>
          ))}
        </div>

        <p className="sr-only">Loading flight results...</p>
      </section>
    </main>
  );
}
