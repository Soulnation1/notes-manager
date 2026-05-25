import { z } from "zod";

export const collaboratorInviteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter the collaborator's name.")
    .min(2, "Name must be at least 2 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter the collaborator's email address.")
    .pipe(z.email({ message: "Enter a valid email address." })),
});

export type CollaboratorInviteInput = z.infer<
  typeof collaboratorInviteSchema
>;
