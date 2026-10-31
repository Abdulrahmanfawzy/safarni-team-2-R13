export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  role: string;
  status: string;
  is_verified: boolean;
  created_at: Date;
}

export interface ProfileBooking {
  id: number;
  booking_code: string;
  user_id: number;
  coupon_id: null;
  service_type: string;
  service_item_id: number;
  room_id: null;
  start_at: string;
  end_at: string;
  status: string;
  total_amount: string;
  notes: string;
  created_at: string;
  updated_at: string;
  hold_expires_at: null;
  payment_expires_at: null;
  request_key: null;
  request_fingerprint: null;
  currency: string;
  adults: number;
  children: number;
  infants: number;
  reserved_until: null;
  billing_basis: null;
  nights: null;
  price_per_night: null;
}

export interface UserBooking {
  id: number;
  booking_code: string;
  title: string;
  status: string;
  price: string | number;
  date: string;
}
