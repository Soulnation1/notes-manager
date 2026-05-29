"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { NoteForm } from "@/components/notes/note-form";
import { useNotes } from "@/components/notes/notes-context";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { formatNoteDate } from "@/lib/utils/date";
import { getNotePreview } from "@/lib/utils/note";
import type { Note } from "@/lib/types/note";
export function NoteListItem({
  note,
  isActive,
}: {
  note: Note;
  isActive: boolean;
}) {
  const router = useRouter();
  const { deleteNote, togglePin, updateNote } = useNotes();
  const { showToast } = useToast();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mouseover", handleClickOutside);
    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  async function handleDelete() {
    try {
      await deleteNote(note.id);
      showToast(`"${note.title}" was deleted.`, "success");
      if (isActive) {
        router.push("/notes");
      }
    } catch {
      showToast("Failed to delete note.", "error");
    }
  }

  async function handleTogglePin() {
    try {
      await togglePin(note.id);
      showToast(
        `"${note.title}" was ${note.pinned ? "unpinned" : "pinned"}.`,
        "success",
      );
    } catch {
      showToast("Failed to toggle pin.", "error");
    }
  }

  async function handleEdit(data: { title: string; content: string }) {
    try {
      await updateNote(note.id, data);
      setEditOpen(false);
    } catch {
      showToast("Failed to update note.", "error");
    }
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
        <Link href={`/notes/${note.id}`} className="block px-3 py-2.5 pr-10">
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

        <div ref={menuRef} className="absolute flex right-2 top-2">
          <div>
            <button
                  type="button"
                  className={[
                    " w-full flex items-center gap-1 rounded-md px-2 py-1.5 text-left text-xs transition-colors focus:outline-none",
                    note.pinned
                      ? "text-accent font-medium hover:bg-accent-muted"
                      : "text-ink hover:bg-accent-muted hover:text-accent",
                  ].join(" ")}
                  role="menuitem"
                  onClick={() => {
                    handleTogglePin();
                    setMenuOpen(false);
                  }}
                >
                  <PinIcon filled={note.pinned} />
                </button>
          </div>
          <button
            type="button"
            className={[
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              menuOpen
                ? "bg-paper text-accent border border-border/40"
                : "text-ink-faint hover:bg-paper hover:text-accent",
            ].join(" ")}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={`Options for ${note.title}`}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            title="Options"
          >
            <MoreVerticalIcon />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 origin-top-right rounded-lg border border-border bg-paper p-1 shadow-lg z-20">
              <div
                className="flex flex-col gap-0.5"
                role="menu"
                aria-orientation="vertical"
              >
                
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-ink transition-colors hover:bg-accent-muted hover:text-accent focus:outline-none"
                  role="menuitem"
                  onClick={() => {
                    setEditOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <EditIcon />
                  <span>Edit</span>
                </button>
                <div className="my-0.5 border-t border-border" />
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-red-600 transition-colors hover:bg-red-50 focus:outline-none"
                  role="menuitem"
                  onClick={() => {
                    setDeleteOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <TrashIcon />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
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

function MoreVerticalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}
