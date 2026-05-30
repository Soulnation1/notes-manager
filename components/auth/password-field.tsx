"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { FieldError } from "react-hook-form";

type PasswordFieldProps = {
  label: string;
  id: string;
  required?: boolean;
  error?: string | FieldError | undefined;
  labelAction?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordField({
  label,
  id,
  required,
  error,
  labelAction,
  ...inputProps
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {labelAction}
      </div>
      <PasswordInput id={id} error={error} required={required} {...inputProps} />
    </div>
  );
}
