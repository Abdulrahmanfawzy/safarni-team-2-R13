import { getRoomAvailability } from "@/api/hotel.api";
import BookingRoomForm from "@/components/forms/BookingRoomForm";

export default async function page({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { room_id } = await params;

  const data = await getRoomAvailability(room_id);
  console.log("getRoomAvailability booked_ranges:", data.data?.booked_ranges);
  const checkIn = data.data?.booked_ranges.map((item) => item.check_in);
  const checkOut = data.data?.booked_ranges.map((item) => item.check_out);
  return <BookingRoomForm checkIn={checkIn!} checkOut={checkOut!} />;
}
