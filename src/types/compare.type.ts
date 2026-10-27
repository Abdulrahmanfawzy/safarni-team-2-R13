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
