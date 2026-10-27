"use server";

import { isAxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import type {
  ApiResponse,
  BookingActionResult,
  CreateBookingPayload,
} from "@/types/flight.seat";

export async function createFlightBooking(
  payload: CreateBookingPayload,
): Promise<BookingActionResult> {
  try {
    const response = await apiClient.post<ApiResponse<unknown>>(
      "/bookings",
      payload,
    );

    if (!response.data.success) {
      return {
        success: false,
        message: response.data.message || "Unable to create the booking.",
      };
    }

    return {
      success: true,
      message: response.data.message || "Booking created successfully.",
    };
  } catch (error: unknown) {
    if (isAxiosError<{ message?: string }>(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "The booking request failed.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred while creating the booking.",
    };
  }
}
