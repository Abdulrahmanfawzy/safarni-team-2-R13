import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

export interface TourRowItem {
  id: string | number;
  type: string;
  place: string;
  image: string | StaticImageData | null;
  rating: number | null;
  price: number;
}

export default function TourRowCard({ tour }: { tour: TourRowItem }) {
  return (
    <Link
      href={`/destination/${tour.id}`}
      className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
    >
      <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
        {tour.image && (
          <Image
            src={tour.image}
            alt={tour.place}
            fill
            sizes="64px"
            className="object-cover"
          />
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">{tour.type}</span>
          {tour.rating !== null && (
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-gray-700">
              <span className="text-yellow-400">★</span>
              {tour.rating.toFixed(1)}
            </span>
          )}
        </div>
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {tour.place}
        </h3>
        <p className="text-[10px] text-gray-500">
          From{" "}
          <span className="font-semibold text-app-primary">{tour.price}$</span>{" "}
          Per Person
        </p>
      </div>
    </Link>
  );
}