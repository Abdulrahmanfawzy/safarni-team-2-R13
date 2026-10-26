"use client";

import Image from "next/image";
import { useState } from "react";
import { Tour } from "@/constants/tours";

interface TourCardProps {
  tour: Tour;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onClick?: (tour: Tour) => void;
  className?: string;
}

export default function TourCard({
  tour,
  isFavorite,
  onToggleFavorite,
  onClick,
  className = "",
}: TourCardProps) {
  const [localFav, setLocalFav] = useState(false);
  const fav = isFavorite ?? localFav;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(tour.id);
    else setLocalFav((v) => !v);
  };

  const duration = tour.days
    ? `${tour.days} Days`
    : tour.hours
    ? `${tour.hours} hour`
    : null;

  return (
    <article
      onClick={() => onClick?.(tour)}
      className={`cursor-pointer rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
        {tour.image && (
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        )}
        <button
          type="button"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={toggle}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={fav ? "#ef4444" : "none"}
            stroke={fav ? "#ef4444" : "#9ca3af"}
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
          </svg>
        </button>
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