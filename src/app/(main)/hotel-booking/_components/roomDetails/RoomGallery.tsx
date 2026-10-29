"use client";
import { Button } from "@/components/ui/button";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

// import required modules
import { Grid, Navigation } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
import { NavigationOptions } from "swiper/types";
import { Gallery } from "@/types/hotel.type";

const RoomGallery = ({ gallery }: { gallery: Gallery }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="flex items-center justify-between gap-3 text-lg font-meduim text-gray-900 sm:text-2xl">
        <h2>
          Gallery
          <span className="text-blue-800"> ({gallery.total_count})</span>
        </h2>
      </div>

      {/* Images */}
      <div className="relative mt-4">
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous images"
          className={`absolute top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-900 shadow-sm transition hover:bg-gray-200 sm:size-10 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 -left-6 -translate-x-1/2`}
        >
          <ChevronLeft className="size-8" />
        </button>

        <button
          ref={nextRef}
          type="button"
          aria-label="Next images"
          className={`absolute top-1/2 z-10 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-900 shadow-sm transition hover:bg-gray-50 sm:size-10 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-0 -right-6 translate-x-1/2`}
        >
          <ChevronRight className="size-8 " />
        </button>

        <Swiper
          style={
            {
              "--swiper-navigation-color": "var(--app-primary)",
              "--swiper-pagination-color": "var(--app-primary)",
            } as React.CSSProperties
          }
          slidesPerView={4}
          grid={{
            rows: 2,
          }}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation as NavigationOptions;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }}
          modules={[Grid, Navigation]}
          className="h-35 w-full sm:h-45 lg:h-65"
        >
          {gallery.photos.map((image, index) => (
            <SwiperSlide
              className="flex justify-center items-center"
              key={`${image}-${index}`}
            >
              <div className="h-full cursor-pointer w-full rounded-lg size-20 relative">
                <Image
                  src={image}
                  fill
                  sizes="20"
                  alt={`Gallery image ${index + 1}`}
                  className="h-auto w-full rounded-lg object-cover sm:h-52"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RoomGallery;
