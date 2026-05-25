import Link from "next/link";
import { Button } from "@/components/ui/button";

export function NoteNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h2 className="text-xl font-semibold text-ink">Note not found</h2>
      <p className="mt-2 text-sm text-ink-muted">
        This note may have been deleted or the link is invalid.
      </p>
      <Link href="/notes" className="mt-6">
        <Button variant="secondary">Back to notes</Button>
      </Link>
    </div>
  );
}
