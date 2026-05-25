"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialNotes } from "@/lib/mock/notes";
import type {
  Collaborator,
  CollaboratorRole,
  Note,
  NoteInput,
} from "@/lib/types/note";

type NotesContextValue = {
  notes: Note[];
  getNote: (id: string) => Note | undefined;
  createNote: (input: NoteInput) => Note;
  updateNote: (id: string, input: Partial<NoteInput>) => Note | undefined;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  addCollaborator: (
    noteId: string,
    collaborator: Omit<Collaborator, "id">,
  ) => void;
  removeCollaborator: (noteId: string, collaboratorId: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const getNote = useCallback(
    (id: string) => notes.find((note) => note.id === id),
    [notes],
  );

  const createNote = useCallback((input: NoteInput): Note => {
    const note: Note = {
      id: createId("note"),
      title: input.title.trim() || "Untitled note",
      content: input.content,
      pinned: false,
      updatedAt: new Date().toISOString(),
      collaborators: input.collaborators ?? [],
    };
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  const updateNote = useCallback(
    (id: string, input: Partial<NoteInput>): Note | undefined => {
      let updated: Note | undefined;
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id !== id) {
            return note;
          }
          updated = {
            ...note,
            ...(input.title !== undefined && {
              title: input.title.trim() || "Untitled note",
            }),
            ...(input.content !== undefined && { content: input.content }),
            ...(input.collaborators !== undefined && {
              collaborators: input.collaborators,
            }),
            updatedAt: new Date().toISOString(),
          };
          return updated;
        }),
      );
      return updated;
    },
    [],
  );

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  }, []);

  const addCollaborator = useCallback(
    (
      noteId: string,
      collaborator: Omit<Collaborator, "id"> & { role?: CollaboratorRole },
    ) => {
      setNotes((prev) =>
        prev.map((note) => {
          if (note.id !== noteId) {
            return note;
          }
          if (
            note.collaborators.some((c) => c.email === collaborator.email)
          ) {
            return note;
          }
          return {
            ...note,
            collaborators: [
              ...note.collaborators,
              {
                id: createId("collab"),
                name: collaborator.name,
                email: collaborator.email,
                role: collaborator.role ?? "editor",
              },
            ],
            updatedAt: new Date().toISOString(),
          };
        }),
      );
    },
    [],
  );

  const removeCollaborator = useCallback(
    (noteId: string, collaboratorId: string) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? {
                ...note,
                collaborators: note.collaborators.filter(
                  (c) => c.id !== collaboratorId,
                ),
                updatedAt: new Date().toISOString(),
              }
            : note,
        ),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      notes,
      getNote,
      createNote,
      updateNote,
      deleteNote,
      togglePin,
      addCollaborator,
      removeCollaborator,
    }),
    [
      notes,
      getNote,
      createNote,
      updateNote,
      deleteNote,
      togglePin,
      addCollaborator,
      removeCollaborator,
    ],
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
