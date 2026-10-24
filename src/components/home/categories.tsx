import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants/home";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Categories() {
  return (
    <section>
      <SectionHeader title="Categories" />
<ul className="mt-6 grid grid-cols-2 gap-6 sm:flex sm:justify-between">
  {CATEGORIES.map((c) => (
    <li key={c.label}>
      <Link href={c.href} className="group flex flex-col items-center gap-2">
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-transparent transition group-hover:ring-app-primary sm:h-40 sm:w-40 lg:h-60 lg:w-60">
          <Image
            src={c.image}
            alt={c.label}
            fill
            sizes="(max-width: 1024px) 160px, 240px"
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-app-primary md:text-xl">
          {c.label}
        </span>
      </Link>
    </li>
  ))}
</ul>
    </section>
  );
}