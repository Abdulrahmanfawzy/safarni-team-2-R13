"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SearchInput from "@/components/shared/SearchInput";
import TourCard from "@/components/shared/TourCard";
import type { Tour } from "@/types/tour";

const TOURS_PATH = "/tour";

interface TourListingClientProps {
  tours: Tour[];
  currentPage: number;
  lastPage: number;
}

export default function TourListingClient({
  tours,
  currentPage,
  lastPage,
}: TourListingClientProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredTours = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return tours;
    return tours.filter((tour) => tour.title.toLowerCase().includes(query));
  }, [tours, searchQuery]);

  function toggleFavorite(tourId: number) {
    setFavorites((current) =>
      current.includes(tourId)
        ? current.filter((id) => id !== tourId)
        : [...current, tourId],
    );
  }

  function handleTourClick(tour: Tour) {
    router.push(`${TOURS_PATH}/${tour.id}`);
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

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

      {lastPage > 1 && (
        <nav
          aria-label="Tours pagination"
          className="mt-8 flex items-center justify-center gap-4"
        >
          {hasPrev ? (
            <Link
              href={`${TOURS_PATH}?page=${currentPage - 1}`}
              className="inline-flex items-center gap-1 rounded-lg border px-4 py-2"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-lg border px-4 py-2 opacity-40">
              <ChevronLeft size={18} aria-hidden="true" />
              Previous
            </span>
          )}

          <span className="text-sm">
            Page {currentPage} of {lastPage}
          </span>

          {hasNext ? (
            <Link
              href={`${TOURS_PATH}?page=${currentPage + 1}`}
              className="inline-flex items-center gap-1 rounded-lg border px-4 py-2"
            >
              Next
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-lg border px-4 py-2 opacity-40">
              Next
              <ChevronRight size={18} aria-hidden="true" />
            </span>
          )}
        </nav>
      )}
    </main>
  );
}