"use client";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/shared/Badge";
import { Hotel } from "@/types/hotel.type";

interface HotelCardProps {
  variant?: "vertical" | "horizontal";
  item: Hotel;
}

const HotelCard = ({ item, variant = "vertical" }: HotelCardProps) => {
  const isHorizontal = variant === "horizontal";
  const pathname = usePathname();
  return (
    <article
      className={`rounded-2xl p-4 shadow-app-card-shadow ${
        isHorizontal
          ? "flex min-w-0 items-center gap-2.5"
          : "flex flex-col gap-2"
      }`}
    >
      {/* Image */}
      <Link href={`${pathname}/${item?.id}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg ${
            isHorizontal ? "size-28" : "h-50 w-full"
          }`}
        >
          <Image
            src={item?.cover_photo}
            alt={item?.name ?? "hotel card"}
            fill
            sizes={isHorizontal ? "96px" : "(max-width: 768px) 100vw, 220px"}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col w-full gap-1.5">
        {/* discount and rating */}
        {(item?.discount_rate || item?.stars_count) && (
          <div className="flex items-center justify-between gap-2">
            {item?.discount_rate ? (
              <Badge>{item?.discount_rate}% Off</Badge>
            ) : (
              <span />
            )}

            {item?.stars_count && (
              <span className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                {item?.stars_count.toFixed(1)}
              </span>
            )}
          </div>
        )}

        <Link href={`${pathname}/${item?.id}`}>
          <h3 className="mt-1.5 truncate text-xl font-medium text-gray-900">
            {item?.name.split(" ").slice(0, 6).join(" ")}
          </h3>
        </Link>

        {location && (
          <p className="flex items-center gap-1.5 text-base text-gray-400">
            <MapPin size={20} className="shrink-0" />
            <span className="truncate">{item?.city}</span>
          </p>
        )}
      </div>
    </article>
  );
};

export default HotelCard;
