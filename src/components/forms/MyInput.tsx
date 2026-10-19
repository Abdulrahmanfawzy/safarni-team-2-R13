"use client";

import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { type FieldValues, type Control, type Path } from "react-hook-form";
import {
  ComponentProps,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

// Input Icon
const Icon = ({
  icon,
  dir = "left-2",
}: {
  icon: ReactNode;
  dir?: "left-2" | "right-2";
}) => (
  <div className={cn("absolute top-1/2 text-gray-500 -translate-y-1/2", dir)}>
    {icon}
  </div>
);

interface MyInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isPassword: boolean;
  icon: ReactNode;
  type: HTMLInputTypeAttribute;
}

const MyInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isPassword = false,
  icon,
  type,
  ...props
}: MyInputProps<T> & ComponentProps<"input">) => {
  const [passwordType, setPasswordType] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        isPassword ? (
          <>
            <Field>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <div className="relative">
                <Input
                  className="pl-10"
                  type={passwordType ? "text" : type}
                  id={name}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                />
                {/* Icon */}
                <Icon icon={icon} />

                {/* change type icon */}

                <button
                  type="button"
                  onClick={() => setPasswordType((prev) => !prev)}
                >
                  <Icon
                    dir="right-2"
                    icon={passwordType ? <Eye /> : <EyeOff />}
                  />
                </button>
              </div>
            </Field>
            {fieldState?.error && (
              <FieldError>{fieldState?.error?.message}</FieldError>
            )}
          </>
        ) : (
          <>
            <Field>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <div className="relative">
                <Input
                  type={type}
                  className="pl-10"
                  id={name}
                  placeholder={placeholder}
                  {...field}
                />
                {/* Icon */}
                <Icon icon={icon} />
              </div>
            </Field>
            {fieldState?.error && (
              <FieldError>{fieldState?.error?.message}</FieldError>
            )}
          </>
        )
      }
    />
  );
};

export default MyInput;
