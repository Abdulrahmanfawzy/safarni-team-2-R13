"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PickupCarImage } from "@/types/car.types";

type CarGalleryProps = {
  images: PickupCarImage[];
  imageIndex: number;
  onImageChange: (index: number) => void;
};

export default function CarGallery({
  images,
  imageIndex,
  onImageChange,
}: CarGalleryProps) {
  const currentImage = images[imageIndex];

  const showPrevious = () =>
    onImageChange((imageIndex - 1 + images.length) % images.length);

  const showNext = () => onImageChange((imageIndex + 1) % images.length);

  if (!currentImage) return null;

  return (
    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-[#f4f4f5] p-4 sm:min-h-[360px] md:min-h-[380px] lg:min-h-[382px]">
      <div className="relative h-[220px] w-full sm:h-[270px] md:h-[260px] lg:h-[285px]">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          unoptimized
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[26%] left-[7%] right-[7%] h-9 rounded-[50%] border-b border-slate-400/40"
      />

      {images.length > 1 && (
        <div className="absolute bottom-[24%] left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous car image"
            className="flex size-5 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          <span className="text-[9px] tabular-nums text-slate-500">
            {imageIndex + 1}/{images.length}
          </span>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next car image"
            className="flex size-5 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
