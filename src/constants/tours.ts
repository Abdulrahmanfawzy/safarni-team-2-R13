import type { StaticImageData } from "next/image";

import eiffel from "@/assets/images/tours/eiffel.jpg";
import louvre from "@/assets/images/tours/louvre.jpg";
import cruise from "@/assets/images/tours/cruise.jpg";
import swiss from "@/assets/images/tours/swiss.jpg";
import tdf from "@/assets/images/tours/tdf.jpg";
import disney from "@/assets/images/tours/disney.jpg";

export type AdventureStyle =
  | "Adventure Travel"
  | "City Breaks"
  | "Water Activity"
  | "Road Trips";

export type SortKey =
  | "price-asc"
  | "price-desc"
  | "deals"
  | "reviews"
  | "popular";

export interface Tour {
  id: string;
  title: string;
  image: StaticImageData| string;
  location: string;
  style: AdventureStyle;
  rating: number;
  reviews: number;
  days?: number;
  hours?: number;
  price: number;
  oldPrice?: number;
  pickup: boolean;
  popularity: number;
}

export const ADVENTURE_STYLES: AdventureStyle[] = [
  "Adventure Travel",
  "City Breaks",
  "Water Activity",
  "Road Trips",
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "deals", label: "Biggest Deals (Highest Saving)" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "popular", label: "Most Popular" },
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 8500;

// TODO: replace with data from your API / server action
export const TOURS: Tour[] = [
  { id: "1", title: "Eiffel Tower", image: eiffel, location: "Paris", style: "City Breaks", rating: 4.5, reviews: 690, days: 5, price: 1050, oldPrice: 1300, pickup: true, popularity: 95 },
  { id: "2", title: "Paris City Tour", image: louvre, location: "Paris", style: "City Breaks", rating: 4.1, reviews: 350, days: 7, price: 1500, pickup: true, popularity: 70 },
  { id: "3", title: "River Cruise", image: cruise, location: "Paris", style: "Water Activity", rating: 4.0, reviews: 260, hours: 6, price: 100, oldPrice: 150, pickup: true, popularity: 80 },
  { id: "4", title: "Best of Swiss", image: swiss, location: "Zurich", style: "Adventure Travel", rating: 4.7, reviews: 960, days: 10, price: 2200, pickup: true, popularity: 88 },
  { id: "5", title: "Tour de France", image: tdf, location: "Paris", style: "Road Trips", rating: 3.1, reviews: 256, hours: 6, price: 155, pickup: true, popularity: 40 },
  { id: "6", title: "Disneyland Paris", image: disney, location: "Paris", style: "City Breaks", rating: 4.3, reviews: 890, days: 10, price: 2100, oldPrice: 2600, pickup: true, popularity: 99 },

  // placeholders so other popular places return results (swap images later)
  { id: "7", title: "Colosseum Tour", image: louvre, location: "Rome", style: "City Breaks", rating: 4.6, reviews: 720, days: 4, price: 900, oldPrice: 1100, pickup: true, popularity: 85 },
  { id: "8", title: "Desert Safari", image: swiss, location: "Dubai", style: "Adventure Travel", rating: 4.4, reviews: 540, hours: 8, price: 180, pickup: true, popularity: 90 },
  { id: "9", title: "Thames Cruise", image: cruise, location: "London", style: "Water Activity", rating: 4.2, reviews: 310, hours: 3, price: 75, oldPrice: 95, pickup: true, popularity: 60 },
  { id: "10", title: "Pyramids Day Trip", image: eiffel, location: "Cairo", style: "City Breaks", rating: 4.8, reviews: 1200, days: 1, price: 150, pickup: true, popularity: 98 },
];