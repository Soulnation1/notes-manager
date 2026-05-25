import type { Note } from "@/lib/types/note";

export function getNotePreview(content: string, maxLength = 80): string {
  const line = content.trim().split("\n")[0] ?? "";
  if (line.length <= maxLength) {
    return line || "No content yet";
  }
  return `${line.slice(0, maxLength)}…`;
}

export function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function splitPinnedNotes(notes: Note[]): {
  pinned: Note[];
  unpinned: Note[];
} {
  const sorted = sortNotes(notes);
  return {
    pinned: sorted.filter((n) => n.pinned),
    unpinned: sorted.filter((n) => !n.pinned),
  };
}
