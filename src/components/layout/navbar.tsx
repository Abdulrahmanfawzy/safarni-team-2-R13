"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Suspense, useState } from "react";
import logo from "@/assets/images/logo.png";
import { NAV_LINKS } from "@/constants/home";
import SearchDialog from "@/components/search/SearchDialog";
 
const PROTECTED_ROUTES = ["/profile", "/flight-booking", "/car-booking"];

function Avatar({
  image,
  name,
}: {
  image?: string | null;
  name?: string | null;
}) {
  const [imgError, setImgError] = useState(false);

  const initials = (name ?? "").trim().slice(0, 2).toUpperCase() || "??";

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={name ?? "User avatar"}
        onError={() => setImgError(true)}
        className="h-full w-full rounded-full object-cover"
      />
    );
  }

  return <span className="text-xs font-semibold">{initials}</span>;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  const displayName = session?.user?.name || session?.user?.email || "";

  const openFilters = () => {
    const sp = new URLSearchParams(
      pathname === "/search" ? window.location.search : "",
    );
    sp.set("filters", "open");
    router.push(`/search?${sp.toString()}`, { scroll: false });
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }); 

    const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
    if (isProtected) {
      router.push("/"); 
    }

    router.refresh(); 
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

        <div className="flex items-center gap-5">
          <Suspense fallback={null}>
            <SearchDialog />
          </Suspense>

          <button
            type="button"
            onClick={openFilters}
            aria-label="Filters"
            className="text-gray-900 transition hover:text-app-primary"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
          </button>

          {/* Auth area */}
          {isLoading ? (
            <div className="h-8 w-16 animate-pulse rounded-full bg-gray-100" />
          ) : isLoggedIn ? (
            <>
              <Link
                href="/profile"
                aria-label="Profile"
                title={displayName}
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-app-primary/10 text-app-primary"
              >
                <Avatar image={session?.user?.image} name={displayName} />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
                className="flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:text-red-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="M16 17l5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-app-primary px-5 py-1.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}