"use client";

import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/toast";
import { getNoteById } from "../notesApi";

export const useSingleNote = () => {
    const { showToast } = useToast();
    const { data, error, isPending, mutateAsync } = useMutation({
        mutationFn: getNoteById,
        onSuccess: (note) => {
            showToast("note loaded successfully!");
        },
        onError: (error) => {
            showToast(error.message || "Failed to load note.");
        },
    });
    return {
        data,
        error,
        isPending,
        mutateAsync,
    };
};
