import Link from "next/link";

type AuthFooterProps = {
  text: string;
  linkText: string;
  href: string;
};

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <p className="mt-8 border-t border-border pt-6 text-center text-sm text-ink-muted">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-accent hover:text-accent-hover underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
      >
        {linkText}
      </Link>
    </p>
  );
}
