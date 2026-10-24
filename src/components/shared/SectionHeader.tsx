import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  title,
  href,
  linkLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-medium text-gray-900 md:text-2xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-base font-medium text-app-primary hover:underline md:text-xl"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}