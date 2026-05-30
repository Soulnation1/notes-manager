import { AuthCard } from "@/components/auth/auth-card";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
      <AuthCard>
        <AuthHeader
          eyebrow="Get started"
          title="Create your account"
          subtitle="A quiet space for the ideas you don't want to lose."
        />

        <SignUpForm />

        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          href="/signin"
        />
      </AuthCard>
  );
}
