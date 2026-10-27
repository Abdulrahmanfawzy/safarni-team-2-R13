// src/components/shared/destination-card.tsx
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

export interface DestinationCardItem {
  id: string | number;
  name: string;
  city: string;
  image: string | StaticImageData | null;
  rating: number | null;
}

export default function DestinationCard({
  item,
}: {
  item: DestinationCardItem;
}) {
  return (
    <Link
      href={`/destination/${item.id}`}
      className="block rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 40vw, 25vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="space-y-1 px-1 pb-1 pt-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {item.name}
          </h3>
          {item.rating !== null && (
            <span className="flex shrink-0 items-center gap-0.5 text-xs text-gray-700">
              <span className="text-yellow-400">★</span>
              {item.rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="flex items-center gap-1 text-xs text-gray-400">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-app-primary" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {item.city}
        </p>
      </div>
    </Link>
  );
}