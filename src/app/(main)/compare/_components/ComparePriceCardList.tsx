"use client";
import { Button } from "@/components/ui/button";
import ComparePriceCard from "./ComparePriceCard";
import { SelectedTourResponse } from "@/types/compare.type";
import useCompareCheckout from "@/hooks/useCompareCheckout";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ComparePriceCardList({
  selctedTours,
  tour_plane,
}: {
  selctedTours: SelectedTourResponse["items"];
  tour_plane: string[];
}) {
  const { isPending, mutate } = useCompareCheckout();
  const session = useSession();
  const router = useRouter();

  if (selctedTours.length === 0) {
    return <p className="text-center text-sm text-gray-500">No tours found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {selctedTours.map((item) => (
          <ComparePriceCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Button
          onClick={() => {
            if (session.status === "unauthenticated") {
              toast.info("please login befor booking");
              router.push("/login");
            }

            const payload = {
              email: session.data?.user?.email ?? "",
              full_name: session.data?.user?.name ?? "",
              tour_id: tour_plane[0],
            };
            mutate(payload, {
              onSuccess: function (data) {
                toast.success(data.message);
                if (!data.data?.payment) {
                  toast.error(data.message || "payment faild");
                  return;
                }
                window.location.href = data?.data?.payment?.checkout_url;
              },
              onError: function (error) {
                console.log(error);
                toast.error(error.message || "payment faild");
              },
            });
          }}
          disabled={isPending || !tour_plane[0]}
          isLoading={isPending}
        >
          Check Out
        </Button>
      </div>
    </>
  );
}
