"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";

import useCreateBooking from "@/hooks/useCreateBooking";
import { cn } from "@/lib/utils";

interface Schedule {
  id: number;
  date: string;
  available_slots: number;
  capacity: number;
}

interface BookingPanelProps {
  tourId: number | string;
  price: number;
  schedules: Schedule[];
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

const BookingPanel = ({ tourId, price, schedules }: BookingPanelProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateBooking();

  const [scheduleId, setScheduleId] = useState<number | null>(
    schedules.find((s) => s.available_slots > 0)?.id ?? null,
  );
  const [adults, setAdults] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const selected = schedules.find((s) => s.id === scheduleId);
  const maxAdults = selected?.available_slots ?? 1;

  const handleBook = () => {
    if (!scheduleId) return;
    setError(null);

    mutate(
      { tour_id: tourId, schedule_id: scheduleId, adults },
      {
        onSuccess: (res) => {
          if (res.success && res.data) {
            // خزّن الحجز عشان صفحة /booking/[id] تقراه
            try {
              sessionStorage.setItem(
                `booking-${res.data.id}`,
                JSON.stringify(res.data),
              );
            } catch {}
            router.push(`/booking/${res.data.id}`);
          } else {
            setError(res.message ?? "Booking failed");
          }
        },
        onError: () => setError("Something went wrong, please try again."),
      },
    );
  };

  return (
    <section className="mt-8 flex flex-col gap-4 rounded-xl border p-4">
      <div>
        <p className="text-sm text-gray-500">Price per person</p>
        <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
      </div>

      {/* Schedules */}
      {schedules.length > 0 ? (
        <ul className="space-y-2">
          {schedules.map((s) => {
            const soldOut = s.available_slots === 0;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={soldOut}
                  onClick={() => {
                    setScheduleId(s.id);
                    setAdults((a) => Math.min(a, s.available_slots));
                  }}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2 text-left text-sm",
                    scheduleId === s.id && "border-2 border-app-primary",
                    soldOut && "cursor-not-allowed opacity-50",
                  )}
                >
                  {formatDate(s.date)} · {s.available_slots} of {s.capacity}{" "}
                  spots left
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No available dates.</p>
      )}

      {/* Adults counter */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Adults</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAdults((a) => Math.max(1, a - 1))}
            disabled={adults <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-40"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center">{adults}</span>
          <button
            type="button"
            onClick={() => setAdults((a) => Math.min(maxAdults, a + 1))}
            disabled={adults >= maxAdults}
            className="flex h-8 w-8 items-center justify-center rounded-full border disabled:opacity-40"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <p className="text-lg font-semibold">
          Total: ${(price * adults).toFixed(2)}
        </p>
        <button
          type="button"
          onClick={handleBook}
          disabled={!scheduleId || isPending}
          className="flex items-center gap-2 rounded-xl bg-app-primary px-8 py-3 font-medium text-white disabled:opacity-60"
        >
          {isPending && <Loader className="animate-spin" size={18} />}
          Book now
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </section>
  );
};

export default BookingPanel;