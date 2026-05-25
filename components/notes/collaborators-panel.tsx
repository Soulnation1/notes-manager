"use client";

import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import { useNotes } from "@/components/notes/notes-context";
import { collaboratorInviteSchema } from "@/lib/validations/collaborator";
import { parseFormData } from "@/lib/validations/parse-form";
import type { Note } from "@/lib/types/note";

type CollaboratorsPanelProps = {
  note: Note;
  readOnly?: boolean;
};

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CollaboratorsPanel({
  note,
  readOnly = false,
}: CollaboratorsPanelProps) {
  const { addCollaborator, removeCollaborator } = useNotes();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = parseFormData(
      collaboratorInviteSchema,
      new FormData(e.currentTarget),
    );

    if (!result.success) {
      setErrors(result.errors);
      showToast("Please fix the invite details.", "error");
      return;
    }

    const added = addCollaborator(note.id, {
      name: result.data.name,
      email: result.data.email,
      role: "editor",
    });

    if (!added) {
      setErrors({ email: "This collaborator already has access." });
      showToast("That collaborator already has access.", "error");
      return;
    }

    setEmail("");
    setName("");
    setErrors({});
    showToast(`${result.data.name} was added as an editor.`, "success");
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-ink">People with access</h3>
      <p className="mt-1 text-xs text-ink-muted">
        Manage who can open and edit this note.
      </p>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-3 rounded-lg border border-border bg-paper px-3 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-muted text-xs font-medium text-accent">
            You
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">You (owner)</p>
            <p className="truncate text-xs text-accent">Editing now</p>
          </div>
          <Badge variant="accent">Owner</Badge>
        </li>

        {note.collaborators.map((collaborator) => (
          <li
            key={collaborator.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-paper px-3 py-2.5"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-border text-xs font-medium text-ink-muted">
              <span>{getInitials(collaborator.name)}</span>
              {collaborator.presence === "editing" && (
                <span
                  className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent"
                  aria-label="Editing now"
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {collaborator.name}
              </p>
              <p className="truncate text-xs text-ink-faint">
                {collaborator.presence === "editing"
                  ? "Editing now"
                  : collaborator.email}
              </p>
            </div>
            <Badge variant={collaborator.role === "editor" ? "accent" : "muted"}>
              {collaborator.role}
            </Badge>
            {!readOnly && (
              <button
                type="button"
                onClick={() =>
                  removeCollaborator(note.id, collaborator.id)
                }
                className="rounded p-1 text-ink-faint hover:bg-border/60 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={`Remove ${collaborator.name}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>

      {!readOnly && (
        <form
          onSubmit={handleAdd}
          className="mt-5 space-y-3 rounded-lg border border-border bg-paper p-3"
          noValidate
        >
          <p className="text-xs font-medium text-ink-muted">Invite an editor</p>
          <div className="space-y-1.5">
            <Label htmlFor={`collab-name-${note.id}`}>Name</Label>
            <Input
              id={`collab-name-${note.id}`}
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="Jordan Lee"
              error={errors.name}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`collab-email-${note.id}`}>Email</Label>
            <Input
              id={`collab-email-${note.id}`}
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              placeholder="jordan@example.com"
              error={errors.email}
            />
          </div>
          <Button type="submit" variant="secondary" fullWidth>
            Add collaborator
          </Button>
        </form>
      )}
    </section>
  );
}
