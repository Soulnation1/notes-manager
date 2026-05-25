import { z } from "zod";

export const noteFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Enter a note title.")
    .min(2, "Title must be at least 2 characters."),
  content: z.string().trim().min(1, "Enter note content."),
});

export type NoteFormInput = z.infer<typeof noteFormSchema>;
