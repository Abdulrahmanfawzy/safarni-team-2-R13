import Badge from "@/components/shared/Badge";
import Gallery from "../../_components/roomDetails/Gallery";
import { StarIcon } from "lucide-react";
import { BackButton } from "@/components/shared/BackButton";

const HotelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Search */}
      <div className="flex items-center ">
        <BackButton />
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
        <div>
          <Gallery />
        </div>

        {/* room details */}
        <div className="flex flex-col gap-7 md:px-8">
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
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default HotelLayout;
