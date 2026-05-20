const DEMO_RESPONSES: Record<string, string> = {
  default: `I'm running in **demo mode** — no API key required.

Here's what this dashboard showcases:

- **Streaming responses** token-by-token
- **Markdown** with code blocks and lists
- **File context** when you attach documents

Try asking about analytics, or add \`OPENAI_API_KEY\` to \`.env\` for live GPT responses.`,

  analytics: `## Analytics snapshot

| Metric | Value | Change |
|--------|-------|--------|
| Revenue | $48,290 | +12.4% |
| Users | 2,847 | +8.2% |
| Sessions | 12,403 | -2.1% |

\`\`\`ts
const conversion = (signups / sessions) * 100;
// Current: 3.24%
\`\`\`

Revenue trend is **up 18%** quarter-over-quarter. Consider A/B testing the checkout flow to lift conversion.`,

  hello: `Hello! 👋 Welcome to **nextjs-ai-dashboard**.

I'm a polished SaaS starter built with:

1. Next.js App Router
2. shadcn/ui components
3. Auth.js credentials flow
4. Vercel AI SDK streaming

What would you like to explore?`,
};

export function getDemoResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("analytics") || lower.includes("revenue") || lower.includes("metric")) {
    return DEMO_RESPONSES.analytics;
  }
  if (lower.match(/^(hi|hello|hey)\b/)) {
    return DEMO_RESPONSES.hello;
  }
  return DEMO_RESPONSES.default;
}

export async function* streamDemoText(text: string): AsyncGenerator<string> {
  const words = text.split(/(\s+)/);
  for (const chunk of words) {
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 24));
    yield chunk;
  }
}
