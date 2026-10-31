"use server";
import { PaypalOrder } from "@/types/booking.type";
import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/global.type";
import { TourBooking } from "@/types/booking.type";

export const createTourBooking = async ({
  tour_id,
  schedule_id,
  adults,
  children = 0,
  infants = 0,
}: {
  tour_id: string | number;
  schedule_id: number;
  adults: number;
  children?: number;
  infants?: number;
}): Promise<ApiResponse<TourBooking>> => {
  try {
    const res = await apiClient.post(`/tours/${tour_id}/bookings`, {
      schedule_id,
      adults,
      children,
      infants,
    });
    return res.data;
  } catch (error) {
    console.error("create booking error", error);
    throw new Error("booking failed");
  }
};
export const createPaypalOrder = async (
  bookingId: number | string,
): Promise<ApiResponse<PaypalOrder>> => {
  try {
    const res = await apiClient.post(`/bookings/${bookingId}/paypal/order`, {
      // add return_url / cancel_url here if the backend requires them
    });
    return res.data;
  } catch (error) {
    console.error("create paypal order error", error);
    throw new Error("paypal order failed");
  }
};

export const capturePaypalOrder = async ({
  bookingId,
  paypalOrderId,
}: {
  bookingId: number | string;
  paypalOrderId: string;
}): Promise<ApiResponse<unknown>> => {
  try {
    const res = await apiClient.post(`/bookings/${bookingId}/paypal/capture`, {
      paypal_order_id: paypalOrderId,
    });
    return res.data;
  } catch (error) {
    console.error("capture paypal order error", error);
    throw new Error("capture failed");
  }
};