"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TOURS } from "@/constants/tours";
import { POPULAR_PLACES } from "@/constants/places";
import { countActiveFilters, filterTours } from "@/lib/filter-tours";
import { searchPlaces } from "@/lib/search-places";
import { useTourFilters } from "@/hooks/use-tour-filters";
import SearchBar from "@/components/shared/search-bar";
import FilterPanel from "@/components/shared/filter-panel";
import TourCard from "@/components/shared/tour-card";
import PlaceList from "@/components/search/place-list";
import { BackButton } from "@/components/shared/BackButton";

export default function SearchView() {
  const router = useRouter();
  const params = useSearchParams();
  const { filters, setFilters } = useTourFilters();

  const [draft, setDraft] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(
    params.get("filters") === "open",
  );

  const [favorites, setFavorites] = useState<string[]>([]);

  const typed = draft.trim();
  const activeCount = countActiveFilters(filters);
  const showResults = Boolean(filters.q) || activeCount > 0;

  const results = useMemo(() => filterTours(TOURS, filters), [filters]);
  const suggestions = useMemo(() => searchPlaces(draft), [draft]);

  const commit = (query: string) => {
    const value = query.trim();
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const toggleFavorite = (id: string) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );

  return (
    <>
      {showResults ? (
        /* ---------- results ---------- */
        <section className="space-y-5">
          <BackButton onClick={() => router.push("/search")} />

          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold text-gray-900">
              {filters.q || "All tours"}{" "}
              <span className="text-[10px] font-normal text-gray-400">
                {results.length} Result
              </span>
            </h1>

            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-label="Open filters"
              className="relative rounded-xl border border-gray-200 bg-white p-2.5 hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              {activeCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-app-primary text-[10px] text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {results.length === 0 ? (
            <p className="py-20 text-center text-sm text-gray-400">
              No tours match your search.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {results.map((t) => (
                <TourCard
                  key={t.id}
                  tour={t}
                  isFavorite={favorites.includes(t.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={(tour) => router.push(`/destination/${tour.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        /* ---------- search input + popular / suggestions ---------- */
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BackButton onClick={() => router.push("/")} />
            <SearchBar
              value={draft}
              onChange={setDraft}
              onSubmit={commit}
              autoFocus
            />
          </div>

          {typed === "" ? (
            <PlaceList
              places={POPULAR_PLACES}
              variant="popular"
              onSelect={(p) => commit(p.name)}
            />
          ) : suggestions.length > 0 ? (
            <PlaceList
              places={suggestions}
              variant="suggestion"
              onSelect={(p) => commit(p.name)}
            />
          ) : (
            // nothing matched: let the user search the raw text
            <PlaceList
              places={[
                { id: "typed", name: typed, label: `Search for "${typed}"` },
              ]}
              variant="suggestion"
              onSelect={(p) => commit(p.name)}
            />
          )}
        </section>
      )}

      {filtersOpen && (
        <FilterPanel
          initial={filters}
          onApply={(f) => setFilters(f)}
          onClose={() => setFiltersOpen(false)}
        />
      )}
    </>
  );
}
