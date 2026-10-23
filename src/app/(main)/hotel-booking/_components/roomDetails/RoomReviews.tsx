import { Star, SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type Review = {
  id: number;
  name: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Dale Thiel",
    avatar: "https://i.pravatar.cc/150?img=12",
    date: "11 months ago",
    rating: 3.5,
    comment:
      "I really enjoyed my stay—the room was clean, the staff were friendly, and everything I needed was nearby.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, i) => {
      const fill = Math.min(Math.max(rating - i, 0), 1); // 0, 0.5 or 1

      return (
        <span key={i} className="relative inline-block size-5">
          {/* empty star */}
          <Star className="absolute inset-0 size-5 text-amber-400" />
          {/* filled part, clipped by width */}
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fill * 100}%` }}
          >
            <Star className="size-5 fill-amber-400 text-amber-400" />
          </span>
        </span>
      );
    })}
  </div>
);

const RoomReviews = () => {
  return (
    <section className="space-y-5">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 sm:text-2xl">
          Review
        </h2>

        <Button
          type="button"
          variant="ghost"
          className="text-blue-800 hover:bg-blue-50 hover:text-blue-800"
        >
          <SquarePen className="size-5 sm:size-6" />
          <span className="text-base sm:text-xl">add review</span>
        </Button>
      </div>

      {reviews.map((review) => (
        <article key={review.id} className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-12 sm:size-14">
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-base font-medium text-gray-900 sm:text-xl">
                {review.name}
              </h3>
            </div>

            <span className="text-sm text-gray-600 sm:text-lg">
              {review.date}
            </span>
          </div>

          <StarRating rating={review.rating} />

          <p className="text-base text-gray-800 sm:text-xl">{review.comment}</p>
        </article>
      ))}
    </section>
  );
};

export default RoomReviews;
