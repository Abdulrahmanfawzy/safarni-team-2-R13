import Link from "next/link";
import { Plane, Car, MapPin, Building2, Package } from "lucide-react";
import { getProfileBookingsApi } from "@/api/profile.api";
import ProfileFlights from "../_components/ProfileFlights";
import ProfileCars from "../_components/ProfileCars";
import ProfileTours from "../_components/ProfileTours";
import ProfileHotels from "../_components/ProfileHotels";

type BookingCategory = "flights" | "cars" | "tours" | "hotels";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function MyBookingPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const requestedTab = resolvedParams?.tab;
  const activeTab: BookingCategory =
    requestedTab === "cars" ||
    requestedTab === "tours" ||
    requestedTab === "hotels" ||
    requestedTab === "flights"
      ? requestedTab
      : "flights";

  const bookingRes = await getProfileBookingsApi(activeTab);
  const bookingsList = (bookingRes.data ?? []).filter(
    (booking) =>
      !booking.service_type || booking.service_type + "s" === activeTab,
  );

  const tabs = [
    { id: "flights", label: "Flight", icon: Plane },
    { id: "cars", label: "Cars", icon: Car },
    { id: "tours", label: "Tours", icon: MapPin },
    { id: "hotels", label: "Hotel", icon: Building2 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
      <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
        My Booking
      </h1>

      {/* Tabs Filter Bar */}
      <div className="flex items-center justify-between gap-2 bg-white p-1 rounded-full border border-gray-200/80 mb-6 shadow-sm max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/profile/booking?tab=${tab.id}`}
              className={`flex-1 flex items-center gap-1 justify-center py-2  rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Booking Cards List Container */}
      <div className="space-y-4 pt-2">
        {bookingsList.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Package className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-xs text-gray-400">
              No {activeTab} bookings found.
            </p>
          </div>
        ) : (
          bookingsList.map((booking) => {
            return (
              <div key={booking.id}>
                {activeTab === "flights" && (
                  <ProfileFlights booking={booking} />
                )}
                {activeTab === "cars" && <ProfileCars booking={booking} />}
                {activeTab === "tours" && <ProfileTours booking={booking} />}
                {activeTab === "hotels" && <ProfileHotels booking={booking} />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
