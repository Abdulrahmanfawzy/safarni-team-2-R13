// src/app/(main)/tour/[id]/page.tsx  (your TourDetailsView file)
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Star } from "lucide-react";

import { getTourById } from "@/api/ToursList";
import BookingPanel from "@/app/(main)/tour/[id]/_components/BookingPanel";

interface TourDetailsViewProps {
  params: Promise<{ id: string }>;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </span>
  );
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatStyle(style: string): string {
  const text = style.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default async function TourDetailsView({
  params,
}: TourDetailsViewProps) {
  const { id } = await params;
  const tour = await getTourById(id);

  if (!tour) notFound();

  return (
    <main className="container mx-auto max-w-5xl px-4 py-6">
      <Link
        href="/tour"
        aria-label="Back to tours"
        className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </Link>

      {/* Hero image */}
      {tour.image && (
        <div className="relative h-56 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-96">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      {/* Title + rating */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-xl font-semibold sm:text-2xl">{tour.title}</h1>
        {tour.rating !== null && (
          <div className="flex shrink-0 items-center gap-2 text-sm">
            <Stars rating={tour.rating} />
            <span className="font-medium">{tour.rating}</span>
            <span className="text-gray-500">({tour.reviewsCount})</span>
          </div>
        )}
      </div>

      {/* Style / duration / location */}
      <div className="mt-2 grid grid-cols-3 items-center text-sm text-gray-600">
        <span>{formatStyle(tour.adventureStyle)}</span>
        <span className="text-center">{tour.durationText}</span>
        <span className="text-right">{tour.location}</span>
      </div>

      {/* Top activities */}
      {tour.topActivities.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Top Activities</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {tour.topActivities.map((activity) => (
              <li key={activity.id}>
                <div className="relative h-36 w-full overflow-hidden rounded-lg bg-gray-100">
                  {activity.image && (
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <p className="mt-2 text-sm font-medium">{activity.title}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Best time to visit */}
      {tour.bestTimeToVisit && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Best Time to Visit</h2>
          <p className="rounded-lg border px-4 py-3 text-sm text-gray-700">
            {tour.bestTimeToVisit}
          </p>
        </section>
      )}

      {/* Gallery */}
      {tour.gallery.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">
            Gallery{" "}
            <span className="text-blue-700">({tour.galleryCount})</span>
          </h2>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {tour.gallery.map((src, index) => (
              <li
                key={`${src}-${index}`}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`${tour.title} photo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Reviews */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Reviews</h2>
        {tour.reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {tour.reviews.map((review) => (
              <li key={review.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <Image
                        src={review.avatar}
                        alt=""
                        width={32}
                        height={32}
                        unoptimized
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="text-sm font-medium">{review.author}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(review.created_at)}
                  </span>
                </div>
                <div className="mt-2">
                  <Stars rating={review.rating} />
                </div>
                <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Price + schedules + Book now */}
      <BookingPanel
        tourId={id}
        price={tour.price}
        schedules={tour.schedules}
      />
    </main>
  );
}