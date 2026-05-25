import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ error, className = "", id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        className={[
          "w-full rounded-lg border bg-paper-elevated px-3.5 py-2.5 text-[0.9375rem] text-ink",
          "placeholder:text-ink-faint",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-border-focus",
          error
            ? "border-red-400 focus:ring-red-400/30 focus:border-red-400"
            : "border-border hover:border-ink-faint/60",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && id ? `${id}-error` : undefined}
        {...props}
      />
      {error && id && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
