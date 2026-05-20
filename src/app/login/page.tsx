import { Suspense } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <Link
        href="/"
        className="relative z-10 mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        nextjs-ai-dashboard
      </Link>
      <Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-xl bg-muted" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
