import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reviews } from "@/types/hotel.type";

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

const RoomReviews = ({ reviews }: { reviews: Reviews }) => {
  return (
    <section className="space-y-5">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 sm:text-2xl">
          Review
        </h2>

        {/* Add Review Dialog */}
        {/* <div>
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  className="text-blue-800 hover:bg-blue-50 hover:text-blue-800"
                >
                  <SquarePen className="size-5 sm:size-6" />
                  <span className="text-base sm:text-xl">add review</span>
                </Button>
              }
            />
            <AddReview />
          </Dialog>
        </div> */}
      </div>

      {reviews.items.length > 0 ? (
        reviews.items.map((review) => (
          <article key={review?.id} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 sm:size-14">
                  <AvatarImage src={review.avatar} alt={review.user_name} />
                  <AvatarFallback>
                    {review.user_name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-base font-medium text-gray-900 sm:text-xl">
                  {review.user_name}
                </h3>
              </div>

              <span className="text-sm text-gray-600 sm:text-lg">
                {review.formatted_date}
              </span>
            </div>

            <StarRating rating={reviews.average_rating} />

            <p className="text-base text-gray-800 sm:text-xl">
              {review.comment}
            </p>
          </article>
        ))
      ) : (
        <div
          role="status"
          className="flex items-center justify-center text-center text-base text-gray-600 sm:text-lg h-15"
        >
          No reviews yet. Be the first to review this room.
        </div>
      )}
    </section>
  );
};

export default RoomReviews;
