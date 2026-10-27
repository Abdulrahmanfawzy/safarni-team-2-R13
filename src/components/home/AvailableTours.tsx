import SectionHeader from "@/components/shared/SectionHeader";
import TourRowCard from "@/components/shared/TourRowCard";
import type { TourRowItem } from "@/components/shared/TourRowCard";
import { AVAILABLE_TOURS } from "@/constants/home";
import { getHome } from "@/api/Home";

async function loadTours(): Promise<TourRowItem[]> {
  try {
    const { available_tours } = await getHome();
    return available_tours.map((t) => ({
      id: t.id,
      type: t.tour_type,
      place: t.full_title,
      image: t.cover_photo,
      rating: t.rating,
      price: t.price,
    }));
  } catch {
    // API down: fall back to the static list
    return AVAILABLE_TOURS.map((t) => ({
      id: t.id,
      type: t.type,
      place: t.place,
      image: t.image,
      rating: t.rating,
      price: t.price,
    }));
  }
}

export default async function AvailableTours() {
  const tours = await loadTours();

  return (
    <section>
      <SectionHeader title="Available Tours" href="/search" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tours.map((t) => (
          <TourRowCard key={t.id} tour={t} />
        ))}
      </div>
    </section>
  );
}