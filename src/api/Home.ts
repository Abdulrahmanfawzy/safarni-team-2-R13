import { cacheLife } from "next/cache";

const API = "https://safarni-round-13.huma-volve.com/api";

export interface HomeCategory {
  id: number;
  name: string;
  slug: string;
  icon_url: string | null;
}

export interface HomeRecommendation {
  id: number;
  name: string;
  country: string;
  tagline: string | null;
  rating: number | null;
  reviews_count: number;
  cover_photo: string | null;
}

export interface HomeTour {
  id: number;
  title: string;
  full_title: string;
  slug: string;
  tour_type: string;
  duration_hours: number;
  price: number;
  price_formatted: string;
  rating: number | null;
  reviews_count: number;
  cover_photo: string | null;
  is_favorite: boolean;
}

export interface HomeData {
  categories: HomeCategory[];
  recommendations: HomeRecommendation[];
  available_tours: HomeTour[];
}

 
export async function getHome(): Promise<HomeData> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API}/home`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Home request failed: ${res.status}`);

  const json = await res.json();
  return json.data as HomeData;
}