import { Hotel } from "@/types/hotel.type";
import HotelCard from "../HotelCard";

export default function RecomndedSection({ items }: { items: Hotel[] }) {
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center text-gray-700">
        No recommended hotels found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items?.map((item) => (
        <HotelCard key={item.id} item={item} variant="vertical" />
      ))}
    </div>
  );
}
