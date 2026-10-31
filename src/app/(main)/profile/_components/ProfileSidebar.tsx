"use client";
import { Calendar, ChevronRight, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileResponse } from "@/types/profile.type";

// nav links
const navItems = [
  {
    title: "Personal Info",
    href: "/profile/info",
    icon: User,
  },
  {
    title: "My Booking",
    href: "/profile/booking",
    icon: Calendar,
  },
  // {
  //   title: "App Language",
  //   href: "/profile/language",
  //   icon: Globe,
  // },
  // {
  //   title: "Account & Security",
  //   href: "/profile/account",
  //   icon: Shield,
  // },
];

export default function ProfileSidebar({ user }: { user: ProfileResponse }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-80 shrink-0 space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt={user.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <span className="font-semibold text-base text-app-primary">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            {user.name}
          </h2>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm divide-y divide-gray-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-50/80 text-blue-600 font-semibold"
                  : "hover:bg-gray-50 text-gray-700 font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                />
                <span className="text-sm">{item.title}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`}
              />
            </Link>
          );
        })}

        <div className="pt-2">
          <button
            type="button"
            className="w-full flex items-center justify-between p-3.5 hover:bg-red-50/50 transition-colors rounded-xl text-red-500 text-left"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
