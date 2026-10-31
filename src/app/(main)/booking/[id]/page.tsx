"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BookingSummary from "./_components/BookingSummary";
import { TourBooking } from "@/types/booking.type";

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
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
      <main className="mx-auto max-w-2xl p-6">
        <p className="text-gray-600">
          Booking not found. Please create a new booking from the tour page.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <BookingSummary booking={booking} />
    </main>
  );
}