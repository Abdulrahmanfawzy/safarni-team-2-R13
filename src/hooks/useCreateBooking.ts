// src/hooks/useCreateBooking.ts
import { useMutation } from "@tanstack/react-query";
import { createTourBooking } from "@/actions/TourBooking.action";

const useCreateBooking = () =>
  useMutation({
    mutationKey: ["booking", "create"],
    mutationFn: (payload: Parameters<typeof createTourBooking>[0]) =>
      createTourBooking(payload),
  });

export default useCreateBooking;