import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export const useSetTourIdParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const tourIds = searchParams.getAll("tour_id");
  function setTourIds(id: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (tourIds.includes(id)) {
      params.delete("tour_id");

      tourIds
        .filter((selectedId) => selectedId !== id)
        .forEach((selectedId) => params.append("tour_id", selectedId));
    } else {
      params.append("tour_id", id);
    }
    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  }

  return {
    tourIds,
    setTourIds,
    isPending,
  };
};
