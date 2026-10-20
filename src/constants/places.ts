export interface Place {
  id: string;
 
  name: string;
  
  label: string;
  tagline?: string;
}

export const POPULAR_PLACES: Place[] = [
  { id: "paris", name: "Paris", label: "Paris", tagline: "City of arts" },
  { id: "rome", name: "Rome", label: "Rome", tagline: "History lives here" },
  { id: "rio", name: "Rio De Janeiro", label: "Rio De Janeiro", tagline: "Joy shines here" },
  { id: "dubai", name: "Dubai", label: "Dubai", tagline: "Dream rise here" },
  { id: "london", name: "London", label: "London", tagline: "City of culture" },
  { id: "sydney", name: "Sydney", label: "Sydney", tagline: "Vibes soar here" },
  { id: "beijing", name: "Beijing", label: "Beijing", tagline: "Lives in tradition" },
  { id: "amsterdam", name: "Amsterdam", label: "Amsterdam", tagline: "City of Flowers" },
  { id: "berlin", name: "Berlin", label: "Berlin", tagline: "City of arts" },
  { id: "ankara", name: "Ankara", label: "Ankara", tagline: "City of arts" },
  { id: "pisa", name: "Pisa", label: "Pisa", tagline: "City of arts" },
  { id: "washington", name: "Washington", label: "Washington", tagline: "City of arts" },
  { id: "malaysia", name: "Malaysia", label: "Malaysia", tagline: "Family friendly" },
  { id: "barcelona", name: "Barcelona", label: "Barcelona", tagline: "City of arts" },
  { id: "florence", name: "Florence", label: "Florence", tagline: "City of arts" },
  { id: "delhi", name: "Delhi", label: "Delhi", tagline: "City of color" },
  { id: "dhaka", name: "Dhaka", label: "Dhaka", tagline: "City of arts" },
  { id: "istanbul", name: "Istanbul", label: "Istanbul", tagline: "City of arts" },
  { id: "egypt", name: "Egypt", label: "Egypt", tagline: "City of arts" },
];

 
export const PLACE_SUGGESTIONS: Place[] = [
  { id: "paris-ontario", name: "Paris", label: "Paris, Ontario" },
  { id: "paris-texas", name: "Paris", label: "Paris, Texas, United States" },
  { id: "paris-tennessee", name: "Paris", label: "Paris, Tennessee, United States" },
];