"use client";

import { useState } from "react";
import { CollaboratorsPanel } from "@/components/notes/collaborators-panel";
import { NoteForm } from "@/components/notes/note-form";
import { NoteToolbar } from "@/components/notes/note-toolbar";
import { useNotes } from "@/components/notes/notes-context";
import type { Note } from "@/lib/types/note";

type NoteDetailProps = {
  note: Note;
};

export function NoteDetail({ note }: NoteDetailProps) {
  const { updateNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);

  function handleSave(data: { title: string; content: string }) {
    updateNote(note.id, data);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-8">
        <NoteToolbar
          note={note}
          isEditing
          onEdit={() => {}}
          onCancelEdit={() => setIsEditing(false)}
        />
        <NoteForm
          mode="edit"
          note={note}
          initialTitle={note.title}
          initialContent={note.content}
          onSubmit={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-8">
      <NoteToolbar
        note={note}
        isEditing={false}
        onEdit={() => setIsEditing(true)}
      />

      <article className="mt-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {note.title}
        </h1>
        <div className="mt-6 whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-ink">
          {note.content || (
            <p className="text-ink-faint italic">This note is empty.</p>
          )}
        </div>
      </article>

      <div className="mt-10">
        <CollaboratorsPanel note={note} />
      </div>
    </div>
  );
}
