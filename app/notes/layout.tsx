import type { Metadata } from "next";
import { NotesProvider } from "@/components/notes/notes-context";
import { NotesShell } from "@/components/notes/notes-shell";

export const metadata: Metadata = {
  title: "Notes — Notepaper",
  description: "Create, view, and manage your notes.",
};

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotesProvider>
      <NotesShell>{children}</NotesShell>
    </NotesProvider>
  );
}
