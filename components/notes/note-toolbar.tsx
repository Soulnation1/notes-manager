"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PinIcon } from "@/components/notes/note-list-item";
import { useNotes } from "@/components/notes/notes-context";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatNoteDate } from "@/lib/utils/date";
import type { Note } from "@/lib/types/note";

type NoteToolbarProps = {
  note: Note;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit?: () => void;
};

export function NoteToolbar({
  note,
  isEditing,
  onEdit,
  onCancelEdit,
}: NoteToolbarProps) {
  const router = useRouter();
  const { togglePin, deleteNote } = useNotes();
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleDelete() {
    deleteNote(note.id);
    router.push("/notes");
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="text-xs text-ink-faint">
          Updated {formatNoteDate(note.updatedAt)}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            className="gap-1.5 px-3"
            onClick={() => togglePin(note.id)}
            aria-pressed={note.pinned}
          >
            <PinIcon filled={note.pinned} />
            {note.pinned ? "Unpin" : "Pin"}
          </Button>

          {!isEditing && (
            <Button type="button" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
          )}

          {isEditing && onCancelEdit && (
            <Button type="button" variant="ghost" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

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
