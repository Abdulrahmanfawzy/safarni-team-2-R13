import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import SectionHeader from "@/components/shared/SectionHeader";
import DestinationCard from "@/components/shared/destination-card";
import TourRowCard from "@/components/shared/TourRowCard";
import { AVAILABLE_TOURS, RECOMMENDATIONS } from "@/constants/home";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Categories />

      <section>
        <SectionHeader title="Recommendation" href="/search" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {RECOMMENDATIONS.map((d) => (
            <DestinationCard key={d.id} item={d} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Available Tours" href="/search" />
        <div className="grid gap-4 md:grid-cols-2">
          {AVAILABLE_TOURS.map((t) => (
            <TourRowCard key={t.id} tour={t} />
          ))}
        </div>
      </section>
    </>
  );
}
