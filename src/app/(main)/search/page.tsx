import { Suspense } from "react";
import SearchView from "./_component/search-view";

export const metadata = { title: "Search | Safarni" };

export default function SearchPage() {

  return (
    <Suspense fallback={<div className="p-8 text-sm text-gray-400">Loading…</div>}>
      <SearchView />
    </Suspense>
  );
}