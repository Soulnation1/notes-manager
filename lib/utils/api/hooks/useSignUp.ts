"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signupUser } from "../authApi";
import { useToast } from "@/components/ui/toast";

export const useSignup = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
        showToast("Account created successfully!");
        console.log(data);
        localStorage.setItem("token", data.token);
        router.push("/notes");
    },
    onError: (error) => {
      console.log(error);
      showToast(" Failed to create account.");
    },
  });
  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
