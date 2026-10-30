export interface GetRecommendProps {
  search: string | null;
  sections: "recommended" | null;
}

export interface RecommendationHotelsResponse {
  data: Hotel[];
}

export interface AvailableRoomsResponse {
  rooms: Room[];
  hotel: Hotel;
}
export interface RoomDetailsResponse {
  id: number;
  header: Header;
  about: About;
  gallery: Gallery;
  reviews: Reviews;
}

export interface Hotel {
  id: number;
  name: string;
  slug: string;
  city: string;
  address: string;
  stars_count: number;
  discount_rate: number;
  is_favorite: boolean;
  distance_km: null;
  cover_photo: string;
}

export interface Room {
  id: number;
  room_name: string;
  price_per_night: number;
  discount_rate: number;
  final_price: number;
  beds_count: number;
  bathrooms_count: number;
  max_guests: number;
  area_sqft: number;
  is_refundable: boolean;
  is_favorite: boolean;
  thumbnail_url: string;
}

export interface About {
  beds_count: number;
  baths_count: number;
  area_sqft: number;
  max_guests: number;
  is_refundable: boolean;
  description: string;
}

export interface Gallery {
  total_count: number;
  photos: string[];
}

export interface Header {
  name: string;
  hotel_name: string;
  address: string;
  rating: number;
  reviews_count: number;
  discount_badge: string;
  price_per_night: number;
  discount_percentage: number;
  final_price_per_night: number;
}

export interface Reviews {
  average_rating: number;
  total_count: number;
  items: ReviewItem[];
}

export interface ReviewItem {
  id: number;
  user_name: string;
  avatar: string;
  rating: number;
  comment: string;
  formatted_date: string;
}

export interface RoomAvailability {
  room_id: number;
  booked_ranges: BookedRange[];
  disabled_dates: string[];
}

export interface BookedRange {
  check_in: string;
  check_out: string;
}
