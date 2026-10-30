"use client";
import { Check, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectedTourResponse } from "@/types/compare.type";
import { useSetParams } from "@/hooks/useSetParams";
const ComparePriceCard = ({
  item,
}: {
  item: SelectedTourResponse["items"][number];
}) => {
  const { allParam, setParam, isPending } = useSetParams("tour_plane");
  return (
    <div
      onClick={() => setParam(String(item.id))}
      className={cn(
        "flex flex-col gap-4  relative w-full  rounded-lg border border-gray-300 bg-gray-50 p-6",
        allParam.includes(String(item.id)) && "border-2 border-app-primary",
      )}
    >
      {isPending && (
        <div className="absolute p-4 rounded-4xl text-black flex justify-center items-center inset-0 z-20  backdrop-blur-sm gap-2">
          <Loader className="animate-spin" />
          {allParam.includes(String(item.id)) ? (
            <p>Remove from compare</p>
          ) : (
            <p>Add to compare</p>
          )}
        </div>
      )}
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
