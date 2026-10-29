"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Loader2, Search, X } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  paramKey?: string;
  defaultValue?: string;
  debounceMs?: number;
  basePath?: string;
  resetParams?: string[];
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const SearchInput = ({
  placeholder = "Search...",
  paramKey,
  defaultValue,
  debounceMs = 400,
  basePath,
  onChange,
  resetParams,
  onSubmit,
}: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const targetPath = basePath ?? pathname;

  const [value, setValue] = useState(
    defaultValue ?? (paramKey ? (searchParams.get(paramKey) ?? "") : ""),
  );

  // keep the input in sync if the dialog re-opens with a new defaultValue
  useEffect(() => {
    if (defaultValue !== undefined) setValue(defaultValue);
  }, [defaultValue]);

  // debounced URL update — runs whenever paramKey is set, independent of onSubmit
  useEffect(() => {
    if (!paramKey) return;

    const next = value.trim();
    const current =
      targetPath === pathname ? (searchParams.get(paramKey) ?? "") : "";
    if (next === current) return;

    const timer = setTimeout(() => {
      const params =
        targetPath === pathname
          ? new URLSearchParams(searchParams.toString())
          : new URLSearchParams();
      if (next) params.set(paramKey, next);
      else params.delete(paramKey);

      resetParams?.forEach((key) => params.delete(key)); // use to delet params(like on compare page delete toure_id on search is empty or change)

      params.delete("page"); // a new search starts at page 1

      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${targetPath}?${query}` : targetPath, {
          scroll: false,
        });
      });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, searchParams, paramKey, targetPath, pathname, router, debounceMs]);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value.trim());
      }}
      className="flex flex-1 items-center gap-2 rounded-xl border border-app-primary/30 bg-white px-3 py-2.5 focus-within:border-app-primary"
    >
      <Search
        className="h-4 w-4 shrink-0 text-app-primary"
        aria-hidden="true"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
      />

      {isPending ? (
        <Loader2
          className="h-4 w-4 shrink-0 animate-spin text-app-primary"
          aria-label="Searching"
        />
      ) : (
        value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              onChange?.("");
            }}
            aria-label="Clear search"
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )
      )}
    </form>
  );
};

export default SearchInput;
