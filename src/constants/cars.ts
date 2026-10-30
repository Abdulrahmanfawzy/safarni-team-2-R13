import type {
  Car,
  CarBrand,
  CarSpec,
  PickupPlan,
  PickupCarImage,
} from "@/types/car.types";

export const CAR_BRANDS: CarBrand[] = [
  { name: "Mercedes", count: 32, mark: "M", markClass: "text-zinc-600" },
  { name: "Geely", count: 22, mark: "G", markClass: "text-blue-600" },
  {
    name: "Jeep",
    count: 31,
    mark: "Jeep",
    markClass: "font-black text-zinc-600",
  },
  { name: "Subaru", count: 26, mark: "S", markClass: "text-blue-700" },
  { name: "BMW", count: 12, mark: "B", markClass: "font-bold text-sky-700" },
  { name: "Renault", count: 8, mark: "R", markClass: "text-zinc-600" },
  {
    name: "Porsche",
    count: 8,
    mark: "P",
    markClass: "font-bold text-amber-700",
  },
];

export const POPULAR_CARS: Car[] = [
  {
    id: "mercedes-s500",
    brand: "Mercedes",
    name: "S 500 Sedan",
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Black luxury sedan",
  },
  {
    id: "mercedes-gla250",
    brand: "Mercedes",
    name: "GLA 250 SUV",
    transmission: "Automatic",
    seats: 7,
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=85",
    imageAlt: "White luxury SUV",
  },
  {
    id: "volvo-xc40",
    brand: "Volvo",
    name: "Volvo XC40",
    transmission: "Automatic",
    seats: 5,
    fuel: "Petrol",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Compact SUV",
  },
  {
    id: "mazda-cx30",
    brand: "Mazda",
    name: "Mazda CX-30",
    transmission: "Automatic",
    seats: 5,
    fuel: "Diesel",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Silver crossover SUV",
  },
];

export const PICKUP_CAR_IMAGES: PickupCarImage[] = [
  {
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=90",
    alt: "Black luxury sedan viewed from the front three-quarter angle",
  },
  {
    src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90",
    alt: "Luxury SUV",
  },
];

export const PICKUP_SPECS: CarSpec[] = [
  { label: "Power", value: "429 hp @ 6,100 rpm" },
  { label: "Max Speed", value: "280 km/h" },
  { label: "Acceleration", value: "4.9 sec 0–60 mph" },
];

export const PICKUP_PLANS: PickupPlan[] = [
  {
    id: "business",
    price: 10,
    title: "Hourly Rent",
    description: "Best for business appointments",
  },
  {
    id: "personal",
    price: 80,
    title: "Hourly Rent",
    description: "Best for business appointments",
  },
];
