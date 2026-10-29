export interface FavoriteItem {
  id: number;
  title: string;
  image?: string | null;
  price?: string | number;
  type?: string;
}

export interface FavoritesResponse {
  success: boolean;
  message: string | null;
  data: {
    hotels: FavoriteItem[];
    tours: FavoriteItem[];
    rooms: FavoriteItem[];
    cars: FavoriteItem[];
  };
}

// 2. دالة جلب المفضلة
export async function getFavorites(token: string): Promise<FavoritesResponse> {
  const baseUrl = process.env.NEXT_BASE_API_URL || process.env.API;
  const url = `${baseUrl}/favorites`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch favorites (${res.status})`);
  }

  const json = await res.json();
  return json;
}

export async function toggleFavorite(token: string, itemId: number | string, itemType: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API;
  const url = `${baseUrl}/favorites/toggle`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ item_id: itemId, type: itemType }),
  });

  if (!res.ok) {
    throw new Error(`Failed to toggle favorite (${res.status})`);
  }

  return await res.json();
}