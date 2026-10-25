import Title from "./_components/Title";
import HotelCard from "./_components/HotelCard";
import cardImage from "@/assets/images/hotel.jpg";
import { BackButton } from "@/components/shared/BackButton";
import SearchInput from "@/components/shared/SearchInput";

const ComparePage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ q: string }>;
}) => {
  const searchParamsValue = await searchParams;
  console.log("server search param", searchParamsValue);

  return (
    <div className="flex flex-col gap-8">
      {/* Search and back button */}
      <div className="flex items-center gap-3">
        <BackButton />
        <SearchInput paramKey="q" />
      </div>
      {/* Recommendation cards  */}
      <div className="space-y-3">
        {/* Header */}
        <Title linkLabel="view all" title="Recommendation" linkPath="/hotels" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, i) => {
            return (
              <HotelCard
                key={i}
                name="Oasis Overture"
                image={cardImage}
                discount={10}
                rating={4.2}
                location="New York, USA"
                variant="vertical"
              />
            );
          })}
        </div>
      </div>

      {/* Nearby Hotel cards*/}
      <div className="space-y-3">
        {/* Header */}
        <Title linkLabel="view all" title="Nearby Hotel" linkPath="/hotels" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2  ">
          {[1, 2, 3, 4].map((_, i) => {
            return (
              <HotelCard
                key={i}
                name="Oasis Overture"
                image={cardImage}
                discount={10}
                rating={4.2}
                location="New York, USA"
                variant="horizontal"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
