"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NoteForm } from "@/components/notes/note-form";
import { useNotes } from "@/components/notes/notes-context";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatNoteDate } from "@/lib/utils/date";
import { getNotePreview } from "@/lib/utils/note";
import type { Note } from "@/lib/types/note";

type NoteListItemProps = {
  note: Note;
  isActive: boolean;
};

export function NoteListItem({ note, isActive }: NoteListItemProps) {
  const router = useRouter();
  const { deleteNote, togglePin, updateNote } = useNotes();
  const { showToast } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function handleDelete() {
    deleteNote(note.id);
    showToast(`"${note.title}" was deleted.`, "success");
    if (isActive) {
      router.push("/notes");
    }
  }

  function handleTogglePin() {
    togglePin(note.id);
    showToast(
      `"${note.title}" was ${note.pinned ? "unpinned" : "pinned"}.`,
      "success",
    );
  }

  function handleEdit(data: { title: string; content: string }) {
    updateNote(note.id, data);
    setEditOpen(false);
  }

  return (
    <>
      <div
        className={[
          "group relative rounded-lg border transition-colors",
          isActive
            ? "border-accent/40 bg-accent-muted"
            : "border-transparent hover:border-border hover:bg-paper-elevated",
        ].join(" ")}
      >
        <Link href={`/notes/${note.id}`} className="block px-3 py-2.5 pr-28">
          <div className="flex items-start justify-between gap-2">
            <span className="line-clamp-1 text-sm font-medium text-ink">
              {note.title}
            </span>
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

        <div className="absolute right-2 top-2 flex items-center gap-1">
          <button
            type="button"
            className={[
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              note.pinned
                ? "bg-paper text-accent"
                : "text-ink-faint hover:bg-paper hover:text-accent",
            ].join(" ")}
            onClick={handleTogglePin}
            aria-label={`${note.pinned ? "Unpin" : "Pin"} ${note.title}`}
            aria-pressed={note.pinned}
            title={note.pinned ? "Unpin note" : "Pin note"}
          >
            <PinIcon filled={note.pinned} />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-paper hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            onClick={() => setEditOpen(true)}
            aria-label={`Edit ${note.title}`}
            title="Edit note"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40"
            onClick={() => setDeleteOpen(true)}
            aria-label={`Delete ${note.title}`}
            title="Delete note"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit note"
        description="Update the title or content without leaving the notes list."
        showFooter={false}
      >
        <NoteForm
          mode="edit"
          initialTitle={note.title}
          initialContent={note.content}
          onSubmit={handleEdit}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete this note?"
        description={`"${note.title}" will be removed permanently. This cannot be undone.`}
        confirmLabel="Delete note"
        cancelLabel="Keep note"
        onConfirm={handleDelete}
        destructive
      />
    </>
  );
}

function EditIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 20h9" />
      <path d="m16.5 3.5 4 4L8 20l-5 1 1-5 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
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
