"use client";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectedTourResponse } from "@/types/compare.type";
const ComparePriceCard = ({
  item,
}: {
  item: SelectedTourResponse["items"][number];
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 w-full  rounded-lg border border-gray-300 bg-gray-50 p-6",
      )}
    >
      {/* Title and Price */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium">{item.title}</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-semibold">{item.price_label}</span>
          <span className="text-xl text-gray-500">{item.price_unit}</span>
        </div>
      </div>
      {/* Features */}
      <ul className="space-y-2">
        {item.features.map(({ key, label, value }) => (
          <li
            key={key}
            className="flex items-center text-gray-900 gap-3 text-xl"
          >
            <Check size={20} />
            <span className="block text-base">
              {label} : {value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparePriceCard;
