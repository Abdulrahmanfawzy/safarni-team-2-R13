import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label="Back"
      variant={"secondary"}
      size={"icon-lg"}
      className="rounded-full"
    >
      <ChevronLeft />
    </Button>
  );
}
