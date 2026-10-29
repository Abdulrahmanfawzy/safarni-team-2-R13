export function BrandSkeleton() {
  return (
    <div className="flex min-h-[91px] animate-pulse flex-col items-center justify-center gap-2 rounded-md border border-slate-100 bg-white px-2 py-2">
      <div className="size-7 rounded bg-slate-200" />
      <div className="h-3 w-12 rounded bg-slate-200" />
      <div className="h-2.5 w-6 rounded bg-slate-100" />
    </div>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="animate-pulse rounded-md border border-slate-100 bg-white px-2.5 pb-2.5 pt-3">
      <div className="flex min-h-[52px] items-start justify-between gap-3">
        <div className="mt-2 h-4 w-2/5 rounded bg-slate-200" />
        <div className="h-[55px] w-1/2 rounded bg-slate-100" />
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="h-3 rounded bg-slate-100" />
        <div className="h-3 rounded bg-slate-100" />
        <div className="h-3 rounded bg-slate-100" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="h-[27px] rounded bg-slate-200" />
        <div className="h-[27px] rounded border border-slate-100 bg-slate-50" />
      </div>
    </div>
  );
}
