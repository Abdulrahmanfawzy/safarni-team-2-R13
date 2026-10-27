import type { Place } from "@/constants/places";
import { Landmark, MapPin } from "lucide-react";

interface PlaceListProps {
  places: Place[];
  variant: "popular" | "suggestion";
  onSelect: (place: Place) => void;
}

export default function PlaceList({
  places,
  variant,
  onSelect,
}: PlaceListProps) {
  return (
    <ul className="space-y-1">
      {places.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            onClick={() => onSelect(p)}
            className="flex w-full items-center gap-4 rounded-xl px-2 py-2.5 text-left transition hover:bg-gray-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-app-primary/10 text-app-primary">
              {variant === "popular" ? (
                <Landmark className="h-6 w-6" strokeWidth={1.5} />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
            </span>

            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-gray-900">
                {p.label}
              </span>
              {p.tagline && (
                <span className="block text-[11px] text-gray-400">
                  {p.tagline}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}