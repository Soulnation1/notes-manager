import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          eyebrow="Sign in"
          title="Welcome back"
          subtitle="Pick up your notes right where you left off."
        />

        <SignInForm />

        <AuthFooter
          text="Don't have an account?"
          linkText="Create account"
          href="/signup"
        />
      </AuthCard>
    </AuthLayout>
  );
}
