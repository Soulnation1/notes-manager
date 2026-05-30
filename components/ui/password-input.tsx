"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: string | FieldError | undefined;
};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function PasswordInput({
  error,
  className = "",
  id: idProp,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const toggleId = `${id}-toggle`;

  const inputClassName = [
    "w-full rounded-lg border bg-paper-elevated py-2.5 pl-3.5 pr-11 text-[0.9375rem] text-ink",
    "placeholder:text-ink-faint",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-border-focus",
    error
      ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
      : "border-border hover:border-ink-faint/60",
    disabled ? "cursor-not-allowed opacity-60" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={inputClassName}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <button
          id={toggleId}
          type="button"
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
          className={[
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-ink-faint",
            "transition-colors hover:text-ink hover:bg-border/50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            "disabled:pointer-events-none disabled:opacity-50",
          ].join(" ")}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-controls={id}
          aria-pressed={visible}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
}
