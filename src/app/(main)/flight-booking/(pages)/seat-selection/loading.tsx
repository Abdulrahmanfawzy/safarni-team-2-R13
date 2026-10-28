import { Skeleton } from "@/components/ui/skeleton";

export default function SeatSelectionLoading() {
  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.82fr)] lg:items-center lg:gap-8 lg:px-10">
      <section className="min-w-0">
        <Skeleton className="aspect-square w-full rounded-2xl" />
      </section>

      <section className="mx-auto w-full max-w-sm space-y-4 py-4">
        <Skeleton className="mx-auto h-8 w-36" />
        <Skeleton className="h-5 w-full" />
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 30 }, (_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-sm" />
          ))}
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-9 w-full rounded-sm" />
      </section>
    </main>
  );
}
