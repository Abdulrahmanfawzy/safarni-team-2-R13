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
};

export type CarCardProps = {
  car: Car;
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
