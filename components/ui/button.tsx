import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent/40",
  secondary:
    "bg-accent-muted text-accent hover:bg-accent/15 focus-visible:ring-accent/30",
  ghost:
    "bg-transparent text-ink-muted hover:bg-border/60 hover:text-ink focus-visible:ring-ink/20",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-lg px-4 py-2.5",
        "text-sm font-medium transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-elevated",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
