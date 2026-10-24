"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowLeft, MapPin } from "lucide-react";
import {
  PICKUP_CAR_IMAGES,
  PICKUP_PLANS,
  PICKUP_SPECS,
} from "@/constants/cars";
import type { PickupPlanId } from "@/types/car.types";
import CarGallery from "./CarGallery";
import PlanOption from "./PlanOption";

export default function PickUpPage() {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<PickupPlanId>("business");
  
  return (
    <section className="w-full px-4 pb-8 pt-1 sm:px-6 lg:px-0">
      <button
        type="button"
        aria-label="Go back"
        onClick={() => window.history.back()}
        className="mb-3 flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
      >
        <ArrowLeft className="size-4" />
      </button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6 lg:gap-8">
        <CarGallery
          images={PICKUP_CAR_IMAGES}
          imageIndex={imageIndex}
          onImageChange={setImageIndex}
        />

        <div className="min-w-0">
          <section aria-labelledby="popular-cars-title">
            <h1
              id="popular-cars-title"
              className="mb-2.5 text-base font-semibold text-slate-800"
            >
              Popular Cars
            </h1>

            <div className="grid grid-cols-3 gap-2">
              {PICKUP_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex min-h-[48px] flex-col items-center justify-center rounded-md
                   border border-slate-100 bg-white px-1.5 py-1.5 text-center"
                >
                  <span className="text-[11px] font-semibold text-slate-700 sm:text-xs">
                    {spec.label}
                  </span>
                  <span className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="plan-title" className="mt-4">
            <h2
              id="plan-title"
              className="mb-2.5 text-base font-semibold text-slate-800"
            >
              Plan
            </h2>

            <div className="flex flex-col gap-3">
              {PICKUP_PLANS.map((plan) => (
                <PlanOption
                  key={plan.id}
                  plan={plan}
                  selected={selectedPlan === plan.id}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              ))}
            </div>
          </section>

          <form className="mt-3" onSubmit={(event) => event.preventDefault()}>
            <div>
              <p className="mb-1 text-[10px] lg:text-lg font-semibold text-slate-800">
                Location
              </p>

              <Link
                href="/car-booking/map"
                className="flex h-9 items-center gap-2 rounded border border-slate-200 px-2.5
                 text-[10px] text-slate-500 transition hover:border-app-primary"
              >
                <MapPin className="size-3.5 shrink-0" />
                200-298 Clipper St San Francisco
              </Link>

              <Link
                href="/car-booking/map"
                className="mt-3 flex h-[30px] p-4 lg:text-lg w-full items-center justify-center rounded-[4px]
                 bg-app-primary text-[11px] font-semibold text-white hover:bg-app-primary/90"
              >
                Pick Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
