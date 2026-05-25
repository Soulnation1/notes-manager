"use client";
import { ArrowLeftIcon,  PlusIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  CollaboratorsPanel,
  getInitials,
} from "@/components/notes/collaborators-panel";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatNoteDate } from "@/lib/utils/date";
import type { Note } from "@/lib/types/note";

type NoteToolbarProps = {
  note: Note;
};

export function NoteToolbar({ note }: NoteToolbarProps) {
  const [collaboratorsOpen, setCollaboratorsOpen] = useState(false);
  const activeEditors = note.collaborators.filter(
    (collaborator) => collaborator.presence === "editing",
  );
  const editingNow = [
    { id: "owner", name: "You" },
    ...activeEditors.map((editor) => ({
      id: editor.id,
      name: editor.name,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <Link
            href="/notes"
            className="mb-1 inline-flex text-xs font-medium text-accent md:hidden"
          >
            <p className="mr-2 text-xs font-medium text-accent "><span><ArrowLeftIcon className="w-4 h-4 inline" /></span>back </p>          </Link>
          <p className="text-xs text-ink-faint">
            Updated {formatNoteDate(note.updatedAt)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 pr-1">
            {editingNow.length > 0 && (
              <div
                className="flex -space-x-2"
                aria-label={`${editingNow.length} person${editingNow.length === 1 ? "" : "s"
                  } editing now`}
              >
                {editingNow.slice(0, 3).map((editor) => (
                  <span
                    key={editor.id}
                    title={`${editor.name} is editing`}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper bg-accent-muted text-[0.6875rem] font-semibold text-accent shadow-sm"
                  >
                    {getInitials(editor.name)}
                    <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-accent" />
                  </span>
                ))}
              </div>
            )}
            <Button
              type="button"
              variant="primary"
              className="px-2"
              onClick={() => setCollaboratorsOpen(true)}
            >
              <PlusIcon className="w-4 h-4 inline" /> Collaborators
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={collaboratorsOpen}
        onClose={() => setCollaboratorsOpen(false)}
        title="Collaborators"
        description={
          activeEditors.length > 0
            ? `${activeEditors
              .map((editor) => editor.name)
              .join(", ")} editing with you now.`
            : "Only you are editing right now."
        }
        cancelLabel="Done"
      >
        <CollaboratorsPanel note={note} />
      </Modal>
    </>
  );
}
