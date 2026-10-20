import { PRICE_MAX, PRICE_MIN } from "@/constants/tours";
import type { AdventureStyle, SortKey, Tour } from "@/constants/tours";

export interface TourFilters {
  q: string;
  sort: SortKey | "";
  min: number;
  max: number;
  styles: AdventureStyle[];
  locations: string[];
  ratings: number[];
}

export const DEFAULT_FILTERS: TourFilters = {
  q: "",
  sort: "",
  min: PRICE_MIN,
  max: PRICE_MAX,
  styles: [],
  locations: [],
  ratings: [],
};

export function filterTours(tours: Tour[], f: TourFilters): Tour[] {
  const q = f.q.trim().toLowerCase();

  const result = tours.filter((t) => {
    if (q && !`${t.title} ${t.location}`.toLowerCase().includes(q)) return false;
    if (t.price < f.min || t.price > f.max) return false;
    if (f.styles.length && !f.styles.includes(t.style)) return false;
    if (
      f.locations.length &&
      !f.locations.some((l) => l.toLowerCase() === t.location.toLowerCase())
    )
      return false;
    if (f.ratings.length && !f.ratings.includes(Math.floor(t.rating))) return false;
    return true;
  });

  const saving = (t: Tour) => (t.oldPrice ?? t.price) - t.price;

  switch (f.sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "deals":
      return result.sort((a, b) => saving(b) - saving(a));
    case "reviews":
      return result.sort((a, b) => b.reviews - a.reviews);
    case "popular":
      return result.sort((a, b) => b.popularity - a.popularity);
    default:
      return result;
  }
}

export function countActiveFilters(f: TourFilters): number {
  return (
    (f.sort ? 1 : 0) +
    (f.min !== PRICE_MIN || f.max !== PRICE_MAX ? 1 : 0) +
    (f.styles.length ? 1 : 0) +
    (f.locations.length ? 1 : 0) +
    (f.ratings.length ? 1 : 0)
  );
}