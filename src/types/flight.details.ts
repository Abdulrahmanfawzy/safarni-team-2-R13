export interface FlightSearchParams {
  type: "round_trip" | "one_way" | "multi_city";
  location: string;
  dest: string;
  departure: string;
  return?: string;
  passenger: number;
}

export interface FlightApiItem {
  id: number;
  flight_number: string;
  departure_at: string;
  departure_time: string;
  arrival_at: string;
  arrival_time: string;
  duration: string;
  origin: {
    airport: string;
    iata_code: string;
    city: string;
  };
  destination: {
    airport: string;
    iata_code: string;
    city: string;
  };
  stops_count: number;
  stops_label: string;
  airline: {
    name: string;
    logo_url: string;
  };
  min_price: string;
}

export interface FlightApiData {
  type: string;
  outbound_flights: FlightApiItem[];
  return_flights: FlightApiItem[];
}

export interface FlightApiResponse {
  success: boolean;
  message: string;
  errors: unknown[];
  data: FlightApiData;
}

export interface FlightResult {
  id: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
  layover: string;
  airline: string;
  price: string;
}

export interface FlightSearchResults {
  type: string;
  outboundFlights: FlightResult[];
  returnFlights: FlightResult[];
}
