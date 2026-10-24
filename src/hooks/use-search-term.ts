"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useSearchParam(key: string, defaultValue = "") {
  const params = useSearchParams();
  const value = params.get(key) ?? defaultValue;

  const setValue = useCallback(
    (next?: string | null) => {
      const sp = new URLSearchParams(window.location.search);
      if (next) sp.set(key, next);
      else sp.delete(key);

      const qs = sp.toString();
      window.history.replaceState(
        null,
        "",
        (qs ? `${window.location.pathname}?${qs}` : window.location.pathname) +
          window.location.hash
      );
    },
    [key]
  );

  return [value, setValue] as const;
}

export function useSearchTerm() {
  const [term, setTerm] = useSearchParam("term");
  return { term, setTerm };
}