import Title from "../_components/Title";
import { BackButton } from "@/components/shared/BackButton";
import ServerDataFetcher from "@/components/common/ServerDataFetcher";
import HotelRoomsList from "../_components/sections/HotelRoomsList";
import { getAvailableRooms } from "@/api/hotel.api";
import { Suspense } from "react";
import HotelCardSkeleton from "@/components/skeletons/HotelCardSkeleton";

const page = async ({ params }: { params: Promise<{ hotel_id: string }> }) => {
  const { hotel_id } = await params;
  return (
    <>
      <div className="flex items-center gap-3">
        <BackButton />
      </div>

      <div className="space-y-3">
        <Title title="Available Rooms" />

        <Suspense fallback={<HotelCardSkeleton variant="vertical" />}>
          <ServerDataFetcher fetcherFun={() => getAvailableRooms(hotel_id)}>
            {(payload) => <HotelRoomsList items={payload.data?.rooms ?? []} />}
          </ServerDataFetcher>
        </Suspense>
      </div>
    </>
  );
};

export default page;
