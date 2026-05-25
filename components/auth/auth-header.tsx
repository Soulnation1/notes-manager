type AuthHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function AuthHeader({ eyebrow, title, subtitle }: AuthHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-8">
      <div className="flex items-center gap-2.5">
        <span
          className="h-px w-6 shrink-0 bg-accent/50"
          aria-hidden
        />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      </div>

      <h1 className="mt-4 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 max-w-[28ch] text-[0.9375rem] leading-relaxed text-ink-muted">
          {subtitle}
        </p>
      )}
    </header>
  );
}
