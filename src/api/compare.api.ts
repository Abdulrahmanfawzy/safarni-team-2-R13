import { CompareTourResponse } from "@/types/compare.type";
import { ApiResponse } from "@/types/global.type";

export const getToursSearch = async (
  searchValue: string,
): Promise<ApiResponse<CompareTourResponse>> => {
  try {
    const res = await fetch(
      `${process.env.API}/v1/compare/tours?search=${searchValue}`,
      {
        cache: "force-cache",
      },
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "fetch failed.");
    }

    return data;
  } catch (error) {
    console.error("compare Tours Search error", error);
    throw new Error("fetch failed.");
  }
};
