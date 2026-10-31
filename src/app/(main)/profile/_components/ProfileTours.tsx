import { MapPin } from "lucide-react";
import type { ProfileBooking } from "@/types/profile.type";
import ProfileBookingDetails from "./ProfileBookingDetails";

export default function ProfileTours({ booking }: { booking: ProfileBooking }) {
  return (
    <ProfileBookingDetails booking={booking} category="Tour" icon={MapPin} />
  );
}
