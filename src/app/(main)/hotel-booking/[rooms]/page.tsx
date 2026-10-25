import HotelCard from "../_components/HotelCard";
import roomImage from "@/assets/images/room.jpg";
import Title from "../_components/Title";
import ReturnBack from "@/app/(auth)/_components/ReturnBack";

const HotelRooms = async () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <ReturnBack />
      </div>

      <div className="space-y-3">
        <Title title="Available Rooms" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
            return (
              <HotelCard
                key={i}
                name="Hidden Haven"
                image={roomImage}
                roomPrice="200"
                variant="vertical"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HotelRooms;
