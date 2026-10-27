import SectionHeader from "@/components/shared/SectionHeader";
import DestinationCard from "@/components/shared/destination-card";
import type { DestinationCardItem } from "@/components/shared/destination-card";
import { RECOMMENDATIONS } from "@/constants/home";
import { getHome } from "@/api/Home";

async function loadRecommendations(): Promise<DestinationCardItem[]> {
  try {
    const { recommendations } = await getHome();
    return recommendations.map((r) => ({
      id: r.id,
      name: r.name,
      city: r.country,
      image: r.cover_photo,
      rating: r.rating,
    }));
  } catch {
    // API down: fall back to the static list
    return RECOMMENDATIONS.map((d) => ({
      id: d.id,
      name: d.name,
      city: d.city,
      image: d.image,
      rating: d.rating,
    }));
  }
}

export default async function Recommendations() {
  const items = await loadRecommendations();

  return (
    <section>
      <SectionHeader title="Recommendation" href="/search" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((d) => (
          <DestinationCard key={d.id} item={d} />
        ))}
      </div>
    </section>
  );
}