"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { toggleFavoriteAction } from "@/actions/favorite.actions";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  id: number | string;
  type: string;  
  initialFavorite?: boolean;
  className?: string;
}

export default function FavoriteButton({
  id,
  type,
  initialFavorite = false,
  className,
}: FavoriteButtonProps) {
  const [fav, setFav] = useState(initialFavorite);
  const [pending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pending) return;

    const previous = fav;
    setFav(!previous); 

    startTransition(async () => {
      const res = await toggleFavoriteAction(id, type);
      if (res.success) {
        setFav(res.isFavorite);
      } else {
        setFav(previous);
        toast.error(
          res.error === "unauthenticated"
            ? "Please login first"
            : res.error || "Could not update favorites",
        );
      }
    });
  };

  return (
    <button
      type="button"
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      onClick={handleClick}
      disabled={pending}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110 disabled:opacity-60",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill={fav ? "#ef4444" : "none"}
        stroke={fav ? "#ef4444" : "#9ca3af"}
        strokeWidth="2"
      >
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
      </svg>
    </button>
  );
}