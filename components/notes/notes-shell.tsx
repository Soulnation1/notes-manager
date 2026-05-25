"use client";

import type { ReactNode } from "react";
import { NotesSidebar } from "@/components/notes/notes-sidebar";

type NotesShellProps = {
  children: ReactNode;
};

export function NotesShell({ children }: NotesShellProps) {
  return (
    <div className="flex min-h-screen bg-paper">
      <NotesSidebar />
      <main className="flex min-h-screen flex-1 flex-col overflow-hidden bg-paper">
        {children}
      </main>
    </div>
  );
}
