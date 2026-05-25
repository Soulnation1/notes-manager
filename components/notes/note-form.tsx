"use client";

import { useState, type FormEvent } from "react";
import { CollaboratorsPanel } from "@/components/notes/collaborators-panel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Note } from "@/lib/types/note";

type NoteFormProps = {
  mode: "create" | "edit";
  initialTitle?: string;
  initialContent?: string;
  note?: Note;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

export function NoteForm({
  mode,
  initialTitle = "",
  initialContent = "",
  note,
  onSubmit,
  onCancel,
  submitLabel,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ title, content });
  }

  const label =
    submitLabel ?? (mode === "create" ? "Create note" : "Save changes");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <label htmlFor="note-title" className="text-sm font-medium text-ink">
          Title
        </label>
        <Input
          id="note-title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="text-lg font-medium"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="note-content" className="text-sm font-medium text-ink">
          Content
        </label>
        <Textarea
          id="note-content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing…"
          className="min-h-[280px] font-normal"
        />
      </div>

      {note && mode === "edit" && (
        <CollaboratorsPanel note={note} />
      )}

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button type="submit">{label}</Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
