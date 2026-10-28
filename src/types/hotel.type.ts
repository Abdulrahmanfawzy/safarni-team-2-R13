export interface RecommendationHotelsResponse {
  data: Hotel[];
}

export interface AvailableRoomsResponse {
  rooms: Room[];
  hotel: Hotel;
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

export interface GetRecommendProps {
  search: string | null;
  sections: "recommended" | null;
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
