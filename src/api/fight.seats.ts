import { apiClient } from "@/lib/axios";
import type { ApiResponse, FlightSeat } from "@/types/flight.seat";

export async function fetchFlightSeats(
  flightId: number,
): Promise<FlightSeat[]> {
  const response = await apiClient.get<ApiResponse<FlightSeat[]>>(
    `/flights/${flightId}/seats`,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Unable to load flight seats.");
  }

  return response.data.data;
}
