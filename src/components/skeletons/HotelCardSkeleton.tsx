interface HotelCardSkeletonProps {
  variant?: "vertical" | "horizontal";
  reapetCard?: number;
}

export default function HotelCardSkeleton({
  variant = "vertical",
  reapetCard = 4,
}: HotelCardSkeletonProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {Array.from({ length: reapetCard }).map((_, i) => (
        <article
          key={i}
          aria-hidden="true"
          className={`animate-pulse rounded-2xl p-4 shadow-app-card-shadow ${
            isHorizontal
              ? "flex min-w-0 items-center gap-2.5"
              : "flex flex-col gap-2"
          }`}
        >
          <div
            className={`shrink-0 rounded-lg bg-gray-200 ${
              isHorizontal ? "size-28" : "h-50 w-full"
            }`}
          />

          <div className="flex w-full flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <div className="h-5 w-16 rounded bg-gray-200" />
              <div className="h-4 w-10 rounded bg-gray-200" />
            </div>
            <div className="mt-1.5 h-6 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
        </article>
      ))}
    </div>
  );
}
