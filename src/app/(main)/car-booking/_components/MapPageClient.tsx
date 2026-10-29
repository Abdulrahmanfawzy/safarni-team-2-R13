"use client";

import Image from "next/image";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
export type MapPageProps = {
  latitude: number;
  longitude: number;
  address: string;
  carName: string;
  image?: string;
  transmission?: string;
  seats?: string;
  fuel?: string;
  hourlyRent?: string;
  dailyRent?: string;
};

type Coordinates = [number, number];

function createVisualRoute(latitude: number, longitude: number): Coordinates[] {
  
  return [
    [latitude - 0.00055, longitude - 0.0001],
    [latitude - 0.00055, longitude],
    [latitude - 0.0004, longitude],
    [latitude - 0.0004, longitude - 0.00085],
    [latitude + 0.00045, longitude - 0.00085],
    [latitude + 0.00045, longitude + 0.0004],
    [latitude, longitude],
  ];
}

function RecenterButton({ position }: { position: Coordinates }) {
  const map = useMap();

  return (
    <button
      type="button"
      aria-label="Center map on car location"
      onClick={() => map.flyTo(position, 16, { duration: 0.6 })}
      className="absolute right-4 top-4 z-[1000] flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md"
    >
      <LocateFixed className="size-4" />
    </button>
  );
}

export default function MapPage({
  latitude,
  longitude,
  address,
  carName,
  image,
  transmission = "Automatic",
  seats = "5",
  fuel = "Petrol",
  hourlyRent = "0",
  dailyRent = "0",
}: MapPageProps) {
  const location: Coordinates = [latitude, longitude];
  const route = createVisualRoute(latitude, longitude);

  const carImage =
    image ||
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=85";

  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden">
      <div className="relative h-[calc(100dvh-90px)] min-h-[520px] w-full">
        <MapContainer
          center={location}
          zoom={16}
          zoomControl={false}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Polyline
            positions={route}
            pathOptions={{
              color: "#ff8500",
              weight: 5,
              opacity: 0.95,
              lineCap: "round",
              lineJoin: "round",
            }}
          />

          <CircleMarker
            center={route[0]}
            radius={6}
            pathOptions={{
              color: "#fff",
              weight: 3,
              fillColor: "#28b463",
              fillOpacity: 1,
            }}
          />

          <CircleMarker
            center={location}
            radius={7}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: "#ff8500",
              fillOpacity: 1,
            }}
          />

          <ZoomControl position="bottomright" />
          <RecenterButton position={location} />
        </MapContainer>

        <div className="pointer-events-none absolute left-[65%] top-[18%] z-[500] -translate-x-1/2 rounded-md bg-blue-600 px-3 py-1 text-[10px] font-medium text-white shadow">
          5 min
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-[500] w-[calc(100%-24px)] max-w-[520px] -translate-x-1/2 sm:bottom-5">
          <article className="pointer-events-auto relative rounded-lg bg-white px-3 pb-3 pt-3 shadow-[0_3px_18px_rgba(15,23,42,0.18)]">
            <div className="relative min-h-[48px]">
              <h1 className="max-w-[58%] pt-1 text-[13px] font-medium text-slate-900">
                {carName}
              </h1>

              <div className="absolute -right-1 -top-7 h-[74px] w-[45%]">
                <Image
                  src={carImage}
                  alt={carName}
                  fill
                  sizes="240px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500">
              <span>{transmission}</span>
              <span className="border-x border-slate-100 px-2">
                {seats} seats
              </span>
              <span>{fuel}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-900">
              <span>
                <strong className="font-medium">${hourlyRent}</strong>
                <span className="ml-1 text-[9px] text-slate-500">per hour</span>
              </span>

              <span>
                <strong className="font-medium">${dailyRent}</strong>
                <span className="ml-1 text-[9px] text-slate-500">per day</span>
              </span>
            </div>

            <p
              className="mt-2 truncate text-[10px] text-slate-500"
              title={address}
            >
              {address}
            </p>

            <button
              type="button"
              onClick={() =>
                window.open(
                  `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="mt-3 h-[30px] w-full rounded-[4px] bg-app-primary text-[11px] font-semibold text-white hover:bg-app-primary/90"
            >
              Confirm
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
