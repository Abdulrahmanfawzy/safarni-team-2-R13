export interface CompareTourResponse {
  items: Item[];
  pagination: Pagination;
}

interface Item {
  id: number;
  image: null | string;
  title: string;
  time_range: string;
  price: number;
  price_label: string;
  schedule_line: string;
  description: string;
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export interface CompareCheckoutResponse {
  success: boolean;
  message: string;
  data?: CompareResponse;
}
export interface CompareToursError {
  message: string;
  success: boolean;
}

export interface SelectedTourResponse {
  items: SelectedItem[];
  max_items: number;
}
export interface CompareCheckoutResponse {
   
  payment_url?: string;
  booking_id?: string;
}
interface SelectedItem {
  id: number;
  title: string;
  price: number;
  price_label: string;
  price_unit: string;
  next_schedule_id: number;
  features: Feature[];
}

interface Feature {
  key: string;
  label: string;
  value: string;
}

export interface CompareResponse {
  booking_id: number;
  booking_code: string;
  status: string;
  tour: Tour;
  schedule: Schedule;
  pricing: Pricing;
  payment: Payment;
  expires_at: Date;
}

export interface Payment {
  id: number;
  gateway: string;
  provider: string;
  method: string;
  status: string;
  amount: number;
  currency: string;
  session_id: string;
  checkout_url: string;
  transaction_ref: string;
}

export interface Pricing {
  currency: string;
  lines: Line[];
  subtotal: number;
  discount: number;
  total: number;
  total_cents: number;
}

export interface Line {
  type: string;
  label: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Schedule {
  id: number;
  start_at: Date;
  end_at: Date;
}

export interface Tour {
  id: number;
  title: string;
}
