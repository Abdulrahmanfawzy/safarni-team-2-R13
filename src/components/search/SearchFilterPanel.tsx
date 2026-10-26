"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterPanel from "@/components/shared/FilterPanel";
import { useTourFilters } from "@/hooks/use-tour-filters";

export default function SearchFilterPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { filters, setFilters } = useTourFilters();

  const close = () => {
    const sp = new URLSearchParams(params.toString());
    sp.delete("filters");
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

 
  return <FilterPanel initial={filters} onApply={setFilters} onClose={close} />;
}