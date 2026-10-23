import type { Place } from "@/constants/places";
import { MapPin } from "lucide-react";

interface PlaceListProps {
  places: Place[];
  /** "popular" = landmark icon + tagline, "suggestion" = pin icon */
  variant: "popular" | "suggestion";
  onSelect: (place: Place) => void;
}

function LandmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6" />
    </svg>
  );
}

// function PinIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       className="h-5 w-5"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
//       <circle cx="12" cy="10" r="2.5" />
//     </svg>
//   );
// }

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
              {variant === "popular" ? <LandmarkIcon /> : <MapPin />} 
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
