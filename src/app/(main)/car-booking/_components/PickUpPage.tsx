"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import type { CarDetailsApiItem, PickupPlanId } from "@/types/car.types";
import { PICKUP_PLANS, PICKUP_SPECS } from "@/constants/cars";
import CarGallery from "./CarGallery";
import PlanOption from "./PlanOption";

type PickUpPageProps = {
  car: CarDetailsApiItem;
};

export default function PickUpPage({ car }: PickUpPageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<PickupPlanId>("business");

  const images = useMemo(() => {
    const carImages = car.images
      .filter((image) => Boolean(image))
      .map((src, index) => ({
        src,
        alt: `${car.model} - image ${index + 1}`,
      }));

    return carImages.length
      ? carImages
      : [
          {
            src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            alt: car.model,
          },
        ];
  }, [car.images, car.model]);

  const latitude = car.location?.latitude ?? car.latitude;
  const longitude = car.location?.longitude ?? car.longitude;

  const mapHref = useMemo(() => {
    const params = new URLSearchParams({
      address: car.pickup_address ?? "Car pickup location",
      carName: car.model,
      image: car.images?.[0] ?? "",
      transmission: car.transmission,
      seats: String(car.seats_count),
      fuel: car.fuel_type,
      hourlyRent: String(car.hourly_rent),
      dailyRent: String(car.daily_rent),
    });

    if (latitude != null && longitude != null) {
      params.set("lat", String(latitude));
      params.set("lng", String(longitude));
    }

    return `/car-booking/map?${params.toString()}`;
  }, [car, latitude, longitude]);

  const selectedPlanDetails = PICKUP_PLANS.find(
    (plan) => plan.id === selectedPlan,
  );

  const specifications = [
    {
      label: "Power",
      value: car.power_hp ?? "Not available",
    },
    {
      label: "Max Speed",
      value: car.max_speed_kmh ?? car.speed ?? "Not available",
    },
    {
      label: "Acceleration",
      value: car.acceleration ?? "Not available",
    },
  ];

  return (
    <section className="w-full px-4 pb-8 pt-1 sm:px-6 lg:px-0">
      <Link
        href="/car-booking"
        aria-label="Back to car listings"
        className="mb-3 flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeft className="size-4" />
      </Link>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div className="min-w-0">
          <CarGallery
            images={images}
            imageIndex={imageIndex}
            onImageChange={setImageIndex}
          />
        </div>

        <div className="min-w-0 space-y-5">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">
                {car.brand?.name ?? "Car"}
                {car.body_type ? ` · ${car.body_type}` : ""}
              </p>

              <h1 className="text-xl font-semibold text-slate-900">
                {car.model}
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {specifications.map((specification) => (
                <div
                  key={specification.label}
                  className="rounded-lg border border-slate-100 p-3"
                >
                  <p className="text-xs text-slate-500">
                    {specification.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {specification.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm text-slate-600">
              <span>{car.transmission}</span>
              <span className="border-x border-slate-200 px-2">
                {car.seats_count} seats
              </span>
              <span>{car.fuel_type}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-slate-900">
              Rental plan
            </h2>

            {PICKUP_PLANS.map((plan) => {
              const price =
                plan.id === "business" ? car.hourly_rent : car.daily_rent;

              return (
                <PlanOption
                  key={plan.id}
                  plan={{
                    ...plan,
                    price,
                  }}
                  selected={selectedPlan === plan.id}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              );
            })}

            {selectedPlanDetails && (
              <p className="text-xs text-slate-500">
                Selected plan: {selectedPlanDetails.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-sm md:text-[16px] font-semibold text-slate-900">
              Pickup location
            </h2>

            <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-app-primary" />

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">
                  Car location
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {car.pickup_address ?? "Pickup address not available"}
                </p>
              </div>
            </div>

            {latitude != null && longitude != null ? (
              <Link
                href={mapHref}
                className="flex h-10 w-full items-center justify-center rounded-md bg-app-primary text-sm
                lg:text-[16px] font-semibold text-white transition hover:bg-app-primary/90"
              >
                Pick Up
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="h-10 w-full cursor-not-allowed rounded-md bg-slate-300 text-sm font-semibold text-white"
              >
                Pickup location unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
