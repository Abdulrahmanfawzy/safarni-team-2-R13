export interface TourApiItem {
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

export interface TourPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ToursApiData {
  items: TourApiItem[];
  pagination: TourPagination;
}

export interface Tour {
  id: number;
  title: string;
  slug: string;
  duration: number;
  durationText: string;
  price: number;
  image: string | null;
  rating: number | null;
  reviewsCount: number;
  adventureStyle: string;
}
