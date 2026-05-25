"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { noteFormSchema } from "@/lib/validations/note";
import { parseFormData } from "@/lib/validations/parse-form";

type NoteFormProps = {
  mode: "create" | "edit";
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

export function NoteForm({
  mode,
  initialTitle = "",
  initialContent = "",
  onSubmit,
  onCancel,
  submitLabel,
}: NoteFormProps) {
  const { showToast } = useToast();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = parseFormData(noteFormSchema, new FormData(e.currentTarget));

    if (!result.success) {
      setErrors(result.errors);
      showToast("Please fix the note details.", "error");
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  const label =
    submitLabel ?? (mode === "create" ? "Create note" : "Save changes");

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="note-title" className="text-sm font-medium text-ink">
          Title
        </label>
        <Input
          id="note-title"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
          placeholder="Note title"
          className="text-lg font-medium"
          error={errors.title}
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
          onChange={(value) => {
            setContent(value);
            setErrors((prev) => ({ ...prev, content: "" }));
          }}
          placeholder="Start writing…"
          className="min-h-[280px] font-normal"
          error={errors.content}
        />
      </div>

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
