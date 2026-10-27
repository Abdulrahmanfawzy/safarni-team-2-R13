import type {
  FlightApiItem,
  FlightApiResponse,
  FlightResult,
  FlightSearchParams,
  FlightSearchResults,
} from "@/types/flight.details";

function mapFlight(flight: FlightApiItem): FlightResult {
  return {
    id: String(flight.id),
    departureDate: flight.departure_at,
    departureTime: flight.departure_time,
    arrivalTime: flight.arrival_time,
    duration: flight.duration,
    departureAirport: flight.origin.iata_code,
    arrivalAirport: flight.destination.iata_code,
    layover: flight.stops_label,
    airline: flight.airline.name,
    price: flight.min_price,
  };
}

export async function getFlights(
  search: FlightSearchParams,
): Promise<FlightSearchResults> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("The API environment variable is not configured.");
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/flights`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(search),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to retrieve flights (${response.status}).`);
  }

  const result = (await response.json()) as FlightApiResponse;

  if (!result.success) {
    throw new Error(result.message || "The flight request was unsuccessful.");
  }

  if (
    !result.data ||
    !Array.isArray(result.data.outbound_flights) ||
    !Array.isArray(result.data.return_flights)
  ) {
    throw new Error("The flight API returned an unexpected response.");
  }

  return {
    type: result.data.type,
    outboundFlights: result.data.outbound_flights.map(mapFlight),
    returnFlights: result.data.return_flights.map(mapFlight),
  };
}
