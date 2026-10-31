"use client";

import { useState } from "react";
import { Loader } from "lucide-react";

import useCompareCheckout from "@/hooks/useCompareCheckout";
import { TourBooking } from "@/types/booking.type";

const TEAM = 2; // change to 1 if your team is the first one

const BookingSummary = ({ booking }: { booking: TourBooking }) => {
  const { mutate, isPending } = useCompareCheckout();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const expired = new Date(booking.payment_expires_at).getTime() < Date.now();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    mutate(
      {
        tour_id: String(booking.tour.id),
        full_name: fullName,
        email,
        team: TEAM,
      },
      {
        onSuccess: (res) => {
          const url = res.data?.payment?.checkout_url; // <-- changed
          if (res.success && url) {
            window.location.href = url;
          } else {
            setError(res.message ?? "Payment failed");
          }
        },
        onError: () => setError("Something went wrong, please try again."),
      },
    );
  };

  return (
    <div className="space-y-4 rounded-lg border bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold">Booking {booking.booking_code}</h1>
      <p className="text-lg">{booking.tour.title}</p>

      <p className="text-sm text-gray-600">
        {new Date(booking.start_at).toLocaleDateString("en", { timeZone: "UTC" })}{" "}
        to{" "}
        {new Date(booking.end_at).toLocaleDateString("en", { timeZone: "UTC" })}
      </p>

      <p>Adults: {booking.participants.adults ?? 0}</p>

      <p className="text-3xl font-semibold">
        {booking.total_amount} {booking.currency}
      </p>

      <p className="text-sm text-gray-500">
        Status: {booking.status} · Pay before{" "}
        {new Date(booking.payment_expires_at).toLocaleTimeString()}
      </p>

      {expired ? (
        <p className="text-sm text-red-600">
          This booking has expired. Please create a new one.
        </p>
      ) : (
        <form onSubmit={handlePay} className="space-y-3 border-t pt-4">
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg border px-4 py-2"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2"
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-app-primary px-8 py-3 font-medium text-white disabled:opacity-60"
          >
            {isPending && <Loader className="animate-spin" size={18} />}
            Pay now
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default BookingSummary;