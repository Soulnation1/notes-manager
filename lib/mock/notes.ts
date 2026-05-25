import type { Note } from "@/lib/types/note";

export const initialNotes: Note[] = [
  {
    id: "note-1",
    title: "Q2 planning center",
    content:
      "Focus areas:\n- Mobile onboarding refresh\n- Shared notes with collaborators\n- Pin important notes to the top. for the first time",
    pinned: false,
    updatedAt: "2026-05-24T14:30:00.000Z",
    collaborators: [
      {
        id: "collab-1",
        name: "Johidan Lee",
        email: "johidan@example.com",
        role: "editor",
      },
    ],
  },
  {
    id: "note-4",
    title: "Q3 boughus module for 2026",
    content:
      "Focus areas:\n- Mobile onboarding method refresh\n- Shared notes with collaborators\n- Pin important notes to the top",
    pinned: false,
    updatedAt: "2026-05-24T14:30:00.000Z",
    collaborators: [
      {
        id: "collab-2",
        name: "Jordan Lee",
        email: "jordan@example.com",
        role: "editor",
      },
    ],
  },
  {
    id: "note-1",
    title: "Q4 planning ideas",
    content:
      "Focus areas:\n- Mobile onboarding method refresh\n- Shared notes with collaborators\n- Pin important notes to the top",
    pinned: false,
    updatedAt: "2026-05-24T14:30:00.000Z",
    collaborators: [
      {
        id: "collab-3",
        name: "Jordan Lee",
        email: "jordan@example.com",
        role: "editor",
      },
    ],
  },
  {
    id: "note-2",
    title: "Reading list",
    content: "The Pragmatic Programmer\nDeep Work\nThinking in Systems",
    pinned: false,
    updatedAt: "2026-05-22T09:15:00.000Z",
    collaborators: [],
  },
  {
    id: "note-3",
    title: "Meeting notes — product sync",
    content:
      "Decisions:\n1. Ship notes MVP with list + detail views\n2. Add collaborator editing in phase two",
    pinned: false,
    updatedAt: "2026-05-20T16:45:00.000Z",
    collaborators: [
      {
        id: "collab-2",
        name: "Sam Rivera",
        email: "sam@example.com",
        role: "editor",
      },
      {
        id: "collab-3",
        name: "Alex Morgan",
        email: "alex@example.com",
        role: "viewer",
      },
    ],
  },
];
