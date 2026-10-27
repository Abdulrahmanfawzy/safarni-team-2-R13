import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import Recommendations from "@/components/home/recommendations";
import AvailableTours from "@/components/home/AvailableTours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Recommendations />
      <AvailableTours />
    </>
  );
}