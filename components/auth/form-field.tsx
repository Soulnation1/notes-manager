import type { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

type FormFieldProps = {
  label: string;
  id: string;
  required?: boolean;
  error?: string | FieldError | undefined;
  labelAction?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({
  label,
  id,
  required,
  error,
  labelAction,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {labelAction}
      </div>
      <Input id={id} error={error} required={required} {...inputProps} />
    </div>
  );
}
