"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NoteForm } from "@/components/notes/note-form";
import { useNotes } from "@/components/notes/notes-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function CreateNoteView() {
  const router = useRouter();
  const { createNote } = useNotes();
  const { showToast } = useToast();

  function handleCreate(data: { title: string; content: string }) {
    const note = createNote(data);
    showToast(`"${note.title}" was created.`, "success");
    router.push(`/notes/${note.id}`);
  }

  return (
    <div className="w-full max-w-3xl px-4 py-6 sm:px-8 sm:py-8">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-semibold text-ink">New note</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Add a title and content. You can invite collaborators after saving.
          </p>
        </div>
        <Link href="/notes">
          <Button type="button" variant="ghost">
            Back
          </Button>
        </Link>
      </div>

      <NoteForm mode="create" onSubmit={handleCreate} />
    </div>
  );
}
