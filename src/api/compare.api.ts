import { CompareTourResponse } from "@/types/compare.type";
import { ApiResponse } from "@/types/global.type";

export const compareToursSearch = async (
  searchValue: string,
): Promise<
  | ApiResponse<CompareTourResponse>
  | {
      message: string;
      success: boolean;
    }
> => {
  try {
    const res = await fetch(
      `${process.env.API}/v1/compare/tours?search=${searchValue}`,
      {
        cache: "force-cache",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }
    return data;
  } catch (error: any) {
    console.error("compare Tours Search error", error);
    throw new Error(error?.message);
  }
};
