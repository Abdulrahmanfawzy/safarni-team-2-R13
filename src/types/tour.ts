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

export interface TourLocation {
  city: string;
  country: string;
}

export interface TourSchedule {
  id: number;
  date: string;
  end_date: string;
  available_slots: number;
  capacity: number;
}

export interface TourActivity {
  id: number;
  title: string;
  image: string | null;
}

export interface TourImage {
  id: number;
  url: string;
}

export interface TourReview {
  id: number;
  author: string;
  avatar: string | null;
  rating: number;
  comment: string;
  created_at: string;
}

export interface TourDetailsApiItem extends TourApiItem {
  location: TourLocation | null;
  best_time_to_visit: string | null;
  schedules: TourSchedule[];
  top_activities: TourActivity[];
  gallery_count: number;
  images: TourImage[];
  reviews: TourReview[];
}

export interface TourDetails extends Tour {
  location: string;
  bestTimeToVisit: string | null;
  schedules: TourSchedule[];
  topActivities: TourActivity[];
  galleryCount: number;
  gallery: string[];
  reviews: TourReview[];
}