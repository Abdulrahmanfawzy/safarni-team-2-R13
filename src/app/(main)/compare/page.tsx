import { BackButton } from "@/components/shared/BackButton";
import CompareCard from "./_components/CompareCard";
import ComparePriceCard from "./_components/ComparePriceCard";
import SearchInput from "@/components/shared/SearchInput";

const ComparePage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const paramsValue = await searchParams;
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <BackButton />
        <SearchInput paramKey="q" />
      </div>

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
    </div>
  );
};

export default ComparePage;
