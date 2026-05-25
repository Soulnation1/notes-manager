import type { Note } from "@/lib/types/note";

function stripHtml(content: string): string {
  return content
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function getNotePreview(content: string, maxLength = 80): string {
  const line = stripHtml(content).trim().split("\n")[0] ?? "";
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
