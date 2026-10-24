"use client";

import { useState } from "react";
import {
  ADVENTURE_STYLES,
  PRICE_MAX,
  PRICE_MIN,
  SORT_OPTIONS,
  TOURS,
} from "@/constants/tours";
import type { AdventureStyle } from "@/constants/tours";
import { DEFAULT_FILTERS, filterTours } from "@/lib/filter-tours";
import type { TourFilters } from "@/lib/filter-tours";
import BudgetRange from "@/components/shared/BudgetRange";

interface FilterPanelProps {
  initial: TourFilters;
  onApply: (filters: TourFilters) => void;
  onClose: () => void;
}

const chip = (active: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs transition ${
    active
      ? "border-blue-300 bg-blue-50 text-app-primary"
      : "border-gray-200 text-gray-500 hover:border-gray-300"
  }`;

const toggle = <T,>(arr: T[], v: T) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

export default function FilterPanel({
  initial,
  onApply,
  onClose,
}: FilterPanelProps) {
  const [draft, setDraft] = useState<TourFilters>(initial);
  const [locInput, setLocInput] = useState("");

  const count = filterTours(TOURS, draft).length;

  const addLocation = () => {
    const v = locInput.trim();
    if (v && !draft.locations.includes(v)) {
      setDraft({ ...draft, locations: [...draft.locations, v] });
    }
    setLocInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-xl space-y-6 overflow-y-auto rounded-2xl bg-white p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-gray-500 hover:text-gray-900"
        >
          ←
        </button>

        {/* Sort */}
        <section>
          <h4 className="mb-3 text-sm font-semibold">Sort By</h4>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={chip(draft.sort === o.value)}
                onClick={() =>
                  setDraft({
                    ...draft,
                    sort: draft.sort === o.value ? "" : o.value,
                  })
                }
              >
                {o.label}
              </button>
            ))}
          </div>
        </section>

        {/* Budget */}
        <section>
          <h4 className="mb-3 text-sm font-semibold">Budget Range</h4>
          <BudgetRange
            min={PRICE_MIN}
            max={PRICE_MAX}
            low={draft.min}
            high={draft.max}
            onChange={({ min, max }) => setDraft({ ...draft, min, max })}
          />
        </section>

        {/* Style */}
        <section>
          <h4 className="mb-3 text-sm font-semibold">
            Adventure Style{" "}
            <span className="font-normal text-gray-400">Multi Select</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ADVENTURE_STYLES.map((s: AdventureStyle) => (
              <button
                key={s}
                type="button"
                className={chip(draft.styles.includes(s))}
                onClick={() =>
                  setDraft({ ...draft, styles: toggle(draft.styles, s) })
                }
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Location */}
        <section>
          <h4 className="mb-3 text-sm font-semibold">Location</h4>
          <input
            value={locInput}
            onChange={(e) => setLocInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addLocation();
              }
            }}
            placeholder="Search... then press Enter"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-app-primary"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {draft.locations.map((l: string) => (
              <button
                key={l}
                type="button"
                className={chip(true)}
                onClick={() =>
                  setDraft({
                    ...draft,
                    locations: draft.locations.filter((x: string) => x !== l),
                  })
                }
              >
                ✕ {l}
              </button>
            ))}
          </div>
        </section>

        {/* Rating */}
        <section>
          <h4 className="mb-3 text-sm font-semibold">
            Rating{" "}
            <span className="font-normal text-gray-400">Multi Select</span>
          </h4>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                className={`flex-1 ${chip(draft.ratings.includes(r))}`}
                onClick={() =>
                  setDraft({ ...draft, ratings: toggle(draft.ratings, r) })
                }
              >
                ☆ {r}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setDraft(DEFAULT_FILTERS)}
            className="flex-1 rounded-lg border border-app-primary py-2.5 text-sm text-app-primary"
          >
            Clear All
          </button>
          <button
  type="button"
  onClick={() => onApply(draft)}
  className="flex-1 rounded-lg bg-app-primary py-2.5 text-sm text-white"
>
  {count} Tours Found
</button>
        </div>
      </div>
    </div>
  );
}