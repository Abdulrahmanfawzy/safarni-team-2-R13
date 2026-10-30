export default function RoomTabsSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-5 shrink-0 animate-pulse rounded bg-gray-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    </>
  );
}
