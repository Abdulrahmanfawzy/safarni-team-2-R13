"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import SearchInput from "@/components/shared/SearchInput";
import TourCard from "@/components/shared/TourCard";
import type { Tour } from "@/types/tour";

interface TourListingClientProps {
  tours: Tour[];
}

export default function TourListingClient({ tours }: TourListingClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredTours = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return tours;
    }

    return tours.filter((tour) => tour.title.toLowerCase().includes(query));
  }, [tours, searchQuery]);

  function toggleFavorite(tourId: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(tourId)
        ? currentFavorites.filter((id) => id !== tourId)
        : [...currentFavorites, tourId],
    );
  }

  function handleTourClick(tour: Tour) {
    router.push(`/destination/${encodeURIComponent(tour.slug)}`);
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2"
      >
        <ChevronLeft size={20} aria-hidden="true" />
        Back
      </button>

      <h1 className="mb-4 text-2xl font-semibold">Explore Tours</h1>

      <div className="mb-6">
        <SearchInput placeholder="Search tours..." onChange={setSearchQuery} />
      </div>

      {filteredTours.length === 0 ? (
        <p role="status">No tours found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={{
                id: String(tour.id),
                title: tour.title,
                image: tour.image ?? "",
                location: "",
                style: tour.adventureStyle as never,
                rating: tour.rating ?? 0,
                reviews: tour.reviewsCount,
                durationText: tour.durationText,
                price: tour.price,
                pickup: false,
                popularity: tour.reviewsCount,
                slug: tour.slug,
              }}
              isFavorite={favorites.includes(tour.id)}
              onToggleFavorite={() => toggleFavorite(tour.id)}
              onClick={() => handleTourClick(tour)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
