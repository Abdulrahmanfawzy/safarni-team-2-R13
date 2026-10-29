"use client";
import { About } from "@/types/hotel.type";
import { Bath, Maximize, Bed } from "lucide-react";
import { useState } from "react";

const RoomAbout = ({ about }: { about: About }) => {
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(150);

  const description = about.description;

  const shortDescription =
    description.length > limit
      ? description.slice(0, limit) + "..."
      : description;

  return (
    <div className="space-y-5">
      {/* Room Information */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <Bed className="size-7 shrink-0 text-blue-500" strokeWidth={2} />
          <span className="text-sm text-gray-900 sm:text-lg">
            {about.beds_count} Beds
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="size-7 shrink-0 text-blue-500" strokeWidth={2} />
          <span className="text-sm text-gray-900 sm:text-lg">
            {about.baths_count} Bath
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Maximize className="size-7 shrink-0 text-blue-500" strokeWidth={2} />
          <span className="text-sm text-gray-900 sm:text-lg">
            {about.area_sqft} Sqrt
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-gray-500 sm:text-xl">
        {shortDescription}
        {description.length >= limit && (
          <button
            type="button"
            onClick={() => {
              setExpanded((prev) => !prev);
              setLimit((prev) => (prev === 100 ? description.length : 100));
            }}
            className="ml-1 inline text-blue-800 hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
};

export default RoomAbout;
