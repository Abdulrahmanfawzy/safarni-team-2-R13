"use client";

import { useState } from "react";
import Image from "next/image";
import FlightSearchForm from "./FlightSearchForm";
import TripTypeSelector, { type TripType } from "./TripTypeSelector";
import Rectangle from "@/assets/images/Rectangle 20@2x.png";
export default function FlightBookingSection() {
  const [tripType, setTripType] = useState<TripType>("Round Trip");

  return (
      <section className="mx-auto grid w-full max-w-300 grid-cols-1 items-center gap-8
     md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 lg:gap-[8.5%]">
          <div className="relative aspect-square min-h-70 max-h-screen overflow-hidden rounded-[20px]
       bg-[#f4f4f5] sm:min-h-90 md:min-h-0 ">
        <Image
          src={Rectangle}
          alt="Airplane flying through the sky"
          fill
          priority
          sizes="(max-width: 768px) h-[600px], 50vw"
          className="object-contain p-5 md:p-4"
        />
      </div>

      <div className="min-w-0">
        <TripTypeSelector value={tripType} onChange={setTripType} />

        <FlightSearchForm tripType={tripType} />
      </div>
    </section>
  );
}
