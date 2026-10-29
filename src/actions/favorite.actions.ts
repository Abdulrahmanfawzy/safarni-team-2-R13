"use server";

import { getFavorites } from "@/api/favorite.api";

export async function getFavoritesAction(token: string) {
  try {
    const data = await getFavorites(token);
    // إرجاع البيانات كما هي مباشرة دون تقسيمها مفردة
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in getFavoritesAction:", error);
    return { success: false, error: "فشل في جلب البيانات المفضلة" };
  }
}