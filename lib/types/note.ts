export type CollaboratorRole = "editor" | "viewer";

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  role: CollaboratorRole;
  presence?: "editing" | "viewing" | "offline";
};

export type NoteInput = {
  title: string;
  content: string;
  collaborators?: Collaborator[];
};

export interface NoteContent {
  type: string;
  content: unknown[];
}

export interface Note {
  id: string;
  title: string;
  content: NoteContent;
  contentFormat: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
  canEdit: boolean;
  pinned: boolean;
  pinnedAt: string | null;
}

export interface GetNoteResponse {
  owned: Note[];
  shared: Note[];
}