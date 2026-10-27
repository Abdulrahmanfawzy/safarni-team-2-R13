"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SearchInput from "@/components/shared/SearchInput";
import PlaceList from "@/components/search/PlaceList";
import { POPULAR_PLACES } from "@/constants/places";
import type { Place } from "@/constants/places";
import { getSuggestions } from "@/actions/SearchSuggestions";

interface SearchDialogProps {
   
  trigger?: "icon" | "bar";
  
  initialQuery?: string;
}

export default function SearchDialog({
  trigger = "icon",
  initialQuery = "",
}: SearchDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState(initialQuery);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const typed = term.trim();

   
  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      const result = await getSuggestions(typed);
      if (!cancelled) {
        setPlaces(result);
        setLoading(false);
      }
    }, typed === "" ? 0 : 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, typed]);

  const openDialog = () => {
    setTerm(initialQuery);
    setOpen(true);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTerm(initialQuery);
  };

  const commit = (query: string) => {
    const value = query.trim();
    if (!value) return;
    handleOpenChange(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  
  const popular = places.length > 0 ? places : POPULAR_PLACES;

  return (
    <>
      {trigger === "icon" ? (
        <button
          type="button"
          onClick={openDialog}
          aria-label="Search"
          className="text-gray-900 transition hover:text-app-primary"
        >
          <Search className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={openDialog}
          className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-500 shadow-sm transition hover:border-gray-300"
        >
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate">
            {initialQuery || "Search destinations..."}
          </span>
        </button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="top-[15%] translate-y-0 pt-12 sm:max-w-xl">
          <DialogTitle className="sr-only">Search</DialogTitle>

          <SearchInput
            paramKey="term"
            placeholder="Search destinations..."
            defaultValue={term}
            onChange={setTerm}
            onSubmit={commit}
          />

          <div className="max-h-[60vh] overflow-y-auto">
            {typed === "" ? (
              <PlaceList
                places={popular}
                variant="popular"
                onSelect={(p) => commit(p.name)}
              />
            ) : places.length > 0 ? (
              <PlaceList
                places={places}
                variant="suggestion"
                onSelect={(p) => commit(p.name)}
              />
            ) : (
              !loading && (
                <PlaceList
                  places={[
                    { id: "typed", name: typed, label: `Search for "${typed}"` },
                  ]}
                  variant="suggestion"
                  onSelect={(p) => commit(p.name)}
                />
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}