"use client";

import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FlightSearchParams } from "@/types/flight.details";
import type { TripType } from "./TripTypeSelector";

interface FlightSearchFormProps {
  tripType: TripType;
}

function toApiTripType(tripType: TripType): FlightSearchParams["type"] {
  switch (tripType) {
    case "One Way":
      return "one_way";
    case "Multi City":
      return "multi_city";
    default:
      return "round_trip";
  }
}

export default function FlightSearchForm({ tripType }: FlightSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [origin, setOrigin] = useState("Aswan");
  const [destination, setDestination] = useState("Cairo");
  const [departure, setDeparture] = useState("2026-10-27");
  const [returnDate, setReturnDate] = useState("2026-10-29");
  const [passengers, setPassengers] = useState("2");
  const [formError, setFormError] = useState("");

  const isRoundTrip = tripType === "Round Trip";
  const isOneWay = tripType === "One Way";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (tripType === "Multi City") {
      setFormError(
        "Multi-city searches are not implemented yet. Select Round Trip or One Way.",
      );
      return;
    }

    if (isRoundTrip && returnDate < departure) {
      setFormError(
        "The return date cannot be earlier than the departure date.",
      );
      return;
    }

    const search: FlightSearchParams = {
      type: toApiTripType(tripType),
      location: origin.trim(),
      dest: destination.trim(),
      departure,
      passenger: Number(passengers),
      ...(isRoundTrip ? { return: returnDate } : {}),
    };

    const searchParams = new URLSearchParams();

    searchParams.set("type", search.type);
    searchParams.set("location", search.location);
    searchParams.set("dest", search.dest);
    searchParams.set("departure", search.departure);
    searchParams.set("passenger", String(search.passenger));

    if (search.return) {
      searchParams.set("return", search.return);
    }

    router.push(
      `${pathname.replace(/\/$/, "")}/flight-details?${searchParams.toString()}`,
    );
  }

  const inputClassName =
    "h-[31px] rounded-[3px] border-[#dce1e8] px-2 text-[11px] shadow-none focus-visible:ring-1";

  const labelClassName =
    "block text-xs font-medium text-[#252525] lg:text-[16px]";

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

      <div className={`grid gap-3 ${isOneWay ? "grid-cols-1" : "grid-cols-2"}`}>
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

        {isRoundTrip && (
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

        {tripType === "Multi City" && (
          <p className="col-span-full text-xs text-slate-500">
            Multi-city search is not supported by this form yet.
          </p>
        )}
      </div>

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

          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {formError && (
        <p role="alert" className="text-xs text-red-600">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        className="mt-2 w-full rounded-[4px] bg-[#2447a8] text-sm font-semibold
         text-white hover:bg-[#1d3d91]  lg:text-lg"
      >
        Search Flights
      </Button>
    </form>
  );
}
