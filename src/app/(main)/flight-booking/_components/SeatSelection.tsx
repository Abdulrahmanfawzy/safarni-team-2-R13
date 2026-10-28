"use client";

import { useMemo, useState } from "react";
import { Check, Circle } from "lucide-react";
import { FlightIllustration } from "./FlightIllustration";
import { PassengerFieldArray } from "./PassengerFieldArray";
import { Button } from "@/components/ui/button";
import type { FlightSeat } from "@/types/flight.seat";

interface SeatSelectionProps {
  flightId: number;
  seats: FlightSeat[];
}

function formatPrice(price: string): string {
  const amount = Number(price);

  if (!Number.isFinite(amount)) {
    return price;
  }

  return `$${amount.toFixed(2)}`;
}

export function SeatSelection({ flightId, seats }: SeatSelectionProps) {
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const [isPassengerSheetOpen, setIsPassengerSheetOpen] = useState(false);

  const selectedSeats = useMemo(
    () => seats.filter((seat) => selectedSeatIds.includes(seat.id)),
    [seats, selectedSeatIds],
  );

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const price = Number(seat.price);
    return total + (Number.isFinite(price) ? price : 0);
  }, 0);

  const toggleSeat = (seat: FlightSeat) => {
    if (seat.status !== "available") {
      return;
    }

    setSelectedSeatIds((current) =>
      current.includes(seat.id)
        ? current.filter((id) => id !== seat.id)
        : [...current, seat.id],
    );
  };

  const seatRows = useMemo(() => {
    const rows: FlightSeat[][] = [];

    for (let index = 0; index < seats.length; index += 5) {
      rows.push(seats.slice(index, index + 5));
    }

    return rows;
  }, [seats]);

  return (
    <main className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.82fr)] lg:items-center lg:gap-8 lg:px-10">
      <section className="min-w-0">
        <FlightIllustration />
      </section>

      <section className="mx-auto w-full max-w-sm py-4">
        <h1 className="mb-1 text-center text-sm font-semibold text-gray-900 lg:text-[26px]">
          Choose seat
        </h1>

        <p className="mb-3 text-center text-xs text-gray-500">
          Select one or more available seats.
        </p>

        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-gray-600 lg:text-sm">
          <span className="flex items-center gap-1.5">
            <Circle size={7} fill="#1e429f" className="text-[#1e429f]" />
            Available
          </span>

          <span className="flex items-center gap-1.5">
            <Circle size={7} fill="#22c55e" className="text-green-500" />
            Selected
          </span>

          <span className="flex items-center gap-1.5">
            <Circle size={7} fill="#d1d5db" className="text-gray-300" />
            Unavailable
          </span>
        </div>

        {seats.length === 0 ? (
          <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
            No seats were returned for this flight.
          </p>
        ) : (
          <div
            className="grid w-full grid-cols-[repeat(6,minmax(0,1fr))] gap-x-2 gap-y-1"
            role="group"
            aria-label="Choose airplane seats"
          >
            {seatRows.flatMap((row, rowIndex) => [
              ...row
                .slice(0, 2)
                .map((seat) => (
                  <SeatButton
                    key={seat.id}
                    seat={seat}
                    selected={selectedSeatIds.includes(seat.id)}
                    onSelect={toggleSeat}
                  />
                )),
              <span
                key={`aisle-${rowIndex}`}
                aria-hidden="true"
                className="min-w-1"
              />,
              ...row
                .slice(2)
                .map((seat) => (
                  <SeatButton
                    key={seat.id}
                    seat={seat}
                    selected={selectedSeatIds.includes(seat.id)}
                    onSelect={toggleSeat}
                  />
                )),
            ])}
          </div>
        )}

        <div className="space-y-1 pt-3">
          <div className="flex items-center justify-between text-[11px] lg:text-sm">
            <span className="text-gray-600">Selected seats</span>
            <span className="font-semibold text-[#1e429f]">
              {selectedSeats.length > 0
                ? selectedSeats.map((seat) => seat.seat_number).join(", ")
                : "—"}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] lg:text-sm">
            <span className="text-gray-600">Total price</span>
            <span className="font-semibold text-[#1e429f]">
              {formatPrice(String(totalPrice))}
            </span>
          </div>
        </div>

        <Button
          type="button"
          disabled={selectedSeats.length === 0}
          onClick={() => setIsPassengerSheetOpen(true)}
          className="mt-3 h-9 w-full rounded-[3px] text-xs font-medium"
        >
          Continue
        </Button>
      </section>

      <PassengerFieldArray
        key={`${flightId}-${selectedSeatIds.join("-")}`}
        open={isPassengerSheetOpen}
        onOpenChange={setIsPassengerSheetOpen}
        flightId={flightId}
        seats={selectedSeats}
      />
    </main>
  );
}

interface SeatButtonProps {
  seat: FlightSeat;
  selected: boolean;
  onSelect: (seat: FlightSeat) => void;
}

function SeatButton({ seat, selected, onSelect }: SeatButtonProps) {
  const unavailable = seat.status !== "available";

  return (
    <button
      type="button"
      disabled={unavailable}
      aria-pressed={selected}
      aria-label={`Seat ${seat.seat_number}, ${
        unavailable ? "unavailable" : selected ? "selected" : "available"
      }`}
      title={`${seat.seat_number} — ${seat.cabin_class} — ${formatPrice(seat.price)}`}
      onClick={() => onSelect(seat)}
      className={`flex aspect-square min-w-0 items-center justify-center rounded-[2px] text-[10px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e429f] ${
        selected
          ? "bg-green-500 text-white"
          : unavailable
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "bg-[#1e429f] text-white hover:bg-[#17367f]"
      }`}
    >
      {selected ? (
        <Check size={12} aria-hidden="true" />
      ) : (
        <span className="truncate px-0.5">{seat.seat_number}</span>
      )}
    </button>
  );
}
