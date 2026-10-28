export const CompareCardSkeleton = () => {
  return (
    <div className="animate-pulse p-4 rounded-4xl shadow-app-card-shadow">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="min-w-25 w-full h-25 rounded-xl bg-gray-200 md:size-25" />

        {/* content */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export const ComparePriceSkeleton = () => {
  return (
    <div className="animate-pulse flex w-full flex-col gap-4 rounded-lg border border-gray-300 bg-gray-50 p-6">
      {/* Title and Price */}
      <div className="space-y-2">
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="flex items-baseline gap-2">
          <div className="h-10 w-24 rounded bg-gray-200" />
          <div className="h-6 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="size-5 shrink-0 rounded-full bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-3">
          <div className="size-5 shrink-0 rounded-full bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-3">
          <div className="size-5 shrink-0 rounded-full bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};
