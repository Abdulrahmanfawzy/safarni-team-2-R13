import type {
  Tour,
  TourApiItem,
  TourPagination,
} from "@/types/tour";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://safarni-round-13.huma-volve.com/api";

interface ToursResponse {
  data: TourApiItem[];
  meta: TourPagination;
}

export interface ToursPayload {
  items: TourApiItem[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export async function getTours(perPage = 10, page = 1): Promise<ToursPayload> {
  const res = await fetch(
    `${BASE_URL}/tours?per_page=${perPage}&page=${page}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to load tours (${res.status})`);
  }

  const json: ToursResponse = await res.json();

  return {
    items: json.data,
    meta: {
      currentPage: json.meta.current_page,
      lastPage: json.meta.last_page,
      perPage: json.meta.per_page,
      total: json.meta.total,
    },
  };
}

export function mapTourToUi(t: TourApiItem): Tour {
  return {
    id: t.id,
    title: t.title,
    slug: t.slug,
    duration: t.duration,
    durationText: t.duration_text,
    price: Number(t.price),
    image: t.image,
    rating: t.rating,
    reviewsCount: t.reviews_count,
    adventureStyle: t.adventure_style,
  };
}