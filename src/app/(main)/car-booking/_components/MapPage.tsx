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

const route: [number, number][] = [
  [37.75795, -122.41415],
  [37.75795, -122.41405],
  [37.7581, -122.41405],
  [37.7581, -122.4149],
  [37.75915, -122.4149],
  [37.75915, -122.41365],
];

function RecenterButton() {
  const map = useMap();

  return (
    <button
      type="button"
      aria-label="Center map on route"
      onClick={() => map.flyTo(route[0], 16, { duration: 0.6 })}
      className="absolute right-4 top-4 z-[1000] flex size-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md"
    >
      <LocateFixed className="size-4" />
    </button>
  );
}

export default function MapPage() {
  return (
    <section className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden">
      <div className="relative h-[calc(100dvh-90px)] min-h-[520px] w-full">
        <MapContainer
          center={[37.75855, -122.41425]}
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
            center={route[route.length - 1]}
            radius={6}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: "#ff8500",
              fillOpacity: 1,
            }}
          />

          <ZoomControl position="bottomright" />
          <RecenterButton />
        </MapContainer>

        <div className="pointer-events-none absolute left-[65%] top-[18%] z-[500] -translate-x-1/2 rounded-md bg-blue-600 px-3 py-1 text-[10px] font-medium text-white shadow">
          5 min
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-[500] w-[calc(100%-24px)] max-w-[520px] -translate-x-1/2 sm:bottom-5">
          <article className="pointer-events-auto relative rounded-lg bg-white px-3 pb-3 pt-3 shadow-[0_3px_18px_rgba(15,23,42,0.18)]">
            <div className="relative min-h-[48px]">
              <h1 className="max-w-[58%] pt-1 text-[13px] font-medium text-slate-900">
                S 500 Sedan
              </h1>

              <div className="absolute -right-1 -top-7 h-[74px] w-[45%]">
                <Image
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=700&q=85"
                  alt="Black luxury sedan"
                  fill
                  sizes="240px"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500">
              <span>Automatic</span>
              <span className="border-x border-slate-100 px-2">5 seats</span>
              <span>Diesel</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-900">
              <span>
                <strong className="font-medium">$80</strong>
                <span className="ml-1 text-[9px] text-slate-500">per hour</span>
              </span>

              <span>
                <strong className="font-medium">$400</strong>
                <span className="ml-1 text-[9px] text-slate-500">per day</span>
              </span>
            </div>

            <button
              type="button"
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
