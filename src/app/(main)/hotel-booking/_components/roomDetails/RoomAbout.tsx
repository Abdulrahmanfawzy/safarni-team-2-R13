"use client";
import { Button } from "@/components/ui/button";
import { Bath, Maximize, Camera, Bed } from "lucide-react";
import { useState } from "react";

const RoomAbout = () => {
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(100);

  const description =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quo commodi, optio ratione saepe Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi non natus autem reiciendis cum dignissimos minima dolorum optio mollitia, rerum quia quas amet aliquam sapiente aperiam. Quasi ea tenetur ullam..";

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
          <span className="text-sm text-gray-900 sm:text-lg">3 Beds</span>
        </div>

        <div className="flex items-center gap-2">
          <Bath className="size-7 shrink-0 text-blue-500" strokeWidth={2} />
          <span className="text-sm text-gray-900 sm:text-lg">2 Bath</span>
        </div>

        <div className="flex items-center gap-2">
          <Maximize className="size-7 shrink-0 text-blue-500" strokeWidth={2} />
          <span className="text-sm text-gray-900 sm:text-lg">1,848 Sqrt</span>
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
