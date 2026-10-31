"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { useCreatePaypalOrder } from "@/hooks/usePaypal";
import useCompareCheckout from "@/hooks/useCompareCheckout";
import { TourBooking } from "@/types/booking.type";
import { cn } from "@/lib/utils";

const TEAM = 2; // change to 1 if your team is the first one

type Method = "paypal" | "mastercard" | "visa";
const METHODS: { key: Method; label: string }[] = [
  { key: "paypal", label: "Paypal" },
  { key: "mastercard", label: "Mastercard" },
  { key: "visa", label: "Visa" },
];

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const session = useSession();

  const [booking, setBooking] = useState<TourBooking | null>(null);
  const [method, setMethod] = useState<Method>("paypal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const paypal = useCreatePaypalOrder();
  const card = useCompareCheckout();
  const isPending = paypal.isPending || card.isPending;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`booking-${id}`);
      if (raw) setBooking(JSON.parse(raw));
    } catch {}
  }, [id]);

  useEffect(() => {
    setFullName((v) => v || session.data?.user?.name || "");
    setEmail((v) => v || session.data?.user?.email || "");
  }, [session.data]);

  const expired =
    booking && new Date(booking.payment_expires_at).getTime() < Date.now();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (method === "paypal") {
      paypal.mutate(id, {
        onSuccess: (res) => {
          const order = res.data;
          if (!res.success || !order?.approval_url) {
            toast.error(res.message || "Could not start PayPal payment");
            return;
          }
          try {
            sessionStorage.setItem(
              "paypal-pending",
              JSON.stringify({
                bookingId: id,
                orderId: order.paypal_order_id,
              }),
            );
          } catch {}
          window.location.href = order.approval_url;
        },
        onError: (err) => toast.error(err.message || "Payment failed"),
      });
      return;
    }

    // Visa / Mastercard -> hosted checkout (card details are entered on the
    // payment provider's page, never in our own inputs)
    if (!booking) return;
    card.mutate(
      {
        tour_id: String(booking.tour.id),
        full_name: fullName,
        email,
        team: TEAM,
      },
      {
        onSuccess: (res) => {
          const url = res.data?.payment?.checkout_url;
          if (!res.success || !url) {
            toast.error(res.message || "Payment failed");
            return;
          }
          window.location.href = url;
        },
        onError: (err) => toast.error(err.message || "Payment failed"),
      },
    );
  };

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
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Summary side */}
        <div className="flex flex-col justify-center gap-3 rounded-2xl bg-gray-100 p-8">
          <p className="text-sm text-gray-500">{booking.booking_code}</p>
          <h2 className="text-xl font-semibold">{booking.tour.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(booking.start_at).toLocaleDateString("en", {
              timeZone: "UTC",
            })}{" "}
            to{" "}
            {new Date(booking.end_at).toLocaleDateString("en", {
              timeZone: "UTC",
            })}
          </p>
          <p className="text-sm">Adults: {booking.participants.adults ?? 0}</p>
          <p className="text-3xl font-semibold">
            {booking.total_amount} {booking.currency}
          </p>
        </div>

        {/* Payment side */}
        <form onSubmit={handleConfirm} className="space-y-5">
          <h1 className="text-center text-2xl font-semibold">Payment Method</h1>

          <div className="flex flex-wrap gap-3">
            {METHODS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMethod(m.key)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-medium",
                  method === m.key && "border-2 border-app-primary",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Full Name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Your Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <p className="text-sm text-gray-500">
            {method === "paypal"
              ? "You will be redirected to PayPal to approve the payment."
              : "You will be redirected to our secure payment page to enter your card details."}
          </p>

          {expired && (
            <p className="text-sm text-red-600">
              This booking has expired. Please create a new one.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending || !!expired}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-app-primary px-8 py-3 font-medium text-white disabled:opacity-60"
          >
            {isPending && <Loader className="animate-spin" size={18} />}
            Confirm Booking
          </button>
        </form>
      </div>
    </main>
  );
}