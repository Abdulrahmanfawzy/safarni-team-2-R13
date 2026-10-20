import { PLACE_SUGGESTIONS, POPULAR_PLACES, type Place } from "@/constants/places";

const ALL_PLACES: Place[] = [...POPULAR_PLACES, ...PLACE_SUGGESTIONS];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function searchPlaces(query: string, limit = 6): Place[] {
  const q = normalize(query);
  if (!q) return [];

  const scored = ALL_PLACES.map((p) => {
    const label = normalize(p.label);
    let score = 0;
    if (label.startsWith(q)) score = 3;
    else if (label.split(/[\s,]+/).some((w) => w.startsWith(q))) score = 2;
    else if (label.includes(q)) score = 1;
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.p);
}