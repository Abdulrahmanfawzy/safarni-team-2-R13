"use server";

import { searchTours } from "@/api/tours";
import type { Place } from "@/constants/places";

export async function searchToursAction(term: string): Promise<Place[]> {
  const { items } = await searchTours(term, 6);

  return items.map((t) => ({
    id: String(t.id),
    name: t.title,
    label: t.title,
    tagline: t.duration_text,
  }));
}