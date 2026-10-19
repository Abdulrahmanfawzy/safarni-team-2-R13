"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const ReturnBackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return pathname === "/welcome" || pathname === "/reset-password" ? (
    <span />
  ) : (
    <Button
      onClick={() => router.back()}
      className="rounded-full"
      variant={"secondary"}
      size="lg"
    >
      <ChevronLeft />
    </Button>
  );
};

export default ReturnBackButton;
