"use client";

import Image from "next/image";

import { Tour } from "@/constants/tours";
import FavoriteButton from "@/components/shared/FavoriteButton";

interface TourCardProps {
  tour: Tour;
  isFavorite?: boolean;
  onClick?: (tour: Tour) => void;
  className?: string;
}

export default function TourCard({
  tour,
  isFavorite = false,
  onClick,
  className = "",
}: TourCardProps) {
  const duration =
    tour.durationText ??
    (tour.days ? `${tour.days} days` : tour.hours ? `${tour.hours} hours` : "");

  return (
    <article
      onClick={() => onClick?.(tour)}
      className={`cursor-pointer rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md ${className}`}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-100">
        {tour.image && (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        )}
        <FavoriteButton
          id={tour.id}
          type="tour"
          initialFavorite={isFavorite}
          className="absolute right-2 top-2"
        />
      </div>

      <div className="space-y-1 px-1 pb-1 pt-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-xs font-semibold text-gray-900">
            {tour.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-gray-600">
            <span className="text-yellow-400">★</span>
            {tour.rating > 0
              ? `${tour.rating.toFixed(1)} (${tour.reviews})`
              : "New"}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-400">
          <span>{tour.pickup ? "Pickup Available" : ""}</span>
          {duration && (
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
              {duration}
            </span>
          )}
        </div>

        <p className="text-[10px] text-gray-400">
          From{" "}
          <span className="text-sm font-semibold text-blue-700">
            {tour.price}$
          </span>{" "}
          per Person
          {tour.oldPrice && (
            <span className="ml-1 line-through">{tour.oldPrice}$</span>
          )}
        </p>
      </div>
    </article>
  );
}