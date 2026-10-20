"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRICE_MAX, PRICE_MIN } from "@/constants/tours";
import type { AdventureStyle, SortKey } from "@/constants/tours";
import { DEFAULT_FILTERS } from "@/lib/filter-tours";
import type { TourFilters } from "@/lib/filter-tours";

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function useTourFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const filters: TourFilters = useMemo(
    () => ({
      q: params.get("q") ?? "",
      sort: (params.get("sort") as SortKey | null) ?? "",
      min: Number(params.get("min") ?? PRICE_MIN),
      max: Number(params.get("max") ?? PRICE_MAX),
      styles: list(params.get("styles")) as AdventureStyle[],
      locations: list(params.get("locations")),
      ratings: list(params.get("ratings")).map(Number),
    }),
    [params]
  );

  const setFilters = useCallback(
    (next: Partial<TourFilters>) => {
      const merged = { ...filters, ...next };
      const sp = new URLSearchParams();

      if (merged.q) sp.set("q", merged.q);
      if (merged.sort) sp.set("sort", merged.sort);
      if (merged.min !== PRICE_MIN) sp.set("min", String(merged.min));
      if (merged.max !== PRICE_MAX) sp.set("max", String(merged.max));
      if (merged.styles.length) sp.set("styles", merged.styles.join(","));
      if (merged.locations.length) sp.set("locations", merged.locations.join(","));
      if (merged.ratings.length) sp.set("ratings", merged.ratings.join(","));

      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, pathname, router]
  );

  const reset = useCallback(
    () => router.replace(pathname, { scroll: false }),
    [pathname, router]
  );

  return { filters, setFilters, reset, defaults: DEFAULT_FILTERS };
}