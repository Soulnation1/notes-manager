import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({
  children,
  required,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-ink ${className}`.trim()}
      {...props}
    >
      {children}
      {required && (
        <span className="text-accent" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}
