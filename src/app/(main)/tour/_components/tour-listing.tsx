"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import SearchBar from "@/components/shared/SearchBar";
import TourCard from "@/components/shared/TourCard";
import { TOURS } from "@/constants/tours";

export default function TourListing() {
  const router = useRouter();

  const [term, setTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["1", "2", "6", "10"]);

  const filteredTours = useMemo(() => {
    const query = term.trim().toLowerCase();

    if (!query) {
      return TOURS;
    }

    return TOURS.filter(
      (tour) =>
        tour.title.toLowerCase().includes(query) ||
        tour.location.toLowerCase().includes(query) ||
        tour.style.toLowerCase().includes(query),
    );
  }, [term]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>

        <SearchBar
          value={term}
          onChange={setTerm}
          placeholder="Search destinations or tours..."
        />
      </div>

      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              variant="listing"
              categoryLabel="Full Day Tours"
              isFavorite={favorites.includes(tour.id)}
              onToggleFavorite={toggleFavorite}
              onClick={(selectedTour) =>
                router.push(`/destination/${selectedTour.id}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-gray-100 text-sm text-gray-400">
          No tours match your search.
        </div>
      )}
    </section>
  );
}
