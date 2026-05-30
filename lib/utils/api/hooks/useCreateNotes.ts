"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { createNote } from "../notesApi";

export const useCreateNotes = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const queryClient = useQueryClient()
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
        showToast("Note created successfully");
        queryClient.invalidateQueries({queryKey:["notes"]})
        router.push("/notes");
    },
    onError: (error) => {
      showToast(error.message || "fail to create note.");
    },
  });
  return {
    error,
    isPending,
    mutateAsync,
  };
};
