"use client";

import { NoteDetail } from "@/components/notes/note-detail";
import { NoteNotFound } from "@/components/notes/note-not-found";
import { useNotes } from "@/components/notes/notes-context";
import { useSingleNote } from "@/lib/utils/api/hooks/useSingleNote";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


type NoteIdPageProps = {
  id: string;
};

export function NoteIdPage({ id }: NoteIdPageProps) {
  const { getNote } = useNotes();
  const note = getNote(id);

   const { mutateAsync, isPending } = useSingleNote();
  
      const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm<notes>({
      defaultValues: {
        title: "",
        content: "",
      },
      resolver: zodResolver(NoteIdPage),
    });
  
    const onsubmit = async (data: notes) => {
      mutateAsync(data)
    }

  if (!note) {
    return <NoteNotFound />;
  }

  return <NoteDetail note={note} />;
}
