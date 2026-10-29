import MapPage from "../../_components/MapPageClient";

type MapRouteProps = {
  searchParams: Promise<{
    lat?: string;
    lng?: string;
    address?: string;
    carName?: string;
    image?: string;
    transmission?: string;
    seats?: string;
    fuel?: string;
    hourlyRent?: string;
    dailyRent?: string;
  }>;
};

export default async function Page({ searchParams }: MapRouteProps) {
  const params = await searchParams;

  const parsedLatitude = Number(params.lat);
  const parsedLongitude = Number(params.lng);

  const hasValidCoordinates =
    params.lat !== undefined &&
    params.lng !== undefined &&
    params.lat.trim() !== "" &&
    params.lng.trim() !== "" &&
    Number.isFinite(parsedLatitude) &&
    Number.isFinite(parsedLongitude) &&
    parsedLatitude >= -90 &&
    parsedLatitude <= 90 &&
    parsedLongitude >= -180 &&
    parsedLongitude <= 180;

  return (
    <MapPage
      latitude={hasValidCoordinates ? parsedLatitude : 24.7136}
      longitude={hasValidCoordinates ? parsedLongitude : 46.6753}
      address={params.address || "Car pickup location"}
      carName={params.carName || "Selected rental car"}
      image={params.image}
      transmission={params.transmission}
      seats={params.seats}
      fuel={params.fuel}
      hourlyRent={params.hourlyRent}
      dailyRent={params.dailyRent}
    />
  );
}
