import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  FileUp,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Analytics dashboard",
    description:
      "Revenue charts, KPI cards, and activity feeds with Recharts — ready to wire to your API.",
  },
  {
    icon: Bot,
    title: "AI chat with streaming",
    description:
      "Token-by-token responses via Vercel AI SDK. Demo mode works without an API key.",
  },
  {
    icon: FileUp,
    title: "File upload",
    description:
      "Drag-and-drop uploads with progress, validation, and server-side storage.",
  },
  {
    icon: Lock,
    title: "Auth.js",
    description:
      "Protected routes, session handling, and credentials flow out of the box.",
  },
];

const stack = [
  "Next.js 16",
  "React 19",
  "shadcn/ui",
  "Tailwind CSS v4",
  "Auth.js",
  "Vercel AI SDK",
  "Recharts",
  "react-markdown",
];

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_85%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          nextjs-ai-dashboard
        </Link>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              Open dashboard
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <section className="py-16 text-center md:py-24">
          <Badge variant="secondary" className="mb-6 font-normal">
            <Zap className="mr-1 h-3 w-3" />
            Portfolio-ready SaaS starter
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Modern AI dashboard for your{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              GitHub profile
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A polished Next.js frontend with authentication, analytics, streaming
            AI chat, file uploads, and markdown rendering — built with shadcn/ui.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {stack.map((tech) => (
              <Badge key={tech} variant="outline" className="font-normal">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-border/60 bg-card/60 backdrop-blur-sm transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </section>

        <section className="mt-24 rounded-2xl border bg-card/60 p-8 text-center backdrop-blur-sm md:p-12">
          <h2 className="text-2xl font-semibold">Try the demo in seconds</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Sign in with <code className="rounded bg-muted px-1.5 py-0.5 text-sm">demo@example.com</code>{" "}
            / <code className="rounded bg-muted px-1.5 py-0.5 text-sm">demo123</code>
            — no setup required.
          </p>
          <Button className="mt-6" size="lg" asChild>
            <Link href="/login">Launch dashboard</Link>
          </Button>
        </section>
      </main>

      <footer className="relative z-10 border-t py-8 text-center text-sm text-muted-foreground">
        Built with Next.js · MIT License
      </footer>
    </div>
  );
}
