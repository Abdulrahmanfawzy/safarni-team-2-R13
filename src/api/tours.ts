import type {
  Tour,
  TourApiItem,
  ToursApiData,
} from "@/types/tour";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
}

export async function getTours(perPage = 10): Promise<ToursApiData> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("The API environment variable is not configured.");
  }

  const url = new URL(`${baseUrl.replace(/\/$/, "")}/tours`);

  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch tours: ${response.status}`);
  }

  const result: ApiResponse<ToursApiData> = await response.json();

  if (!result.success || !result.data) {
    throw new Error("Invalid tours API response.");
  }

  return result.data;
}

export function mapTourToUi(item: TourApiItem): Tour {
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
