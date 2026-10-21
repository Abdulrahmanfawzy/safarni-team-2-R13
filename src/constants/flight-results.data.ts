export interface FlightResult {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  departureAirport: string;
  arrivalAirport: string;
  layover: string;
  airline: string;
  price: string;
}

export const outboundFlights: FlightResult[] = [
  {
    id: "outbound-1",
    departureTime: "7:05 AM",
    arrivalTime: "8:55 PM",
    duration: "18:55",
    departureAirport: "YUL",
    arrivalAirport: "YUL",
    layover: "1 layover: YYZ (3:55)",
    airline: "Scoot",
    price: "$ 1,300",
  },
  {
    id: "outbound-2",
    departureTime: "9:05 AM",
    arrivalTime: "4:05 PM",
    duration: "18:55",
    departureAirport: "YUL",
    arrivalAirport: "YUL",
    layover: "1 layover: YYZ (3:55)",
    airline: "Scoot",
    price: "$ 1,400",
  },
  {
    id: "outbound-3",
    departureTime: "9:05 AM",
    arrivalTime: "4:55 PM",
    duration: "18:55",
    departureAirport: "YUL",
    arrivalAirport: "YUL",
    layover: "1 layover: YYZ (3:55)",
    airline: "Scoot",
    price: "$ 1,300",
  },
];

export const returnFlights: FlightResult[] = outboundFlights.map((flight) => ({
  ...flight,
  id: flight.id.replace("outbound", "return"),
}));
