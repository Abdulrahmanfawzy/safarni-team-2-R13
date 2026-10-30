import RoomTabsSkeleton from "./RoomTabsSkeleton";

export default function RoomDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Gallery Skeleton */}
      <div className="relative space-y-4 px-1">
        {/* Main Image */}
        <div className="h-112.5 w-full animate-pulse rounded-xl bg-gray-200" />

        {/* Thumbnails */}
        <div className="absolute right-1/2 bottom-6 flex w-[85%] translate-x-1/2 gap-2 rounded-xl bg-white p-2 shadow-md">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-14 min-w-0 flex-1 animate-pulse rounded-md bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Room Information Skeleton */}
      <div className="space-y-5 py-2">
        {/* Discount & Rating */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />

          <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* Room Name */}
        <div className="space-y-2">
          <div className="h-7 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-200 pb-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-16 animate-pulse rounded-md bg-gray-200"
            />
          ))}
        </div>

        <RoomTabsSkeleton />

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Book Now Button */}
        <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
