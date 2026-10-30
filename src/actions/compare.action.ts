"use server";
import { apiClient } from "@/lib/axios";
import { CompareResponse, SelectedTourResponse } from "@/types/compare.type";
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

export const CompareToursCheckout = async ({
  tour_id,
  full_name,
  email,
}: {
  tour_id: string;
  full_name: string;
  email: string;
}): Promise<ApiResponse<CompareResponse>> => {
  try {
    const res = await apiClient.post(
      `v1/tour-checkout/tours/${tour_id}/checkout`,
      {
        full_name,
        email,
        payment_method: "visa",
      },
      {
        headers: {
          "Idempotency-Key": `Idempotency-Key-${tour_id}`,
        },
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
