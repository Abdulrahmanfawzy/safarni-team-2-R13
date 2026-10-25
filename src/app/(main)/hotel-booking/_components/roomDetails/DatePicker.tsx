import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const DatePicker = ({ options }: { options: any }) => {
  return (
    <ToggleGroup className="flex w-full gap-3">
      {options.map((option: any) => (
        <ToggleGroupItem
          key={option.id}
          value={option.id}
          aria-label={`${option.weekday} ${option.label}`}
          className="h-auto flex-1 flex-col gap-1 rounded-md border border-slate-200 bg-white px-2 py-4 font-normal text-slate-900 shadow-none   data-[state=on]:bg-blue-100! data-[state=on]:text-app-primary! aria-pressed:bg-blue-100! aria-pressed:text-app-primary! hover:bg-app-primary hover:text-white "
        >
          <span className="text-xs">{option.weekday}</span>
          <span className="text-sm font-medium">{option.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default DatePicker;
