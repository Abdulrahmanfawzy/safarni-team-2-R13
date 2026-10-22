"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

 
export function useSearchTerm() {
  const params = useSearchParams();
  const term = params.get("term") ?? "";

  const setTerm = useCallback((value: string) => {
    const sp = new URLSearchParams(window.location.search);
    if (value) sp.set("term", value);
    else sp.delete("term");

    const qs = sp.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    );
  }, []);

  return { term, setTerm };
}