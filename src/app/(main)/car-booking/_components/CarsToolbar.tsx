"use client";

import { useState } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";

type CarsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function CarsToolbar({
  search,
  onSearchChange,
}: CarsToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          <ArrowLeft className="size-4" />
        </button>

        {/* <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search ..."
        /> */}

        <button
          type="button"
          aria-label="Toggle filters"
          aria-expanded={showFilters}
          onClick={() => setShowFilters((current) => !current)}
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </div>

      {showFilters && (
        <div className="mt-3 rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <p className="font-medium text-slate-900">Quick filters</p>
          <p className="mt-1">Search by car model using the search field.</p>
        </div>
      )}
    </div>
  );
}
