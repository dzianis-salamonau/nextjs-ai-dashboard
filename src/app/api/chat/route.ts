import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { auth } from "@/auth";
import { getDemoResponse, streamDemoText } from "@/lib/demo-stream";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const message = (formData.get("message") as string) ?? "";
  const file = formData.get("file") as File | null;

  let fileContext = "";
  if (file) {
    const text = await file.text();
    fileContext = `\n\nUser attached file "${file.name}":\n\`\`\`\n${text.slice(0, 4000)}\n\`\`\``;
  }

  const prompt = message + fileContext;
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a helpful SaaS dashboard assistant. Use markdown when appropriate. Be concise and professional.",
      prompt,
    });

    return result.toTextStreamResponse();
  }

  const demoText = getDemoResponse(message);
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of streamDemoText(demoText)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
