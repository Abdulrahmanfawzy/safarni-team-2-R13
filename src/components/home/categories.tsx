import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants/home";
import SectionHeader from "@/components/shared/section-header";

export default function Categories() {
  return (
    <section>
      <SectionHeader title="Categories" />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {CATEGORIES.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-2"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-transparent transition group-hover:ring-app-primary md:h-24 md:w-24">
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium text-app-primary">
                {c.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}