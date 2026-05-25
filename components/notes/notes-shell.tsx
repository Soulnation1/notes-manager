"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NotesSidebar } from "@/components/notes/notes-sidebar";

type NotesShellProps = {
  children: ReactNode;
};

export function NotesShell({ children }: NotesShellProps) {
  const pathname = usePathname();
  const isListRoute = pathname === "/notes";

  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <NotesSidebar
        className={isListRoute ? "flex" : "hidden md:flex"}
      />
      <main
        className={[
          "h-screen min-w-0 flex-1 flex-col overflow-y-auto bg-paper",
          isListRoute ? "hidden md:flex" : "flex",
        ].join(" ")}
      >
        {children}
      </main>
    </div>
  );
}
