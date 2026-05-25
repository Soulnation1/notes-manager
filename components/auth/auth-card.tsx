import type { ReactNode } from "react";

type AuthCardProps = {
  children: ReactNode;
};

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-paper-elevated"
      style={{ boxShadow: "var(--shadow-lg)" }}
    >
      <div
        className="h-1 bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20"
        aria-hidden
      />
      <div className="px-7 py-8 sm:px-9 sm:py-10">{children}</div>
    </div>
  );
}
