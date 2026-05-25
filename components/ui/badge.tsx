type BadgeVariant = "default" | "accent" | "muted";

import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-border/80 text-ink-muted",
  accent: "bg-accent-muted text-accent",
  muted: "bg-paper text-ink-faint border border-border",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        variantStyles[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
