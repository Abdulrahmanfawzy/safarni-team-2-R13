import { Hotel } from "@/types/hotel.type";
import HotelCard from "../HotelCard";

export default function NearbyHotelsSection({ items }: { items: Hotel[] }) {
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center text-gray-700">
        No recommended hotels found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {items?.map((item) => (
        <HotelCard key={item.id} item={item} variant="horizontal" />
      ))}
    </div>
  );
}
