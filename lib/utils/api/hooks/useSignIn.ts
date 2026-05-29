"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signInUser,  } from "../authApi";
import { useToast } from "@/components/ui/toast";

export const useSignIn = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      showToast("Signed in successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      showToast("Failed to sign in.");
    },
  });
  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
