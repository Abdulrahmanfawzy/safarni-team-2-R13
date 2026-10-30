export type CarBrand = {
  name: string;
  count: number;
  mark: string;
  markClass?: string;
};

export type Car = {
  id: string;
  name: string;
  transmission: string;
  seats: number;
  fuel: string;
  image: string;
  imageAlt: string;
  brand: string;
};

export type CarCardProps = {
  car: Car;
};

export type CarApiImage =
  | string
  | {
      url?: string | null;
      path?: string | null;
      image?: string | null;
    };

export type CarApiBrand = {
  id?: string | number;
  name: string;
  count?: number;
  cars_count?: number;
  total_cars?: number;
};

export type CarApiItem = {
  id: string | number;
  name?: string | null;
  model?: string | null;
  title?: string | null;
  transmission?: string | null;
  seats?: number | string | null;
  fuel?: string | null;
  fuel_type?: string | null;
  image?: string | null;
  images?: CarApiImage[] | null;
  brand?: {
    id?: string | number;
    name?: string | null;
  } | null;
};

export type CarsApiPagination = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  [key: string]: unknown;
};

export type CarsApiData = {
  cars: CarApiItem[];
  pagination?: CarsApiPagination;
  brands: CarApiBrand[];
};

export type CarsApiResponse = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: CarsApiData;
};

export type PickupPlanId = "business" | "personal";

export type PickupPlan = {
  id: PickupPlanId;
  price: number;
  title: string;
  description: string;
};

export type CarSpec = {
  label: string;
  value: string;
};

export type PickupCarImage = {
  src: string;
  alt: string;
};
export type CarDetailsApiItem = {
  id: number;
  model: string;
  body_type: string;
  transmission: string;
  seats_count: number;
  fuel_type: string;
  power_hp: string | null;
  max_speed_kmh: string | null;
  speed: string | null;
  acceleration: string | null;
  hourly_rent: number;
  daily_rent: number;
  rating: number;
  reviews_count: number;
  pickup_address: string | null;
  latitude: number | null;
  longitude: number | null;
  location: {
    latitude: number | null;
    longitude: number | null;
  } | null;
  is_favorite: boolean;
  images: string[];
  brand: {
    id: number;
    name: string;
    logo_url: string | null;
  } | null;
};

export type CarDetailsApiResponse = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: {
    car: CarDetailsApiItem;
  };
};