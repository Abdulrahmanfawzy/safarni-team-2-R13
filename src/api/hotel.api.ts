import { ApiResponse } from "@/types/global.type";
import {
  AvailableRoomsResponse,
  GetRecommendProps,
  RecommendationHotelsResponse,
} from "@/types/hotel.type";

export async function getRecommendationHotels({
  search,
  sections,
}: GetRecommendProps): Promise<ApiResponse<RecommendationHotelsResponse>> {
  try {
    const param = search
      ? `?search=${search}`
      : sections && `?secion=${sections}`;

    const response = await fetch(`${process.env.API}/hotels${param}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${data.message}`);
    }

    console.log("data from server", data);

    return data;
  } catch (error) {
    console.error("get Recommendation Hotels :", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getAvailableRooms(
  hotel_id: string,
): Promise<ApiResponse<AvailableRoomsResponse>> {
  try {
    const response = await fetch(`${process.env.API}/hotels/${hotel_id}/rooms`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels Rooms: ${data.message}`);
    }

    return data;
  } catch (error) {
    console.error("hotels Rooms:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
