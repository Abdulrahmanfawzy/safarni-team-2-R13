"use client";

import { useSearchParams } from "next/navigation";

interface SearchBarProps {
  keySearch: string;
}

export default function SearchBar({}: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-1 items-center gap-2 rounded-xl border border-app-primary/30 bg-white px-3 py-2.5 focus-within:border-app-primary"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-app-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </form>
  );
}
