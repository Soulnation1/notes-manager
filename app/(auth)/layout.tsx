import type { ReactNode } from "react";
import { Logo } from "../../components/logo";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-muted/50 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-border/80 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-104">
        <div className="mb-8 flex flex-col items-center gap-2 text-center sm:mb-10">
          <Logo href="/signin" />
          <p className="text-sm text-ink-faint">Capture ideas. Stay organized.</p>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout
