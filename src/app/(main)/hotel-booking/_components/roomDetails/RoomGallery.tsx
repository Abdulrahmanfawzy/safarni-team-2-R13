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

const defaultImages = [
  "https://swiperjs.com/demos/images/abstract-1.jpg",
  "https://swiperjs.com/demos/images/abstract-2.jpg",
  "https://swiperjs.com/demos/images/abstract-3.jpg",
  "https://swiperjs.com/demos/images/abstract-4.jpg",
  "https://swiperjs.com/demos/images/abstract-5.jpg",
  "https://swiperjs.com/demos/images/abstract-6.jpg",
  "https://swiperjs.com/demos/images/abstract-7.jpg",
  "https://swiperjs.com/demos/images/abstract-8.jpg",
  "https://swiperjs.com/demos/images/abstract-9.jpg",
  "https://swiperjs.com/demos/images/abstract-10.jpg",
  "https://swiperjs.com/demos/images/abstract-4.jpg",
  "https://swiperjs.com/demos/images/abstract-5.jpg",
  "https://swiperjs.com/demos/images/abstract-6.jpg",
  "https://swiperjs.com/demos/images/abstract-7.jpg",
  "https://swiperjs.com/demos/images/abstract-4.jpg",
  "https://swiperjs.com/demos/images/abstract-5.jpg",
  "https://swiperjs.com/demos/images/abstract-6.jpg",
  "https://swiperjs.com/demos/images/abstract-7.jpg",
];

const RoomGallery = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="flex items-center justify-between gap-3 text-lg font-meduim text-gray-900 sm:text-2xl">
        <h2>
          Gallery
          <span className="text-blue-800"> (200)</span>
        </h2>
        <Button
          type="button"
          variant="ghost"
          className="text-blue-800 hover:bg-blue-50 hover:text-blue-800"
        >
          <label
            htmlFor="addNewPhoto"
            className="cursor-pointer flex items-center gap-2"
          >
            <Camera className="size-4 sm:size-6" />
            <span>Add Photo</span>
          </label>
        </Button>

        {/* hidden input */}
        <input
          id="addNewPhoto"
          type="file"
          accept="image/*"
          className="hidden"
        />
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
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const nav = swiper.params.navigation as NavigationOptions;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }}
          modules={[Grid, Navigation]}
          className="h-35 w-full sm:h-45 lg:h-65"
        >
          {defaultImages.map((image, index) => (
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
