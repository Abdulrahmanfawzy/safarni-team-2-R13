import {
  bookingRoom,
  BookingRoomRequest,
  checkoutBookingRoom,
} from "@/actions/hotel.action";
import { useMutation } from "@tanstack/react-query";

export default function useBookingRoom() {
  return useMutation({
    mutationKey: ["book-room"],
    mutationFn: async (payload: BookingRoomRequest) => {
      const booking = await bookingRoom(payload);

      const bookingId = booking?.data?.booking_id;
      if (!bookingId) throw new Error("Booking id not found");

      const checkout = await checkoutBookingRoom(String(bookingId));

      return { booking, checkout };
    },
  });
}
