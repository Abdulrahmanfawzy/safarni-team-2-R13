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
      console.log("booking:", JSON.stringify(booking, null, 2));

      const bookingId = booking?.data?.booking_id;
      if (!bookingId) throw new Error("Booking id not found");

      const checkout = await checkoutBookingRoom(String(bookingId));
      console.log("checkout:", checkout);

      return { booking, checkout };
    },
  });
}
