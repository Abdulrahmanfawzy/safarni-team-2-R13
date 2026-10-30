"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Badge from "@/components/shared/Badge";
import { Room } from "@/types/hotel.type";

interface RoomCardProps {
  variant?: "vertical" | "horizontal";
  item: Room;
}

const RoomCard = ({ item, variant = "vertical" }: RoomCardProps) => {
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
            src={item?.thumbnail_url}
            alt={item?.room_name ?? "hotel card"}
            fill
            sizes={isHorizontal ? "96px" : "(max-width: 768px) 100vw, 220px"}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col w-full gap-1.5">
        {/* discount and rating */}
        {(item?.discount_rate || item?.max_guests) && (
          <div className="flex items-center justify-between gap-2">
            {item?.discount_rate ? (
              <Badge>{item?.discount_rate}% Off</Badge>
            ) : (
              <span />
            )}

            {item?.max_guests && (
              <span className="flex items-center gap-1 text-sm font-semibold text-neutral-500">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                {item?.max_guests.toFixed(1)}
              </span>
            )}
          </div>
        )}

        <Link href={`${pathname}/${item?.id}`}>
          <h3 className="mt-1.5 truncate text-xl font-medium text-gray-900">
            {item?.room_name}
          </h3>
        </Link>

        {item.price_per_night != null && (
          <p className="mt-1 text-sm text-gray-500">
            From{" "}
            <span className="text-lg font-semibold text-app-primary">
              {item.price_per_night}$
            </span>{" "}
            per night
          </p>
        )}
      </div>
    </article>
  );
};

export default RoomCard;
