import CompareCard from "./_components/CompareCard";
import ComparePriceCard from "./_components/ComparePriceCard";
import CompareSearch from "./_components/CompareSearch";

const ComparePage = () => {
  return (
    <>
      {/* Search for comapre */}
      <CompareSearch />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4, 5, 6].map((_, i) => {
          return <CompareCard key={i} />;
        })}
      </div>

      {/* Compare price */}
      <div className="flex flex-col gap-4">
        <h2 className="text-gray-900 text-2xl font-medium">Compare</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((_, i) => {
            return <ComparePriceCard key={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ComparePage;
