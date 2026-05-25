import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .pipe(z.email({ message: "Enter a valid email address." }));

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Enter your full name.")
      .min(2, "Name must be at least 2 characters."),
    email: emailField,
    password: z
      .string()
      .min(1, "Enter a password.")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
