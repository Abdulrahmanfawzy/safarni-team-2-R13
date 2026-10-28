"use server";

import type { Place } from "@/constants/places";

const API = "https://safarni-round-13.huma-volve.com/api";
 
const SUGGESTIONS_PATH = "/search/suggestions";

interface DestinationDto {
  id: number;
  name: string;
  country: string;
  tagline: string | null;
}

export async function getSuggestions(q: string): Promise<Place[]> {
  try {
    const res = await fetch(
      `${API}${SUGGESTIONS_PATH}?q=${encodeURIComponent(q.trim())}`,
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );
    if (!res.ok) return [];

    const json = await res.json();
    const items: DestinationDto[] = json?.data?.destination ?? [];

     
    const seen = new Set<string>();
    return items
      .filter((d) => {
        const key = `${d.name}-${d.country}`.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((d) => ({
        id: String(d.id),
        name: d.name,
        label: `${d.name}, ${d.country}`,
        tagline: d.tagline ?? undefined,
      }));
  } catch {
    return [];
  }
}