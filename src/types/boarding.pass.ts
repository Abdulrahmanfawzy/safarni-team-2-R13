export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
}

export type CabinClass =
  | "economy"
  | "first_class"
  | "business"
  | "premium_economy";

export type SeatStatus = "available" | "unavailable";

export interface FlightSeat {
  id: number;
  seat_number: string;
  cabin_class: CabinClass;
  price: string;
  status: SeatStatus;
}

export type PassengerGender = "male" | "female";

export interface BookingPassenger {
  full_name: string;
  age: number;
  gender: PassengerGender;
  passport_number: string;
  seat_id: number;
}

export interface CreateBookingPayload {
  flight_id: number;
  passengers: BookingPassenger[];
}

export interface BookingFlightPassenger {
  passenger_id: number;
  full_name: string;
  age: number;
  gender: PassengerGender;
  avatar_url: string | null;
  seat: string;
  ticket_price: string;
}

export interface BookingFlight {
  flight_number: string;
  airline: {
    name: string;
    logo_url: string | null;
  };
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  origin: {
    airport_code: string;
    airport_name: string;
  };
  destination: {
    airport_code: string;
    airport_name: string;
  };
  terminal: string | null;
  gate: string | null;
}

export interface BookingDetails {
  id: number;
  booking_code: string;
  status: string;
  service_type: string;
  service_item_id: number;
  start_at: string;
  end_at: string;
  passengers_count: number;
  total_price: string;
  flight: BookingFlight;
  user: {
    id: number;
    name: string;
    avatar_url: string | null;
  };
  passengers: BookingFlightPassenger[];
}

export interface CreateBookingResponse extends ApiResponse<BookingDetails> {}

export interface BookingActionResult {
  success: boolean;
  message: string;
  booking?: BookingDetails;
}
