"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TripType } from "./TripTypeSelector";

interface FlightSearchFormProps {
  tripType: TripType;
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState("Montreal,Canada");
  const [destination, setDestination] = useState("Tokyo,Japan");
  const [departure, setDeparture] = useState("2026-12-16");
  const [returnDate, setReturnDate] = useState("2027-01-06");
  const [passengers, setPassengers] = useState("1");
  const [searchMessage, setSearchMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchMessage(
      `${tripType}: ${origin} to ${destination} · ${passengers} passenger(s)`,
    );
  }

  const inputClassName =
    "h-[31px] rounded-[3px] border-[#dce1e8] px-2 text-[11px] shadow-none focus-visible:ring-1";

  const labelClassName = "block text-xs lg:text-[18px] font-medium text-[#252525]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="flight-origin" className={labelClassName}>
          Location
        </label>
        <Input
          id="flight-origin"
          value={origin}
          onChange={(event) => setOrigin(event.target.value)}
          placeholder="Departure city"
          autoComplete="off"
          required
          className={inputClassName}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="flight-destination" className={labelClassName}>
          Destination
        </label>
        <Input
          id="flight-destination"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Arrival city"
          autoComplete="off"
          required
          className={inputClassName}
        />
      </div>

      <div
        className={`grid gap-3 ${
          tripType === "One Way" ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        <div className="min-w-0 space-y-1">
          <label htmlFor="flight-departure" className={labelClassName}>
            Departure
          </label>
          <Input
            id="flight-departure"
            type="date"
            value={departure}
            onChange={(event) => setDeparture(event.target.value)}
            required
            className={`${inputClassName} min-w-0 text-[10px]`}
          />
        </div>

        {tripType !== "One Way" && (
          <div className="min-w-0 space-y-1">
            <label htmlFor="flight-return" className={labelClassName}>
              Return
            </label>
            <Input
              id="flight-return"
              type="date"
              value={returnDate}
              min={departure}
              onChange={(event) => setReturnDate(event.target.value)}
              required
              className={`${inputClassName} min-w-0 text-[10px]`}
            />
          </div>
        )}
      </div>

      {tripType === "Multi City" && (
        <p className="text-xs text-slate-500">
          Additional city segments are not implemented in this UI-only version.
        </p>
      )}

      <div className="space-y-1">
        <label htmlFor="flight-passengers" className={labelClassName}>
          Passenger
        </label>

        <div className="relative">
          <Users className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />

          <select
            id="flight-passengers"
            value={passengers}
            onChange={(event) => setPassengers(event.target.value)}
            className="h-[31px] w-full appearance-none rounded-[3px] border border-[#dce1e8] bg-white pl-8 pr-8 text-[11px] text-[#777] outline-none focus:border-[#2447a8] focus:ring-1 focus:ring-[#2447a8]"
          >
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={String(count)}>
                {count} {count === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>

                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 
          -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <Button
        type="submit"
              className="mt-2 h-10 lg:h-14 w-full rounded-[4px] bg-[#2447a8] text-sm lg:text-[20px] font-semibold
         text-white hover:bg-[#1d3d91]"
      >
        Search Flights
      </Button>

      {searchMessage && (
        <p role="status" className="pt-1 text-xs text-[#2447a8]">
          {searchMessage}
        </p>
      )}
    </form>
  );
}
