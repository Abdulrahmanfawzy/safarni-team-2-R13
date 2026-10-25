"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import Image from "next/image";

interface GalleryProps {
  images?: string[];
  alt?: string;
}

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
];

const Gallery = ({
  images = defaultImages,
  alt = "Property",
}: GalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="relative h-115 md:h-165 w-full overflow-hidden rounded-xl bg-gray-100  ">
      {/* Main Gallery */}
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                fill
                alt={`${alt} image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="absolute inset-x-4 bottom-4 z-10 rounded-xl bg-white/95 p-2 shadow-lg sm:inset-x-6 sm:bottom-5 sm:p-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            breakpoints={{
              480: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              640: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            className="property-gallery-thumbs"
          >
            {images.map((image, index) => (
              <SwiperSlide key={`${image}-thumb-${index}`}>
                <div className="h-12 overflow-hidden rounded-md sm:h-14">
                  <img
                    src={image}
                    alt={`${alt} thumbnail ${index + 1}`}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Gallery;
