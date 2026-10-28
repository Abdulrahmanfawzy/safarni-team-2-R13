"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function BackButton({
  path,
  historyBack,
}: {
  path?: string;
  historyBack?: boolean;
}) {
  const router = useRouter();

  const handleRedirect = () => {
    if (historyBack) {
      router.back();
    } else if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <Button
      type="button"
      onClick={handleRedirect}
      aria-label="Back"
      variant={"secondary"}
      size={"icon-lg"}
      className="rounded-full"
    >
      <ChevronLeft />
    </Button>
  );
}
