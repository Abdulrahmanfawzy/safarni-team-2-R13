"use server";

import { isAxiosError } from "axios";
import { apiClient } from "@/lib/axios";
import type {
  BookingActionResult,
  BookingDetails,
  CreateBookingPayload,
  CreateBookingResponse,
} from "@/types/boarding.pass";

export async function createFlightBooking(
  payload: CreateBookingPayload,
): Promise<BookingActionResult> {
  try {
    const response = await apiClient.post<CreateBookingResponse>(
      "/bookings",
      payload,
    );

    const result = response.data;

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Unable to create the booking.",
      };
    }

    return {
      success: true,
      message: result.message || "Booking created successfully.",
      booking: result.data as BookingDetails,
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
