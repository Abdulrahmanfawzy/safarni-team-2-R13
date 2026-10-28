import { CompareTourResponse } from "@/types/compare.type";
import CompareCard from "./CompareCard";

export default async function CompareCardList({
  tourCards,
}: {
  tourCards: CompareTourResponse["items"];
}) {
  // if result is empty
  if (tourCards.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        No tours found. Try another search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {tourCards.map((item) => (
        <CompareCard key={item.id} item={item} />
      ))}
    </div>
  );
}
