"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/auth/form-field";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/validations/auth";
import { parseFormData } from "@/lib/validations/parse-form";

type FieldErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export function SignInForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const result = parseFormData(signInSchema, new FormData(event.currentTarget));

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push("/notes");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
      />

      <PasswordField
        label="Password"
        id="password"
        name="password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        error={errors.password}
        disabled={isSubmitting}
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
