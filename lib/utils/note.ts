import type { GetNoteResponse, Note } from "@/lib/types/note";

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
  console.log("Sorting notes:", notes);
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function splitPinnedNotes(notes: GetNoteResponse): {
  pinned: Note[];
  unpinned: Note[];
} {
  console.log("Splitting notes into pinned and unpinned:", notes);
  const sorted = sortNotes(notes?.owned?.concat(notes?.shared));
  return {
    pinned: sorted.filter((n) => n.pinned),
    unpinned: sorted.filter((n) => !n.pinned),
  };
}
