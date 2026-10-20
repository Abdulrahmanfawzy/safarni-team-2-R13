import type { StaticImageData } from "next/image";

import hero1 from "@/assets/images/home/hero-1.jpg";
import hero2 from "@/assets/images/home/hero-2.jpg";
import hero3 from "@/assets/images/home/hero-3.jpg";
import hero4 from "@/assets/images/home/hero-4.jpg";
import hero5 from "@/assets/images/home/hero-5.jpg";

import catFlight from "@/assets/images/home/cat-flight.jpg";
import catCars from "@/assets/images/home/cat-cars.jpg";
import catTours from "@/assets/images/home/cat-tours.jpg";
import catHotel from "@/assets/images/home/cat-hotel.jpg";

import pyramids from "@/assets/images/home/pyramids.jpg";
import citadel from "@/assets/images/home/citadel.jpg";
import karnak from "@/assets/images/home/karnak.jpg";
import library from "@/assets/images/home/library.jpg";

import luxor from "@/assets/images/home/luxor.jpg";
import dahab from "@/assets/images/home/dahab.jpg";
import fayoum from "@/assets/images/home/fayoum.jpg";
import marsaAlam from "@/assets/images/home/marsa-alam.jpg";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Favorite", href: "/favorite" },
  { label: "Compare", href: "/compare" },
  { label: "maps", href: "/maps" },
];

export const HERO_IMAGES = {
  colA: [hero1, hero4],
  colB: [hero2, hero5],
  colC: [hero3],
};

export const CATEGORIES = [
  { label: "Flight", image: catFlight, href: "/flight-booking" },
  { label: "Cars", image: catCars, href: "/car-booking" },
  { label: "Tours", image: catTours, href: "/search" },
  { label: "Hotel", image: catHotel, href: "/hotel-booking" },
];

export interface Destination {
  id: string;
  name: string;
  city: string;
  rating: number;
  image: StaticImageData;
}

export const RECOMMENDATIONS: Destination[] = [
  { id: "pyramids", name: "The Pyramids", city: "Giza", rating: 4.8, image: pyramids },
  { id: "citadel", name: "The Citadel of Saladin", city: "Cairo", rating: 4.8, image: citadel },
  { id: "karnak", name: "Karnak Temple", city: "Luxor", rating: 4.3, image: karnak },
  { id: "library", name: "Library of Alexandria", city: "Alexandria", rating: 4.8, image: library },
];

export interface AvailableTour {
  id: string;
  type: string;
  place: string;
  price: number;
  rating: number;
  image: StaticImageData;
}

export const AVAILABLE_TOURS: AvailableTour[] = [
  { id: "luxor", type: "Full Day Tour", place: "Luxor", price: 150, rating: 4.3, image: luxor },
  { id: "dahab", type: "Full Day Tour", place: "Dahab", price: 250, rating: 4.5, image: dahab },
  { id: "fayoum", type: "Full Day Tour", place: "Fayoum", price: 200, rating: 4.2, image: fayoum },
  { id: "marsa-alam", type: "Full Day Tour", place: "Marsa Alam", price: 220, rating: 4.8, image: marsaAlam },
];