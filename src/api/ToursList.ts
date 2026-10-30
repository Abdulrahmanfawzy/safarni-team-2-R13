import type {
  Tour,
  TourApiItem,
  TourPagination,
  TourDetails,
  TourDetailsApiItem,
} from "@/types/tour";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://safarni-round-13.huma-volve.com/api";

interface ToursResponse {
  data: TourApiItem[];
  meta: TourPagination;
}

interface TourDetailsResponse {
  success: boolean;
  message: string;
  errors: unknown[];
  data: TourDetailsApiItem;
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

export async function getTourById(id: string): Promise<TourDetails | null> {
  const res = await fetch(`${BASE_URL}/tours/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load tour ${id} (${res.status})`);
  }

  const json: TourDetailsResponse = await res.json();
  if (!json.success || !json.data) return null;

  const t = json.data;
  const gallery = (t.images ?? []).map((img) => img.url).filter(Boolean);

  return {
    ...mapTourToUi(t),
    location: t.location
      ? [t.location.city, t.location.country].filter(Boolean).join(", ")
      : "",
    bestTimeToVisit: t.best_time_to_visit,
    schedules: t.schedules ?? [],
    topActivities: t.top_activities ?? [],
    galleryCount: t.gallery_count ?? gallery.length,
    gallery: gallery.length > 0 ? gallery : t.image ? [t.image] : [],
    reviews: t.reviews ?? [],
  };
}