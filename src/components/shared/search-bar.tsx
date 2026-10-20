"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onOpenFilters?: () => void;
  placeholder?: string;
  activeFilterCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  onOpenFilters,
  placeholder = "Search destinations or tours...",
  activeFilterCount = 0,
}: SearchBarProps) {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);

  // debounce so we don't hit the router on every keystroke
  useEffect(() => {
    if (text === value) return;
    const id = setTimeout(() => onChange(text), 300);
    return () => clearTimeout(id);
  }, [text, value, onChange]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 focus-within:border-blue-600">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
        {text && (
          <button type="button" onClick={() => setText("")} aria-label="Clear search" className="text-gray-400">
            ✕
          </button>
        )}
      </div>

      {onOpenFilters && (
        <button
          type="button"
          onClick={onOpenFilters}
          className="relative rounded-xl border border-gray-200 bg-white p-2.5"
          aria-label="Open filters"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-700 text-[10px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}