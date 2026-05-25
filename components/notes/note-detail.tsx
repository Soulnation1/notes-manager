"use client";

import { NoteToolbar } from "@/components/notes/note-toolbar";
import type { Note } from "@/lib/types/note";

type NoteDetailProps = {
  note: Note;
};

export function NoteDetail({ note }: NoteDetailProps) {
  const hasRichContent = note.content.trim().startsWith("<");

  return (
    <div className="w-full max-w-4xl px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
      <NoteToolbar note={note} />

      <article className="mt-6 min-h-[calc(100vh-11rem)] rounded-lg border border-border bg-paper-elevated px-6 py-8 shadow-[var(--shadow)] sm:px-12 sm:py-10">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {note.title}
        </h1>
        <div className="mt-6 text-[0.9375rem] leading-relaxed text-ink [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
          {note.content && hasRichContent ? (
            <div dangerouslySetInnerHTML={{ __html: note.content }} />
          ) : note.content ? (
            <div className="whitespace-pre-wrap">{note.content}</div>
          ) : (
            <p className="text-ink-faint italic">This note is empty.</p>
          )}
        </div>
      </article>
    </div>
  );
}
