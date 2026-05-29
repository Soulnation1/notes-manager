"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { FormField } from "@/components/auth/form-field";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

import { signInSchema } from "@/lib/validations/auth";
import { parseFormData } from "@/lib/validations/parse-form";

import { useSignIn } from "@/lib/utils/api/hooks/useSignIn";

type FieldErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export function SignInForm() {
  const router = useRouter();

  const { mutateAsync, isPending } = useSignIn();

  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrors({});

    const result = parseFormData(
      signInSchema,
      new FormData(event.currentTarget),
    );

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    try {
      const data = await mutateAsync(result.data);

      localStorage.setItem("token", data.token);

      router.push("/notes");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrors({
          form: error.response?.data?.error?.message || "Failed to sign in",
        });

        return;
      }

      setErrors({
        form: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <FormField
        label="Email"
        id="email"
        type="email"
        name="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email}
        disabled={isPending}
      />

      <PasswordField
        label="Password"
        id="password"
        name="password"
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

      {errors.form && (
        <p className="text-sm text-red-600" role="alert">
          {errors.form}
        </p>
      )}

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
