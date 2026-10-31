import { Plane } from "lucide-react";
import type { ProfileBooking } from "@/types/profile.type";
import ProfileBookingDetails from "./ProfileBookingDetails";

export default function ProfileFlights({ booking }: { booking: ProfileBooking }) {
  return (
    <ProfileBookingDetails booking={booking} category="Flight" icon={Plane} />
  );
}
