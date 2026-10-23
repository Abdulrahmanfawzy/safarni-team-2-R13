import Title from "./_components/Title";
import HotelCard from "./_components/HotelCard";
import cardImage from "@/assets/images/hotel.jpg";
const ComparePage = async (props: any) => {
  const { searchParam } = await props.searchParams;
  console.log("server search param", searchParam);

  return (
    <div className="flex flex-col gap-8">
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
