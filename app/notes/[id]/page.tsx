import { NoteIdPage } from "@/components/notes/note-id-page";

type NotePageProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  return <NoteIdPage id={id} />;
}
