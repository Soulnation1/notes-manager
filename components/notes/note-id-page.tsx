"use client";

import { NoteDetail } from "@/components/notes/note-detail";
import { NoteNotFound } from "@/components/notes/note-not-found";
import { useNotes } from "@/components/notes/notes-context";

type NoteIdPageProps = {
  id: string;
};

export function NoteIdPage({ id }: NoteIdPageProps) {
  const { getNote } = useNotes();
  const note = getNote(id);

  if (!note) {
    return <NoteNotFound />;
  }

  return <NoteDetail note={note} />;
}
