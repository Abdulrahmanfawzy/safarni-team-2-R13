"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/images/logo.png";
import { NAV_LINKS } from "@/constants/home";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const openFilters = () => {
    // keep the current search (e.g. q=Paris) when on /search, start clean elsewhere
    const sp = new URLSearchParams(
      pathname === "/search" ? window.location.search : ""
    );
    sp.set("filters", "open");
    router.push(`/search?${sp.toString()}`, { scroll: false });
  };

  return (
    <header className="w-full bg-white">
      <nav className="mx-auto flex h-[110px] max-w-[1440px] items-center justify-between px-4 md:px-[100px]">
        {/* Logo */}
        <Link href="/" aria-label="Safarni home">
          <Image src={logo} alt="Safarni" width={56} priority />
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);

            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm font-medium transition hover:text-app-primary ${
                    active ? "text-app-primary" : "text-gray-900"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/search"
            aria-label="Search"
            className="text-gray-900 transition hover:text-app-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={openFilters}
            aria-label="Filters"
            className="text-gray-900 transition hover:text-app-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </button>

          <Link
            href="/profile"
            aria-label="Profile"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-app-primary/10 text-app-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}