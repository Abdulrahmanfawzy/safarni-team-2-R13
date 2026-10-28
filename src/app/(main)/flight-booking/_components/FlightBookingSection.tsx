"use client";

import { useState } from "react";
import FlightSearchForm from "./FlightSearchForm";
import TripTypeSelector, { type TripType } from "./TripTypeSelector";
import { FlightIllustration } from "./FlightIllustration";
export default function FlightBookingSection() {
  const [tripType, setTripType] = useState<TripType>("Round Trip");

  return (
    <section
      className=" mx-auto grid w-full  grid-cols-1 px-1 gap-8
     md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-[8.5%] overflow-hidden"
    >
      <div className="min-w-0 md:h-[500px] mt-4 ">
        <FlightIllustration />
      </div>

      <div className="min-w-0 ">
        <TripTypeSelector value={tripType} onChange={setTripType} />

        <FlightSearchForm tripType={tripType} />
      </div>
    </section>
  );
}
