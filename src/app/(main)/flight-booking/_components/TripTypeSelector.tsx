import { ArrowRight, ArrowRightLeft, RefreshCw } from "lucide-react";

export type TripType = "Round Trip" | "Multi City" | "One Way";

interface TripTypeSelectorProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

const tripTypes = [
  { label: "Round Trip", Icon: RefreshCw },
  { label: "Multi City", Icon: ArrowRightLeft },
  { label: "One Way", Icon: ArrowRight },
] as const;

export default function TripTypeSelector({
  value,
  onChange,
}: TripTypeSelectorProps) {
  return (
    <div
      aria-label="Trip type"
      className="mb-6 flex gap-2 pb-1 sm:gap-3"
    >
      {tripTypes.map(({ label, Icon }) => {
        const selected = value === label;

        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(label)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2.5
                 text-xs font-medium transition-colors sm:px-4 lg:text-[16px] ${
              selected
                ? "bg-[#eaf3ff] text-[#1760e9]"
                : "bg-[#f3f4f6] text-[#475467] hover:bg-slate-200"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
