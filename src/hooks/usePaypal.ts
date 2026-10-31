// src/hooks/usePaypal.ts
import { useMutation } from "@tanstack/react-query";
import {
  createPaypalOrder,
  capturePaypalOrder,
} from "@/actions/TourBooking.action";

export const useCreatePaypalOrder = () =>
  useMutation({
    mutationKey: ["paypal", "order"],
    mutationFn: (bookingId: number | string) => createPaypalOrder(bookingId),
  });

export const useCapturePaypalOrder = () =>
  useMutation({
    mutationKey: ["paypal", "capture"],
    mutationFn: (payload: Parameters<typeof capturePaypalOrder>[0]) =>
      capturePaypalOrder(payload),
  });