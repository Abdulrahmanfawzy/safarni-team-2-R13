import { compareToursSearch } from "@/api/compare.api";
import CompareCard from "./CompareCard";

export default async function CompareCardList({
  searchValue,
}: {
  searchValue: string;
}) {
  // call api request
  const result = await compareToursSearch(searchValue);

  // if result is empty
  if (result?.data?.items.length === 0) {
    return (
      <>
        <p className="text-center text-sm text-gray-500">
          No tours found. Try another search.
        </p>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {result?.data?.items.map((item) => (
        <CompareCard key={item.id} item={item} />
      ))}
    </div>
  );
}
