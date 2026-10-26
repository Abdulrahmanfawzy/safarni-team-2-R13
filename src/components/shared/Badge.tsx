import { ReactNode } from "react";
import { cn } from "@/lib/utils";
interface BadgeProps {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
}
const Badge = ({
  children,
  textColor = "text-app-primary",
  bgColor = "bg-sky-50",
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-full  tracking-wider px-4 py-2 text-sm  font-medium",
        bgColor,
        textColor,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
