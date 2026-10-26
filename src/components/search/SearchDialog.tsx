"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SearchInput from "@/components/shared/SearchInput";
import PlaceList from "@/components/search/PlaceList";
import { POPULAR_PLACES } from "@/constants/places";
import { searchPlaces } from "@/lib/search-places";

interface SearchDialogProps {
  /** "icon" (default) = just the magnifier, used in the header. "bar" = full-width search-bar look, used on pages like /search. */
  trigger?: "icon" | "bar";
  /** Pre-fills the dialog with the current query, e.g. the ?q= already on the page. */
  initialQuery?: string;
}

export default function SearchDialog({
  trigger = "icon",
  initialQuery = "",
}: SearchDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState(initialQuery);

  const typed = term.trim();
  const suggestions = useMemo(() => searchPlaces(term), [term]);

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
                places={POPULAR_PLACES}
                variant="popular"
                onSelect={(p) => commit(p.name)}
              />
            ) : suggestions.length > 0 ? (
              <PlaceList
                places={suggestions}
                variant="suggestion"
                onSelect={(p) => commit(p.name)}
              />
            ) : (
              <PlaceList
                places={[
                  { id: "typed", name: typed, label: `Search for "${typed}"` },
                ]}
                variant="suggestion"
                onSelect={(p) => commit(p.name)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}