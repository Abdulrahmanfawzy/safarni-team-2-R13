"use client";
import { BackButton } from "@/components/shared/BackButton";
import CompareCard from "./_components/CompareCard";
import ComparePriceCard from "./_components/ComparePriceCard";
import SearchBar from "@/components/shared/search-bar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ComparePage = () => {
  const [compare, setCompare] = useState("");
  const router = useRouter();

  const hasSearch = compare.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="flex items-center gap-3">
        <BackButton onClick={() => router.push("/")} />
        <SearchBar value={compare} onChange={setCompare} autoFocus />
      </div>

      {hasSearch ? (
        <>
          {/* Compare Items */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CompareCard key={item} />
            ))}
          </div>

          {/* Compare Prices */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium text-gray-900">Compare</h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ComparePriceCard key={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Start comparing
          </h2>
          <p className="max-w-md text-sm text-gray-500">
            Search for an item to compare its details and prices.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
