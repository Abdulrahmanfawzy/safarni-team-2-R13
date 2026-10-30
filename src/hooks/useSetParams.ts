import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export const useSetParams = (paramKey: string, relatedParamKey?: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const allParam = searchParams.getAll(paramKey);

  function setParam(id: string, mode: "append" | "set" = "append") {
    const params = new URLSearchParams(searchParams.toString());

    if (allParam.includes(id)) {
      params.delete(paramKey);

      allParam
        .filter((selectedId) => selectedId !== id)
        .forEach((selectedId) => params.append(paramKey, selectedId));

      // Remove related param if it belongs to the removed ID
      if (params.get(relatedParamKey ?? "") === id) {
        params.delete(relatedParamKey!);
      }
    } else if (mode === "set") {
      params.set(paramKey, id);
    } else {
      params.append(paramKey, id);
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  }

  return {
    allParam,
    setParam,
    isPending,
  };
};
