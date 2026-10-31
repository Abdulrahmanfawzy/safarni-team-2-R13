"use client";

import { useEffect, useState } from "react";

import BookingSummary from "./BookingSummary";
import { TourBooking } from "@/types/booking.type";

export default function BookingLoader({ id }: { id: string }) {
  const [booking, setBooking] = useState<TourBooking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`booking-${id}`);
      if (raw) setBooking(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [id]);

  if (!loaded) return null;

  if (!booking) {
    return (
      <p className="text-gray-600">
        Booking not found. Please create a new booking from the tour page.
      </p>
    );
  }

  return <BookingSummary booking={booking} />;
}