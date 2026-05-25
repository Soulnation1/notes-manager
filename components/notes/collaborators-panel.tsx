"use client";

import { useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotes } from "@/components/notes/notes-context";
import type { Note } from "@/lib/types/note";

type CollaboratorsPanelProps = {
  note: Note;
  readOnly?: boolean;
};

function getInitials(name: string): string {
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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    if (!trimmedEmail || !trimmedName) {
      return;
    }
    addCollaborator(note.id, {
      name: trimmedName,
      email: trimmedEmail,
      role: "editor",
    });
    setEmail("");
    setName("");
  }

  return (
    <section className="rounded-xl border border-border bg-paper p-4">
      <h3 className="text-sm font-semibold text-ink">Collaborators</h3>
      <p className="mt-1 text-xs text-ink-muted">
        Editors can change this note. Viewers can read only.
      </p>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-3 rounded-lg bg-paper-elevated px-3 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-muted text-xs font-medium text-accent">
            You
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">You (owner)</p>
            <p className="truncate text-xs text-ink-faint">you@notepaper.app</p>
          </div>
          <Badge variant="accent">Owner</Badge>
        </li>

        {note.collaborators.map((collaborator) => (
          <li
            key={collaborator.id}
            className="flex items-center gap-3 rounded-lg bg-paper-elevated px-3 py-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border text-xs font-medium text-ink-muted">
              {getInitials(collaborator.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {collaborator.name}
              </p>
              <p className="truncate text-xs text-ink-faint">
                {collaborator.email}
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
        <form onSubmit={handleAdd} className="mt-4 space-y-3 border-t border-border pt-4">
          <p className="text-xs font-medium text-ink-muted">Invite editor</p>
          <div className="space-y-1.5">
            <Label htmlFor={`collab-name-${note.id}`}>Name</Label>
            <Input
              id={`collab-name-${note.id}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Lee"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`collab-email-${note.id}`}>Email</Label>
            <Input
              id={`collab-email-${note.id}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@example.com"
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
