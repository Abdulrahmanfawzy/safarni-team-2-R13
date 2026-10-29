import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateOption } from "@/types/bookingRoom.type";

type Props = {
  options: DateOption[];
  value: string;
  onChange: (value: string) => void;
};

const DatePicker = ({ options, value, onChange }: Props) => (
  <ToggleGroup
    value={value ? [value] : []}
    onValueChange={(next) => {
      const selected = next[0];
      if (selected) onChange(selected);
    }}
    className="flex w-full gap-3"
  >
    {options.map((o) => (
      <ToggleGroupItem
        key={o.value}
        value={o.value}
        aria-label={`${o.weekday} ${o.label}`}
        className="h-auto flex-1 flex-col gap-1 rounded-md border border-slate-200 bg-white px-2 py-4 font-normal text-slate-900 shadow-none   data-[state=on]:bg-blue-200! data-[state=on]:text-app-primary! aria-pressed:bg-blue-200! aria-pressed:text-app-primary! hover:bg-app-primary hover:text-white "
      >
        <span className="text-xs">{o.weekday}</span>
        <span className="text-sm font-medium">{o.label}</span>
      </ToggleGroupItem>
    ))}
  </ToggleGroup>
);

export default DatePicker;
