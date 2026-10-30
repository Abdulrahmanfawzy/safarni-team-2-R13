"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BookRoom() {
  const pathname = usePathname();
  return (
    <Link href={pathname + "/book-room"} className="w-full">
      <Button type="button" className={"w-full"}>
        Book Now
      </Button>
    </Link>
  );
}
