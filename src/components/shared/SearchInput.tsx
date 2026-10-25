"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  paramKey: string;
}

const SearchInput = ({
  placeholder = "Search...",
  paramKey,
}: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get(paramKey) ?? "");

  const setParams = (inputValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimValue = inputValue.trim();

    if (trimValue) {
      params.set(paramKey, trimValue);
    } else {
      params.delete(paramKey);
    }

    const query = params.toString();
    console.log("query param= ", query);

    const url = query ? `?${query}` : pathname;

    router.replace(url);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        setParams(value);
      }}
      className="flex flex-1 items-center gap-2 rounded-xl border border-app-primary/30 bg-white px-3 py-2.5 focus-within:border-app-primary"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-app-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setParams(value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            setParams("");
          }}
          aria-label="Clear search"
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </form>
  );
};

export default SearchInput;
