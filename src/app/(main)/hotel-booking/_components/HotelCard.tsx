"use client";
import Image, { StaticImageData } from "next/image";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HotelCardProps {
  name: string;
  image: string | StaticImageData;
  discount?: number;
  rating?: number;
  location?: string;
  roomPrice?: string;
  variant?: "vertical" | "horizontal";
}

const HotelCard = ({
  name,
  image,
  discount,
  rating,
  location,
  roomPrice,
  variant = "vertical",
}: HotelCardProps) => {
  const isHorizontal = variant === "horizontal";
  const pathname = usePathname();
  return (
    <article
      className={`rounded-2xl   p-4 shadow-app-card-shadow ${
        isHorizontal
          ? "flex min-w-0 items-center gap-2.5"
          : "flex flex-col gap-2"
      }`}
    >
      {/* Image */}
      <Link href={`${pathname}/${name}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg ${
            isHorizontal ? "size-28" : "h-50 w-full"
          }`}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes={isHorizontal ? "96px" : "(max-width: 768px) 100vw, 220px"}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col w-full gap-1.5">
        {/* discount and rating */}
        {(discount || rating) && (
          <div className="flex items-center justify-between gap-2">
            {discount ? (
              <span className="rounded-full bg-sky-50 px-4 py-2 text-sm text-app-primary font-medium">
                {discount}% Off
              </span>
            ) : (
              <span />
            )}

            {rating && (
              <span className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        )}

        <Link href={`${pathname}/${name}?name=mohammed`}>
          <h3 className="mt-1.5 truncate text-xl font-medium text-gray-900">
            {name}
          </h3>
        </Link>

        {location && (
          <p className="flex items-center gap-1.5 text-base text-gray-400">
            <MapPin size={20} className="shrink-0" />
            <span className="truncate">{location}</span>
          </p>
        )}

        {roomPrice && (
          <p className="text-gray-500 font-semibold text-base">
            From <span className="text-blue-600">{roomPrice}$</span> Per Night
          </p>
        )}
      </div>
    </article>
  );
};

export default HotelCard;
