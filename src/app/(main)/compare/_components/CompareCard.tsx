"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import compareImage from "@/assets/images/compare.png";

import { useSetParams } from "@/hooks/useSetParams";
import { Loader } from "lucide-react";
import { CompareTourResponse } from "@/types/compare.type";

const CompareCard = ({
  item,
}: {
  item: CompareTourResponse["items"][number];
}) => {
  const { allParam, setParam, isPending } = useSetParams("tour_id");
  const id = String(item.id);

  return (
    <div
      onClick={() => {
        if (!isPending) {
          setParam(id);
        }
      }}
      className={cn(
        isPending ? "cursor-" : "cursor-pointer",
        allParam.includes(id) && "border-2 border-app-primary",
        "p-4 rounded-4xl relative  shadow-app-card-shadow",
      )}
    >
      {isPending && (
        <div className="absolute p-4 rounded-4xl text-black flex justify-center items-center inset-0 z-20  backdrop-blur-sm gap-2">
          <Loader className="animate-spin" />
          {allParam.includes(id) ? (
            <p>Remove from compare</p>
          ) : (
            <p>Add to compare</p>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="relative min-w-25 max-w-35 w-full h-25 md:size-25">
          <Image fill src={item.image ?? compareImage} alt="compare image" />
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-medium text-black">{item.title}</h3>

          <p className="text-gray-500 text-base">{item.schedule_line}</p>

          <p className="text-gray-500 text-base">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
