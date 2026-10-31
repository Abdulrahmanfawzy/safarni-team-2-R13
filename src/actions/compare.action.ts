"use server";

import { apiClient } from "@/lib/axios";
import { SelectedTourResponse, CompareResponse } from "@/types/compare.type";
import { ApiResponse } from "@/types/global.type";

export const selectedTours = async (
  tourIds: string[],
): Promise<ApiResponse<SelectedTourResponse>> => {
  try {
    const res = await apiClient.post(`/v1/compare/tours`, {
      tour_ids: tourIds,
    });

    if (!res.status) {
      return { message: res.data.message, success: false };
    }

    return res.data;
  } catch (error) {
    console.error("selected Tours error", error);
    throw new Error("fetch failed");
  }
};

const REDIRECT_URLS = {
  success: "https://safarni-team-2-r13.vercel.app/payment-success",
  failed: "https://safarni-team-2-r13.vercel.app/payment-failed",
};

export const CompareToursCheckout = async ({
  tour_id,
  full_name,
  email,
  team,
}: {
  tour_id: string;
  full_name: string;
  email: string;
  team: 1 | 2;
}): Promise<ApiResponse<CompareResponse>> => {
  try {
    const res = await apiClient.post(
      `v1/tour-checkout/tours/${tour_id}/checkout`,
      {
        full_name,
        email,
        payment_method: "visa",
        team,
        success_url: REDIRECT_URLS.success,
        failed_url: REDIRECT_URLS.failed,
      },
      {
        headers: {
          "Idempotency-Key": `Idempotency-Key-${tour_id}-${Date.now()}`,
        },
      },
    );

    if (!res.status) {
      return { message: res.data.message, success: false };
    }

    return res.data;
  } catch (error) {
    console.error("checkout Tours error", error);
    throw new Error("fetch failed");
  }
};