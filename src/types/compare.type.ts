export interface CompareTourResponse {
  items: Item[];
  pagination: Pagination;
}

export interface Item {
  id: number;
  image: null | string;
  title: string;
  time_range: string;
  price: number;
  price_label: string;
  schedule_line: string;
  description: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CompareToursError {
  message: string;
  success: boolean;
}

export interface SelectedTourResponse {
  items: SelectedItem[];
  max_items: number;
}

export interface SelectedItem {
  id: number;
  title: string;
  price: number;
  price_label: string;
  price_unit: string;
  next_schedule_id: number;
  features: Feature[];
}

export interface Feature {
  key: string;
  label: string;
  value: string;
}
