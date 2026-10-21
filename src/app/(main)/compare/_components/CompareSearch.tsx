"use client";
import { BackButton } from "@/components/shared/BackButton";
import SearchBar from "@/components/shared/search-bar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompareSearch = () => {
  const [draft, setDraft] = useState("");
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <BackButton onClick={() => router.push("/")} />
      <SearchBar value={draft} onChange={setDraft} autoFocus />
    </div>
  );
};

export default CompareSearch;
