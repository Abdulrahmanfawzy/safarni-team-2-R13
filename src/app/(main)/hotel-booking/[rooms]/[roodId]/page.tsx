import ReturnBack from "@/app/(auth)/_components/ReturnBack";
import Gallery from "../../_components/roomDetails/Gallery";
import Badge from "@/components/shared/Badge";
import { StarIcon } from "lucide-react";
import RoomDetailsTabs from "../../_components/roomDetails/RoomDetailsTabs";
import { Button } from "@/components/ui/button";

const RoomDetails = async () => {
  return (
    <>
      {/* Search */}
      <div className="flex items-center gap-3">
        <ReturnBack />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Gallery />
        </div>

        {/* room details */}
        <div className="flex flex-col gap-7 px-8">
          {/* badge and rating */}
          <div className="flex justify-between items-center">
            <Badge>20%Off</Badge>

            <p className="flex items-center gap-1">
              <StarIcon
                fill="oklch(79.5% 0.184 86.047)"
                className="text-yellow-500 size-5"
              />
              <span className="block text-gray-500 font-semibold text-base">
                4.5(356 reviews)
              </span>
            </p>
          </div>

          {/* title and description */}
          <div className="space-y-2">
            <h2 className="text-gray-900 text-3xl font-medium">
              HarborHaven HIdeaway
            </h2>
            <p className=" text-gray-500 font-normal text-base">
              1012 oscean avanue, New Yourk ,USA
            </p>
          </div>

          {/* tabs */}
          <div>
            <RoomDetailsTabs />
          </div>

          {/* Actions */}
          <div className="flex flex-col  gap-3">
            <p className="text-gray-900 text-2xl font-normal">
              Total price :{" "}
              <span className="text-app-primary font-semibold">$150.00</span>
              /night
            </p>

            <Button type="button">Book Now</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
