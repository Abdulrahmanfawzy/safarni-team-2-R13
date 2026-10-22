import { CalendarDays, Clock3 } from "lucide-react";
import type { PickupPlan } from "@/types/car.types";

type PlanOptionProps = {
  plan: PickupPlan;
  selected: boolean;
  onSelect: () => void;
};

export default function PlanOption({
  plan,
  selected,
  onSelect,
}: PlanOptionProps) {
  const Icon = plan.id === "business" ? Clock3 : CalendarDays;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-[60px] w-full overflow-hidden rounded-md border text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-primary ${
        selected
          ? "border-blue-400 bg-white shadow-[0_1px_5px_rgba(15,23,42,0.05)]"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span
        className={`flex w-[74px] shrink-0 flex-col items-center justify-center gap-1 ${
          selected
            ? "bg-blue-100/80 text-app-primary"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon className="size-3.5" />
        <span className="text-xs font-medium">${plan.price}</span>
      </span>

      <span className="flex min-w-0 flex-col justify-center px-3 py-2">
        <span
          className={`text-[12px] font-medium ${
            selected ? "text-slate-800" : "text-slate-600"
          }`}
        >
          {plan.title}
        </span>

        <span className="mt-1 text-[10px] text-slate-500">
          {plan.description}
        </span>
      </span>
    </button>
  );
}
