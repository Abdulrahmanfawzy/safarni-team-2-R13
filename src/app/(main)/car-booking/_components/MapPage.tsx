"use client";

import dynamic from "next/dynamic";
import type { MapPageProps } from "./MapPageClient";
import MapSkeleton from "@/components/skeletons/MapSkeleton";

const MapPage = dynamic<MapPageProps>(() => import("./MapPageClient"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default MapPage;
