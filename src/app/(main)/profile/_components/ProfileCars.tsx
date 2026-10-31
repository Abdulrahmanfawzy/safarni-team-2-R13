import { Car } from "lucide-react";
import type { ProfileBooking } from "@/types/profile.type";
import ProfileBookingDetails from "./ProfileBookingDetails";

export default function ProfileCars({ booking }: { booking: ProfileBooking }) {
  return (
    <ProfileBookingDetails booking={booking} category="Car" icon={Car} />
  );
}
