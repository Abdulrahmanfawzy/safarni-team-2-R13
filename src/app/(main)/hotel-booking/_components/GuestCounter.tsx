// Counter.tsx
import { Minus, Plus } from "lucide-react";

type Props = {
  label: string;
  description: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

const GuestCounter = ({
  label,
  description,
  value,
  min = 0,
  max = 10,
  onChange,
}: Props) => (
  <div className="flex items-center justify-between border-b border-gray-100 py-3">
    <div>
      <p className="text-lg font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>

    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="flex size-6 items-center justify-center rounded bg-gray-100 text-gray-700 disabled:opacity-40"
      >
        <Minus className="size-3" />
      </button>

      <span className="w-4 text-center text-sm" aria-live="polite">
        {value}
      </span>

      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="flex size-6 items-center justify-center rounded bg-blue-800 text-white disabled:opacity-40"
      >
        <Plus className="size-3" />
      </button>
    </div>
  </div>
);

export default GuestCounter;
