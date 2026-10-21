"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { FlightIllustration } from "./flight-illustration";

const rows = [
  [1, 2, null, 3, 4, 5],
  [6, 7, null, 8, 9, 10],
  [11, 12, null, 13, 14, 15],
  [16, 17, null, 18, 19, 20],
  [21, 22, null, 23, 24, 25],
  [26, 27, null, 28, 29, 30],
];

const unavailableSeats = new Set([
  1, 3, 5, 7, 11, 12, 14, 15, 18, 19, 21, 22, 25, 27, 29,
]);

const initiallySelected = 6;

export function SeatSelection() {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(
    initiallySelected,
  );

  return (
    <main
      className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-5   sm:px-8 
    lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.82fr)] lg:items-center lg:gap-8 lg:px-10"
    >
      <section className="min-w-0">
        <FlightIllustration />
      </section>

      <section className="mx-auto w-full max-w-sm py-4">
        <h1 className="mb-1 text-sm lg:text-[26px] text-center font-semibold text-gray-900">
          Choose seat
        </h1>

        <div
          className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] lg:text-[20px]
         text-gray-600"
        >
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

        <div
          className="grid  w-full max-w-[240px] grid-cols-[repeat(6,minmax(55px,1fr))] gap-x-2 
          gap-y-1"
          role="group"
          aria-label="Choose an airplane seat"
        >
          {rows.flatMap((row, rowIndex) =>
            row.map((seat, seatIndex) => {
              if (seat === null) {
                return (
                  <span
                    key={`aisle-${rowIndex}-${seatIndex}`}
                    aria-hidden="true"
                  />
                );
              }

              const unavailable = unavailableSeats.has(seat);
              const selected = selectedSeat === seat;

              return (
                <button
                  key={seat}
                  type="button"
                  disabled={unavailable}
                  aria-pressed={selected}
                  aria-label={`Seat ${seat}${
                    unavailable
                      ? ", unavailable"
                      : selected
                        ? ", selected"
                        : ", available"
                  }`}
                  onClick={() => setSelectedSeat(seat)}
                  className={`flex aspect-square min-h-0 items-center justify-center 
                    rounded-[2px] text-[10px] font-medium transition focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-[#1e429f] ${
                       selected
                         ? "bg-green-500 text-white"
                         : unavailable
                           ? "cursor-not-allowed bg-gray-200 text-gray-500"
                           : "bg-[#1e429f] text-white hover:bg-[#17367f]"
                     }`}
                >
                  {selected ? <Check size={12} /> : seat}
                </button>
              );
            }),
          )}
        </div>

        <div className="pt-1 space-y-1 ">
          <div className="flex items-center justify-between text-[11px] lg:text[20px]">
            <span className="text-gray-600">Ticket price</span>
            <span className="font-semibold text-[#1e429f]">$150.00</span>
          </div>

          <div className="flex items-center justify-between text-[11px] lg:text[20px]">
            <span className="text-gray-600">Total Price</span>
            <span className="font-semibold text-[#1e429f]">$150.00</span>
          </div>

          <div className="flex items-center justify-between text-[11px] lg:text[20px]">
            <span className="text-gray-600">Your Seat</span>
            <span className="font-semibold text-[#1e429f]">
              {selectedSeat ?? "—"}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={selectedSeat === null}
          onClick={() => {
            window.location.href = "/flight-booking/boarding-pass";
          }}
          className="mt-2 h-9 w-full rounded-[3px] bg-app-primary px-4 text-xs font-medium text-white transition hover:bg-app-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </section>
    </main>
  );
}
