import Link from "next/link";
import { Button } from "@/components/ui/button";

type NoteEmptyStateProps = {
  title?: string;
  description?: string;
};

export function NoteEmptyState({
  title = "Select a note",
  description = "Choose a note from the sidebar or create a new one to get started.",
}: NoteEmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-muted text-accent"
        aria-hidden
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>
      <Link href="/notes/new" className="mt-6">
        <Button>+ New note</Button>
      </Link>
    </div>
  );
}
