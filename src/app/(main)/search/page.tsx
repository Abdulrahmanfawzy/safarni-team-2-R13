import { Suspense } from "react";
import SearchView from "./search-view";

export const metadata = { title: "Search | Safarni" };

export default function SearchPage() {
  // useSearchParams needs a Suspense boundary in the App Router
  return (
    <Suspense fallback={<div className="p-8 text-sm text-gray-400">Loading…</div>}>
      <SearchView />
    </Suspense>
  );
}