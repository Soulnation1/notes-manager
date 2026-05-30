import Link from "next/link";

type LogoProps = {
  href?: string;
};

export function Logo({ href = "/signin" }: LogoProps) {
  const content = (
    <span className="inline-flex items-center gap-3">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-paper-elevated text-accent shadow-[var(--shadow)]"
        style={{ boxShadow: "var(--shadow)" }}
        aria-hidden
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      </span>
      <span className="flex flex-col items-start gap-0.5">
        <span className="text-xl font-semibold tracking-tight text-ink leading-none">
          Notepaper
        </span>
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-faint">
          Notes
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        {content}
      </Link>
    );
  }

  return content;
}
