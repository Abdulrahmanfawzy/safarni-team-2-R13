import { Suspense } from "react";
import Badge from "@/components/shared/Badge";
import Gallery from "../../_components/roomDetails/Gallery";
import { StarIcon } from "lucide-react";
import { BackButton } from "@/components/shared/BackButton";
import { getRoomDetails } from "@/api/hotel.api";

import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import RoomDetailsSkeleton from "@/components/skeletons/RoomDetailsSkeleton";

const RoomLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ hotel_id: string; room_id: string }>;
}) => {
  const { room_id } = await params;

  return (
    <>
      <div className="flex items-center">
        <BackButton />
      </div>

      <Suspense fallback={<RoomDetailsSkeleton />}>
        <ServerDataFetcher fetcherFn={() => getRoomDetails(room_id)}>
          {(payload) => {
            const header = payload?.data?.header;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
                <div>
                  <Gallery images={payload?.data?.gallery?.photos} />
                </div>

                <div className="flex md:max-h-165 md:h-auto overflow-y-scroll flex-col gap-7 md:px-8">
                  <div className="flex justify-between items-center">
                    <Badge>{header?.discount_badge}</Badge>
                    <p className="flex items-center gap-1">
                      <StarIcon
                        fill="oklch(79.5% 0.184 86.047)"
                        className="text-yellow-500 size-5"
                      />
                      <span className="block text-gray-500 font-semibold text-base">
                        {header?.rating}({header?.reviews_count} reviews)
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-gray-900 text-3xl font-medium">
                      {header?.name}
                    </h2>
                    <p className="text-gray-500 font-normal text-base">
                      {header?.address}
                    </p>
                  </div>

                  <div>{children}</div>
                </div>
              </div>
            );
          }}
        </ServerDataFetcher>
      </Suspense>
    </>
  );
};

export default RoomLayout;
