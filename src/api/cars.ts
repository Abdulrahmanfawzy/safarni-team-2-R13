import type {
  Car,
  CarApiBrand,
  CarApiImage,
  CarApiItem,
  CarBrand,
  CarsApiData,
  CarsApiResponse,
} from "@/types/car.types";
import type {
  CarDetailsApiItem,
  CarDetailsApiResponse,
} from "@/types/car.types";

export async function getCars(limit = 10): Promise<CarsApiData> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("The API environment variable is not configured.");
  }

  const url = new URL(`${baseUrl.replace(/\/$/, "")}/cars`);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cars: ${response.status}`);
  }

  const result: CarsApiResponse = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.message || "Invalid cars API response.");
  }

  if (!Array.isArray(result.data.cars)) {
    throw new Error(
      "The cars API response does not contain a valid cars list.",
    );
  }

  return {
    ...result.data,
    cars: result.data.cars,
    brands: Array.isArray(result.data.brands) ? result.data.brands : [],
  };
}

function getImageUrl(image: CarApiImage | null | undefined): string | null {
  if (typeof image === "string") {
    return image.trim() || null;
  }

  if (image && typeof image === "object") {
    return image.url ?? image.path ?? image.image ?? null;
  }

  return null;
}

function getCarImage(item: CarApiItem): string {
  const firstImage = item.images?.find((image) => Boolean(getImageUrl(image)));
  const image = getImageUrl(firstImage) ?? item.image;

  return (
    image ||
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=85"
  );
}

export function mapCarToUi(item: CarApiItem): Car {
  const name = item.name ?? item.model ?? item.title ?? "Car";

  return {
    id: String(item.id),
    name,
    transmission: item.transmission ?? "Not specified",
    seats: Number(item.seats ?? 0),
    fuel: item.fuel ?? item.fuel_type ?? "Not specified",
    image: getCarImage(item),
    imageAlt: `${name} rental car`,
    brand: item.brand?.name ?? "Other",
  };
}

export function mapBrandToUi(
  apiBrands: CarApiBrand[],
  cars: Car[],
): CarBrand[] {
  const carCounts = new Map<string, number>();

  for (const car of cars) {
    const key = car.brand.trim().toLowerCase();
    carCounts.set(key, (carCounts.get(key) ?? 0) + 1);
  }

  const uniqueBrands = new Map<string, CarBrand>();

  for (const brand of apiBrands) {
    const name = brand.name?.trim();

    if (!name) continue;

    const key = name.toLowerCase();

    if (uniqueBrands.has(key)) continue;

    uniqueBrands.set(key, {
      name,
      count:
        brand.count ??
        brand.cars_count ??
        brand.total_cars ??
        carCounts.get(key) ??
        0,
      mark: name.charAt(0).toUpperCase(),
    });
  }

  return Array.from(uniqueBrands.values());
}

export async function getCarDetails(
  carId: string | number,
): Promise<CarDetailsApiItem> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("The API environment variable is not configured.");
  }

  const normalizedId = String(carId).trim();

  if (!normalizedId || !/^\d+$/.test(normalizedId)) {
    throw new Error("A valid car ID is required.");
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/cars/${encodeURIComponent(
    normalizedId,
  )}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to retrieve car details (${response.status}).`);
  }

  const result: CarDetailsApiResponse = await response.json();

  if (!result.success || !result.data?.car) {
    throw new Error(result.message || "Invalid car details response.");
  }

  return result.data.car;
}