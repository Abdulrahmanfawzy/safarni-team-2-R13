import { selectedTours } from "@/actions/compare.action";
import ComparePriceCard from "./ComparePriceCard";

export default async function ComparePriceCardList({
  tourIds,
}: {
  tourIds: string[];
}) {
  const result = await selectedTours(tourIds);

  if (!result.success) {
    return <p className="text-center text-red-500">{result.message}</p>;
  }

  if (result?.data?.items.length === 0) {
    return <p className="text-center text-sm text-gray-500">No tours found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {result?.data?.items.map((item) => (
        <ComparePriceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
