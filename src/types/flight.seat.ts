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

export interface BookingActionResult {
  success: boolean;
  message: string;
}
