export type CollaboratorRole = "editor" | "viewer";

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  role: CollaboratorRole;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  updatedAt: string;
  collaborators: Collaborator[];
};

export type NoteInput = {
  title: string;
  content: string;
  collaborators?: Collaborator[];
};
