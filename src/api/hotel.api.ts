import { getAccessToken } from "@/lib/getAccessToken";
import { ApiResponse } from "@/types/global.type";
import {
  AvailableRoomsResponse,
  GetRecommendProps,
  RecommendationHotelsResponse,
  RoomDetailsResponse,
} from "@/types/hotel.type";
import { cache } from "react";

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
      const errors = data.errors
        ? Object.values(data.errors).flat().join("\n")
        : null;
      throw new Error(`Failed to fetch hotels: ${errors || data.message}`);
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
    const response = await fetch(
      `${process.env.API}/hotels/${hotel_id}/rooms`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const errors = data.errors
        ? Object.values(data.errors).flat().join("\n")
        : null;
      throw new Error(
        `Failed to fetch hotels Rooms: ${errors || data.message}`,
      );
    }

    return data;
  } catch (error) {
    console.error("hotels Rooms:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const getRoomDetails = cache(
  async (room_id: string): Promise<ApiResponse<RoomDetailsResponse>> => {
    const token = await getAccessToken();
    try {
      const response = await fetch(
        `${process.env.API}/hotels/rooms/${room_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join("\n")
          : null;
        throw new Error(
          `Failed to fetch Rooms Details: ${errors || data.message}`,
        );
      }

      return data;
    } catch (error) {
      console.error("hotels Rooms:", error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },
);
