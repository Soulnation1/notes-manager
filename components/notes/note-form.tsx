"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateNotes } from "@/lib/utils/api/hooks/useCreateNotes";
import { NoteFormInput, noteFormSchema } from "@/lib/validations/note";

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
  
  onCancel,
  submitLabel,
}: NoteFormProps) {
  
  const {mutateAsync,isPending } = useCreateNotes()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, },
  } = useForm<NoteFormInput>({
    defaultValues: {
      title: initialTitle,
      content: initialContent,
    },
    resolver: zodResolver(noteFormSchema),
  });
   const onsubmit = async (data: NoteFormInput) => {
      mutateAsync(data)
    }

  const label =
    submitLabel ?? (mode === "create" ? "Create note" : "Save changes");

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="note-title" className="text-sm font-medium text-ink">
          Title
        </label>

        <Input
          id="note-title"
          placeholder="Note title"
          className="text-lg font-medium"
          error={errors.title?.message}
          {...register("title")}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="note-content" className="text-sm font-medium text-ink">
          Content
        </label>

        <Textarea
          id="note-content"
          placeholder="Start writing..."
          className="min-h-[280px] font-normal"
          value={getValues("content")}
          onChange={(value) => setValue("content", value)}
          error={errors.content?.message}
        />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {label}
        </Button>

        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}