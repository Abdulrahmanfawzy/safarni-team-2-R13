export interface TourBooking {
  id: number;
  booking_code: string;
  status: string;
  total_amount: string;
  currency: string;
  start_at: string;
  end_at: string;
  payment_expires_at: string;
  tour: { id: number; title: string };
  schedule: { id: number; start_at: string; end_at: string };
  participants: { adults?: number; children?: number; infants?: number };
  price_breakdown: Record<string, string>;
}
export interface PaypalOrder {
  booking_id: number;
  booking_code: string;
  payment_id: number;
  paypal_order_id: string;
  paypal_status: string;
  approval_url: string;
  amount: string;
  currency: string;
  payment_expires_at: string;
}
export interface CompareCheckoutResponse {
  payment_url?: string;
  checkout_url?: string;
}