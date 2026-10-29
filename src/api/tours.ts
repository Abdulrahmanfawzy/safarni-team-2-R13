import type { Tour } from "@/constants/tours";
import type {
  Tour as TourUi,
  TourApiItem,
  ToursApiData,
  TourPagination,
} from "@/types/tour";

export interface TourItem {
  id: number;
  title: string;
  slug: string;
  duration: number;
  duration_text: string;
  price: string;
  image: string | null;
  rating: number | null;
  reviews_count: number;
  adventure_style: string;
}

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  errors?: unknown[];
  data?: T | null;
  meta?: TourPagination;
}

async function apiFetch<T>(
  path: string,
  params: Record<string, string | number> = {},
): Promise<T> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("The API environment variable is not configured.");
  }

  const url = new URL(`${baseUrl.replace(/\/+$/, "")}${path}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed (${response.status})`);
  }

  const result = (await response.json()) as ApiResponse<T | TourApiItem[]>;

  if (result.success === false) {
    throw new Error(result.message || `Request to ${path} was unsuccessful.`);
  }

  if (result.data == null) {
    throw new Error(
      result.message || `Missing data in API response for ${path}.`,
    );
  }

  // Normalize Laravel's paginated response:
  // { data: TourApiItem[], meta: TourPagination }
  // into the existing UI contract:
  // { items: TourApiItem[], pagination: TourPagination }
  if (Array.isArray(result.data)) {
    if (!result.meta) {
      throw new Error(
        `Missing pagination metadata in API response for ${path}.`,
      );
    }

    return {
      items: result.data,
      pagination: {
        current_page: result.meta.current_page,
        last_page: result.meta.last_page,
        per_page: result.meta.per_page,
        total: result.meta.total,
      },
    } as T;
  }

  return result.data as T;
}

export function getTours(perPage = 10): Promise<ToursApiData> {
  return apiFetch<ToursApiData>("/tours", {
    per_page: perPage,
  });
}

export function searchTours(q: string, perPage = 10): Promise<ToursApiData> {
  return apiFetch<ToursApiData>("/tours/search", {
    q,
    per_page: perPage,
  });
}

// API item -> camelCase UI shape
export function mapTourToUi(item: TourApiItem): TourUi {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    duration: item.duration,
    durationText: item.duration_text,
    price: Number(item.price),
    image: item.image,
    rating: item.rating,
    reviewsCount: item.reviews_count,
    adventureStyle: item.adventure_style,
  };
}

// API item -> the shape TourCard expects
export function toTour(t: TourApiItem): Tour {
  return {
    id: String(t.id),
    title: t.title,
    image: t.image ?? "",
    rating: t.rating ?? 0,
    reviews: t.reviews_count,
    // Assumes duration is expressed in hours.
    days: t.duration >= 24 ? Math.round(t.duration / 24) : undefined,
    hours: t.duration < 24 ? t.duration : undefined,
    pickup: false,
    price: Number(t.price),
    location: "" as unknown as Tour["location"],
    style: t.adventure_style as Tour["style"],
    popularity: t.reviews_count,
  };
}
