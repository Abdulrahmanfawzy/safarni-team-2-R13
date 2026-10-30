import { Room } from "@/types/hotel.type";
import RoomCard from "../RoomCard";

export default function HotelRoomsList({ items }: { items: Room[] }) {
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center">
        No rooms available.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items?.map((item) => {
        return <RoomCard item={item} key={item.id} variant="vertical" />;
      })}
    </div>
  );
}
