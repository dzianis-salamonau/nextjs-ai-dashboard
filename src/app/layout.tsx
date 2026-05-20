import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: "nextjs-ai-dashboard",
    template: "%s · nextjs-ai-dashboard",
  },
  description:
    "Modern SaaS dashboard with Next.js, AI chat, analytics, auth, and file uploads.",
  keywords: [
    "Next.js",
    "React",
    "shadcn",
    "AI dashboard",
    "SaaS",
    "streaming",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
