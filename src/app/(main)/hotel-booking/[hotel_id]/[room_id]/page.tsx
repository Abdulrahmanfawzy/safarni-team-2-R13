import { Suspense } from "react";
import RoomDetailsTabs from "../../_components/roomDetails/RoomDetailsTabs";
import BookRoom from "../../_components/BookRoom";
import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import { getRoomDetails } from "@/api/hotel.api";
import RoomTabsSkeleton from "@/components/skeletons/RoomTabsSkeleton";

const RoomDetails = async ({
  params,
}: {
  params: Promise<{ hotel_id: string; room_id: string }>;
}) => {
  const { room_id } = await params;

  return (
    <Suspense fallback={<RoomTabsSkeleton />}>
      <ServerDataFetcher fetcherFn={() => getRoomDetails(room_id)}>
        {(payload) => {
          const room = payload?.data;
          return (
            <>
              {room && (
                <div>
                  <RoomDetailsTabs room={room} />
                </div>
              )}
              <div className="flex flex-col mt-4 gap-3">
                <p className="text-gray-900 text-2xl font-normal">
                  Total price :{" "}
                  <span className="text-app-primary font-semibold">
                    ${room?.header?.final_price_per_night}
                  </span>
                  /night
                </p>
                <BookRoom />
              </div>
            </>
          );
        }}
      </ServerDataFetcher>
    </Suspense>
  );
};

export default RoomDetails;
