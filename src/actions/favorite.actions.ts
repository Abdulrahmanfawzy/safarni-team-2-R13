"use server";

import { revalidatePath } from "next/cache";
import { getAccessToken } from "@/lib/getAccessToken";
import { getFavorites, toggleFavorite } from "@/api/favorite.api";

async function getToken(): Promise<string> {
  return (await getAccessToken()) ?? "";
}

export async function getFavoritesAction() {
  const token = await getToken();
  if (!token) return { success: false as const, error: "unauthenticated" };

  try {
    const data = await getFavorites(token);
    return { success: true as const, data: data.data };
  } catch (error) {
    console.error("Error in getFavoritesAction:", error);
    return { success: false as const, error: "فشل في جلب البيانات المفضلة" };
  }
}

export async function toggleFavoriteAction(
  itemId: number | string,
  itemType: string,
) {
  const token = await getToken();
  console.log("toggleFavoriteAction:", { itemId, itemType, hasToken: !!token });

  if (!token) return { success: false as const, error: "unauthenticated" };

  try {
    const json = await toggleFavorite(token, itemId, itemType);
    revalidatePath("/favorites");
    return { success: true as const, isFavorite: !!json?.data?.is_favorite };
  } catch (error) {
    console.error("toggleFavoriteAction error:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "toggle failed",
    };
  }
}