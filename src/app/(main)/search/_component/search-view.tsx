"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TOURS } from "@/constants/tours";
import { POPULAR_PLACES } from "@/constants/places";
import { countActiveFilters, filterTours } from "@/lib/filter-tours";
import { searchPlaces } from "@/lib/search-places";
import { useTourFilters } from "@/hooks/use-tour-filters";
import { useSearchParam, useSearchTerm } from "@/hooks/use-search-term";
// import SearchBar from "@/components/shared/SearchBar";
import FilterPanel from "@/components/shared/FilterPanel";
import TourCard from "@/components/shared/TourCard";
import PlaceList from "@/components/search/place-list";
import { BackButton } from "@/components/shared/BackButton";

export default function SearchView() {
  const router = useRouter();
  const params = useSearchParams();
  const { filters, setFilters } = useTourFilters();
  const [term, setTerm] = useSearchParam("term");

  const [favorites, setFavorites] = useState<string[]>([]);
  // popup is controlled by the URL (?filters=open)
  const filtersOpen = params.get("filters") === "open";
  const typed = term.trim();
  const activeCount = countActiveFilters(filters);
  const showResults = Boolean(filters.q) || activeCount > 0;

  const results = useMemo(() => filterTours(TOURS, filters), [filters]);
  const suggestions = useMemo(() => searchPlaces(term), [term]);

  const commit = (query: string) => {
    const value = query.trim();
    // navigating to a fresh URL drops ?term automatically
    if (value) router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const closeFilters = () => {
    const sp = new URLSearchParams(params.toString());
    sp.delete("filters");
    const qs = sp.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  };

  const toggleFavorite = (id: string) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id],
    );

  return (
    <main className="mx-auto w-ful max-w-360 flex-1 px-4 pb-16 md:px-25">
      {showResults ? (
        <section className="space-y-5">
          <BackButton onClick={() => router.push("/search")} />

          <h1 className="text-sm font-semibold text-gray-900">
            {filters.q || "All tours"}{" "}
            <span className="text-[10px] font-normal text-gray-400">
              {results.length} Result
            </span>
          </h1>

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
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BackButton />
            {/* <SearchBar
              value={term}
              onChange={setTerm}
              onSubmit={commit}
              autoFocus
            /> */}
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
          onClose={closeFilters}
        />
      )}
    </main>
  );
}
