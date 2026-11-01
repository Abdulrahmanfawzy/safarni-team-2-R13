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

const getBaseUrl = () => process.env.NEXT_BASE_API_URL || process.env.API;

// ⚠️ لو رجع 422 "selected service type is invalid" عدّل القيم دي حسب Postman
const SERVICE_TYPES: Record<string, string> = {
  tour: "tour",
  hotel: "hotel",
  room: "room",
  car: "car",
};

export async function getFavorites(token: string): Promise<FavoritesResponse> {
  const res = await fetch(`${getBaseUrl()}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch favorites (${res.status})`);
  return res.json();
}

export async function toggleFavorite(
  token: string,
  itemId: number | string,
  itemType: string,
) {
  const res = await fetch(`${getBaseUrl()}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      service_type: SERVICE_TYPES[itemType] ?? itemType,
      service_item_id: Number(itemId),
    }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("toggleFavorite failed:", res.status, json);
    throw new Error(
      json?.message || `Failed to toggle favorite (${res.status})`,
    );
  }

  return json;  
}