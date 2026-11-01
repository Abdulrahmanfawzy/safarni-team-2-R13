import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";

import { getFavoritesAction } from "@/actions/favorite.actions";
import FavoriteButton from "@/components/shared/FavoriteButton";
import {BackButton} from "@/components/shared/BackButton";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&auto=format&fit=crop&q=80";

// الحقول بتختلف حسب نوع العنصر (tour / hotel / room / car)
function getTitle(item: any): string {
  return (
    item.title ||
    item.name ||
    [item.brand, item.model].filter(Boolean).join(" ") ||
    item.car_name ||
    item.hotel_name ||
    "Untitled"
  );
}

function getPrice(item: any): string | number | null {
  return (
    item.price ??
    item.price_per_day ??
    item.price_per_night ??
    item.daily_price ??
    item.starting_price ??
    null
  );
}

function getPriceUnit(type: string): string {
  if (type === "car") return "Per Day";
  if (type === "hotel" || type === "room") return "Per Night";
  return "Per Person";
}

function getLabel(item: any, type: string): string {
  const labels: Record<string, string> = {
    tour: "Tour Experience",
    hotel: "Hotel",
    room: "Room",
    car: "Car Rental",
  };
  return item.category || item.type || labels[type] || "Experience";
}

async function FavoritesGrid() {
  const res = await getFavoritesAction();

  if (!res.success && res.error === "unauthenticated") {
    return (
      <div className="py-20 text-center text-slate-600">
        Please{" "}
        <Link href="/login" className="text-blue-600 underline">
          login
        </Link>{" "}
        to see your favorites.
      </div>
    );
  }

  const favorites =
    res.success && res.data
      ? [
          ...(res.data.hotels || []).map((i) => ({ ...i, _type: "hotel" })),
          ...(res.data.tours || []).map((i) => ({ ...i, _type: "tour" })),
          ...(res.data.rooms || []).map((i) => ({ ...i, _type: "room" })),
          ...(res.data.cars || []).map((i) => ({ ...i, _type: "car" })),
        ]
      : [];

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-slate-100 bg-white py-20 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <Heart className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Favorites Yet</h3>
        <p className="max-w-sm text-sm text-slate-500">
          You haven&apos;t added any favorite places or tours yet. Explore and
          save your favorite experiences!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {favorites.map((item: any) => {
        const price = getPrice(item);
        return (
          <div
            key={`${item._type}-${item.id}`}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={item.image || item.photo || FALLBACK_IMAGE}
                alt={getTitle(item)}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <FavoriteButton
                id={item.id}
                type={item._type}
                initialFavorite
                className="absolute right-3 top-3 h-8 w-8"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {getTitle(item)}
                </h3>
                <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-800">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating || "4.5"}</span>
                </div>
              </div>

              <div className="pt-1 text-xs text-slate-500">
                {getLabel(item, item._type)}
              </div>

              <div className="border-t border-slate-100 pt-3 text-xs text-slate-500">
                {price !== null ? (
                  <>
                    From{" "}
                    <span className="text-sm font-bold text-blue-600">
                      ${price}
                    </span>{" "}
                    {getPriceUnit(item._type)}
                  </>
                ) : (
                  <span>Price not available</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function FavoritePage() {
  return (
    <div className="mt-5 min-h-screen px-4 font-sans text-slate-800 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="relative mb-8 flex items-center justify-between">
          <BackButton path="/" />
          <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-slate-900">
            Favorite
          </h1>
          <div className="w-10" />
        </div>

        <Suspense fallback={null}>
          <FavoritesGrid />
        </Suspense>
      </div>
    </div>
  );
}