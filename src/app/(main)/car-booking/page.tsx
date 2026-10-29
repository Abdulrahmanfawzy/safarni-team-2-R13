import { getCars, mapBrandToUi, mapCarToUi } from "@/api/cars";
import ServerDataFetcher from "@/components/shared/ServerDataFetcher";
import CarsPage from "./_components/CarsPage";

export const metadata = {
  title: "Car Rental | Safarni",
  description: "Explore and book rental cars.",
};

export default function Page() {
  return (
    <ServerDataFetcher fetcherFn={() => getCars(10)}>
      {(payload) => {
        const cars = payload.cars.map(mapCarToUi);
        const brands = mapBrandToUi(payload.brands, cars);

        return <CarsPage cars={cars} brands={brands} />;
      }}
    </ServerDataFetcher>
  );
}