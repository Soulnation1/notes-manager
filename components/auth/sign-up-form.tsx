"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/auth/form-field";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/lib/validations/auth";
import { parseFormData } from "@/lib/validations/parse-form";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export function SignUpForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const result = parseFormData(signUpSchema, new FormData(event.currentTarget));

    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: call sign-up API with result.data when auth is wired up
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push("/signin");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <FormField
        label="Full name"
        id="name"
        type="text"
        name="name"
        placeholder="Alex Morgan"
        autoComplete="name"
        required
        error={errors.name}
        disabled={isSubmitting}
      />

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
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        error={errors.password}
        disabled={isSubmitting}
      />

      <PasswordField
        label="Confirm password"
        id="confirm-password"
        name="confirmPassword"
        placeholder="Repeat your password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword}
        disabled={isSubmitting}
      />

      <p className="text-xs leading-relaxed text-ink-faint">
        By signing up, you agree to our terms of service and privacy policy.
      </p>

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
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
