"use client";
import RoomDetailsTabs from "../../_components/roomDetails/RoomDetailsTabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoomDetails = () => {
  const pathname = usePathname();
  return (
    <>
      {/* tabs */}
      <div>
        <RoomDetailsTabs />
      </div>

      {/* Actions */}
      <div className="flex flex-col mt-4 gap-3">
        <p className="text-gray-900 text-2xl font-normal">
          Total price :{" "}
          <span className="text-app-primary font-semibold">$150.00</span>
          /night
        </p>
        <Link href={pathname + "/book-room"} className="w-full">
          <Button type="button" className={"w-full"}>
            Book Now
          </Button>
        </Link>
      </div>
    </>
  );
};

export default RoomDetails;
