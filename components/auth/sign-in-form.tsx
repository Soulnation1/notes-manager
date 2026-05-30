"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { FormField } from "@/components/auth/form-field";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

import { SignInInput, signInSchema } from "@/lib/validations/auth";

import { useSignIn } from "@/lib/utils/api/hooks/useSignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignInForm() {

  const { mutateAsync, isPending } = useSignIn();

    const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onsubmit = async (data: SignInInput) => {
    mutateAsync(data)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onsubmit)} noValidate>
      <FormField
        label="Email"
        id="email"
        type="email"
        {...register("email")}
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
        disabled={isPending}
      />

      <PasswordField
        label="Password"
        id="password"
        {...register("password")}
        placeholder="••••••••"
        autoComplete="current-password"
        required
        error={errors.password}
        disabled={isPending}
        labelAction={
          <button
            type="button"
            className="text-xs font-medium text-accent hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded"
          >
            Forgot password?
          </button>
        }
      />
      <div className="pt-1">
        <Button
          type="submit"
          fullWidth
          className="py-3 text-[0.9375rem]"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
