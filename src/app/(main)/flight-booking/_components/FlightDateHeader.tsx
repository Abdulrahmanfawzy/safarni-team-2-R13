import { CalendarDays, UserRound } from "lucide-react";

interface FlightDateHeaderProps {
  date: string;
  kind: "departure" | "return";
}

export default function FlightDateHeader({
  date,
  kind,
}: FlightDateHeaderProps) {
  const Icon = kind === "departure" ? CalendarDays : UserRound;

  return (
    <div className="flex h-11 min-w-0 items-center justify-center gap-1 rounded-md border
     border-slate-100 bg-white px-2 text-xs shadow-[0_1px_4px_rgba(16,24,40,0.06)]
     lg:text-[20px]">
      <Icon aria-hidden="true" className="size-3.5 shrink-0 text-slate-700" />
      <span>{date}</span>
    </div>
  );
}
