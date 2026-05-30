import api from "./api";
import type { Note,  NoteInput, Collaborator, GetNoteResponse } from "@/lib/types/note";

// Fetch all notes
export const getNotes = async (): Promise<GetNoteResponse> => {
  const response = await api.get("/api/notes");
  return response.data;
};

//create note

export const createNote = async (noteData: {
  title:string  
  content:string
}) => {
  const response = await api.post("/api/notes", );
  return response.data;
};

// Get a single note by ID
export const getNoteById = async (id: string): Promise<Note> => {
  const response = await api.get(`/api/notes/${id}`);
  return response.data;
};












// Update an existing note
export const updateNote = async ({
  id,
  noteData,
}: {
  id: string;
  noteData: Partial<NoteInput>;
}): Promise<Note> => {
  const response = await api.put(`/api/notes/${id}`, noteData);
  return response.data;
};

// Delete a note
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/api/notes/${id}`);
};

// Toggle pin status of a note
export const togglePinNote = async (id: string): Promise<Note> => {
  const response = await api.patch(`/api/notes/${id}/pin`);
  return response.data;
};

// Add a collaborator to a note
export const addCollaborator = async ({
  noteId,
  collaborator,
}: {
  noteId: string;
  collaborator: Omit<Collaborator, "id">;
}): Promise<Note> => {
  const response = await api.post(`/api/notes/${noteId}/collaborators`, collaborator);
  return response.data;
};

// Remove a collaborator from a note
export const removeCollaborator = async ({
  noteId,
  collaboratorId,
}: {
  noteId: string;
  collaboratorId: string;
}): Promise<Note> => {
  const response = await api.delete(`/api/notes/${noteId}/collaborators/${collaboratorId}`);
  return response.data;
};
