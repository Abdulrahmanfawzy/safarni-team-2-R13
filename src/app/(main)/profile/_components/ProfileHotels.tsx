import { Building2 } from "lucide-react";
import type { ProfileBooking } from "@/types/profile.type";
import ProfileBookingDetails from "./ProfileBookingDetails";

export default function ProfileHotels({ booking }: { booking: ProfileBooking }) {
  return (
    <ProfileBookingDetails booking={booking} category="Hotel" icon={Building2} />
  );
}
