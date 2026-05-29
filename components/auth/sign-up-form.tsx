"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormField } from "@/components/auth/form-field";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

import { signUpSchema } from "@/lib/validations/auth";
import { useSignup } from "@/lib/utils/api/hooks/useSignUp";

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();

  const { mutateAsync, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    const { confirmPassword, ...payload } = data;

    await mutateAsync(payload);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Full name"
        id="name"
        type="text"
        placeholder="Alex Morgan"
        autoComplete="name"
        required
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label="Email"
        id="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        label="Password"
        id="password"
        placeholder="At least 6 characters"
        autoComplete="new-password"
        required
        error={errors.password?.message}
        {...register("password")}
      />
      <PasswordField
        label="Confirm password"
        id="confirmPassword"
        placeholder="Repeat your password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" fullWidth disabled={isPending} className="py-3">
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
