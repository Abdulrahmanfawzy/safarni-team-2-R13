import { apiClient } from "@/lib/axios";
import { SelectedTourResponse } from "@/types/compare.type";
import { ApiResponse } from "@/types/global.type";

export const selectedTours = async (
  tourIds: string[],
): Promise<ApiResponse<SelectedTourResponse>> => {
  try {
    const res = await apiClient.post(`/v1/compare/tours`, {
      tour_ids: tourIds,
    });

    if (!res.status) {
      return {
        message: res.data.message,
        success: false,
      };
    }

    return res.data;
  } catch (error) {
    console.error("selected Tours error", error);
    throw new Error("fetch failed");
  }
};

export const toursCheckout = async (
  tour_id: string,
  full_name: string,
  email: string,
): Promise<ApiResponse<SelectedTourResponse>> => {
  try {
    const res = await apiClient.post(
      `v1/tour-checkout/tours/${tour_id}/checkout`,
      {
        full_name,
        email,
      },
    );

    if (!res.status) {
      return {
        message: res.data.message,
        success: false,
      };
    }

    return res.data;
  } catch (error) {
    console.error("checkout Tours error", error);
    throw new Error("fetch failed");
  }
};
