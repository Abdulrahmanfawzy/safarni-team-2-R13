import { Suspense } from "react";
import Link from "next/link";
import { BackButton } from "@/components/shared/BackButton";
import TourCard from "@/components/shared/TourCard";
import SearchFilterPanel from "@/components/search/SearchFilterPanel";
import { searchTours, toTour, type TourItem } from "@/api/tours";
import { PRICE_MAX, PRICE_MIN } from "@/constants/tours";
import type { AdventureStyle, SortKey } from "@/constants/tours";
import { filterTours } from "@/lib/filter-tours";
import type { TourFilters } from "@/lib/filter-tours";

export const metadata = { title: "Search | Safarni" };

type SearchParams = {
  q?: string;
  filters?: string;
  sort?: string;
  min?: string;
  max?: string;
  styles?: string;
  locations?: string;
  ratings?: string;
};

const list = (v?: string) => (v ? v.split(",").filter(Boolean) : []);

function parseFilters(sp: SearchParams): TourFilters {
  return {
    q: "", 
    sort: (sp.sort as SortKey | undefined) ?? "",
    min: Number(sp.min ?? PRICE_MIN),
    max: Number(sp.max ?? PRICE_MAX),
    styles: list(sp.styles) as AdventureStyle[],
    locations: list(sp.locations),
    ratings: list(sp.ratings).map(Number),
  };
}

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      ))}
    </div>
  );
}

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const query = (sp.q ?? "").trim();

  if (!query) {
    return (
      <p className="py-20 text-center text-sm text-gray-400">
        Type a destination to search tours.
      </p>
    );
  }

  let items: TourItem[] = [];

  try {
    const data = await searchTours(query);
    items = data.items;
  } catch {
    return (
      <p className="py-20 text-center text-sm text-red-500">
        Something went wrong. Please try again.
      </p>
    );
  }

  const tours = filterTours(items.map(toTour), parseFilters(sp));

  return (
    <>
      <h1 className="text-sm font-semibold text-gray-900">
        {query}{" "}
        <span className="text-[10px] font-normal text-gray-400">
          {tours.length} Result
        </span>
      </h1>

      {tours.length === 0 ? (
        <p className="py-20 text-center text-sm text-gray-400">
          No tours match your search.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tours.map((t) => (
            <Link key={t.id} href={`/destination/${t.id}`}>
              <TourCard tour={t} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
export const instant =false;
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { filters } = await searchParams;

  if (filters === "open") {
    return (
      <main className="mx-auto w-full max-w-360 flex-1 px-4 pb-16 md:px-25">
        <Suspense fallback={null}>
          <SearchFilterPanel />
        </Suspense>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-360 flex-1 px-4 pb-16 md:px-25">
      <section className="space-y-5">
        <BackButton path="/" />

        <Suspense fallback={<ResultsSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}