"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";

import { signupUser } from "../authApi";
import { useToast } from "@/components/ui/toast";

export const useSignup = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
        showToast("Account created successfully!");
        cookie.set("notes-access", data.token, { path: "/" });
        router.push("/notes");
    },
    onError: (error) => {
      showToast(error.message || "Failed to create account.");
    },
  });
  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
