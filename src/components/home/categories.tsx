import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/constants/home";
import SectionHeader from "@/components/shared/SectionHeader";
import { getHome } from "@/api/Home";

interface CategoryItem {
  key: string | number;
  label: string;
  image: string | StaticImageData | null;
  href: string;
}

// Explicit routes. Keys are lowercase category names or slugs from the API.
const ROUTE_OVERRIDES: Record<string, string> = {
  tour: "/tour",
  tours: "/tour",
};

// Reuse the routes already defined in constants/home.ts
const staticHref = (name: string) =>
  CATEGORIES.find((c) => c.label.toLowerCase() === name.toLowerCase())?.href;

function resolveHref(name: string, slug: string): string {
  return (
    ROUTE_OVERRIDES[slug.toLowerCase()] ??
    ROUTE_OVERRIDES[name.toLowerCase()] ??
    staticHref(name) ??
    `/${slug}`
  );
}

async function loadCategories(): Promise<CategoryItem[]> {
  try {
    const { categories } = await getHome();
    return categories.map((c) => ({
      key: c.id,
      label: c.name,
      image: c.icon_url,
      href: resolveHref(c.name, c.slug),
    }));
  } catch {
    // API down: fall back to your static list
    return CATEGORIES.map((c) => ({
      key: c.label,
      label: c.label,
      image: c.image,
      href: ROUTE_OVERRIDES[c.label.toLowerCase()] ?? c.href,
    }));
  }
}

export default async function Categories() {
  const items = await loadCategories();

  return (
    <section>
      <SectionHeader title="Categories" />
      <ul className="mt-6 grid grid-cols-2 gap-6 sm:flex sm:justify-between">
        {items.map((c) => (
          <li key={c.key}>
            <Link
              href={c.href}
              className="group flex flex-col items-center gap-2"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 ring-2 ring-transparent transition group-hover:ring-app-primary sm:h-40 sm:w-40 lg:h-60 lg:w-60">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="(max-width: 1024px) 160px, 240px"
                    className="object-cover"
                  />
                )}
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