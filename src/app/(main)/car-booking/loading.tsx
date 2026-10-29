import { CarCardSkeleton, BrandSkeleton } from "@/components/skeletons/CarCardSkeleton";

export default function Loading() {
  return (
    <main
      aria-label="Loading car listings"
      aria-busy="true"
      className="mx-auto w-full max-w-[1120px] px-4 pb-8 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mb-4 flex animate-pulse items-center gap-3">
        <div className="size-8 shrink-0 rounded-full bg-slate-200" />
        <div className="h-10 flex-1 rounded-xl border border-slate-100 bg-slate-100" />
        <div className="size-8 shrink-0 rounded-md bg-slate-100" />
      </div>

      <section aria-hidden="true">
        <div className="mb-2.5 h-4 w-14 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7 sm:gap-3.5">
          {Array.from({ length: 7 }, (_, index) => (
            <BrandSkeleton key={index} />
          ))}
        </div>
      </section>

      <section aria-hidden="true" className="mt-4">
        <div className="mb-2.5 h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {Array.from({ length: 4 }, (_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <span className="sr-only">Loading cars, please wait.</span>
    </main>
  );
}
