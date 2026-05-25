"use client";

import Link from "next/link";
import { formatNoteDate } from "@/lib/utils/date";
import { getNotePreview } from "@/lib/utils/note";
import type { Note } from "@/lib/types/note";

type NoteListItemProps = {
  note: Note;
  isActive: boolean;
};

export function NoteListItem({ note, isActive }: NoteListItemProps) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className={[
        "group block rounded-lg border px-3 py-2.5 transition-colors",
        isActive
          ? "border-accent/40 bg-accent-muted"
          : "border-transparent hover:border-border hover:bg-paper-elevated",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="line-clamp-1 text-sm font-medium text-ink">
          {note.title}
        </span>
        {note.pinned && (
          <PinIcon filled className="shrink-0 text-accent" />
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-ink-muted">
        {getNotePreview(note.content)}
      </p>
      <div className="mt-2 flex items-center gap-2 text-[0.6875rem] text-ink-faint">
        <span>{formatNoteDate(note.updatedAt)}</span>
        {note.collaborators.length > 0 && (
          <>
            <span aria-hidden>·</span>
            <span>
              {note.collaborators.length} collaborator
              {note.collaborators.length === 1 ? "" : "s"}
            </span>
          </>
        )}
      </div>
    </Link>
  );
}

export function PinIcon({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 17v5" />
      <path d="M9 3h6l1 7H8l1-7z" />
      <path d="M9 10v4l-3 3h12l-3-3v-4" />
    </svg>
  );
}
