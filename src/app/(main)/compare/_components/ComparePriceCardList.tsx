import ComparePriceCard from "./ComparePriceCard";
import { SelectedTourResponse } from "@/types/compare.type";

export default async function ComparePriceCardList({
  selctedTours,
}: {
  selctedTours: SelectedTourResponse["items"];
}) {
  if (selctedTours.length === 0) {
    return <p className="text-center text-sm text-gray-500">No tours found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {selctedTours.map((item) => (
        <ComparePriceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
