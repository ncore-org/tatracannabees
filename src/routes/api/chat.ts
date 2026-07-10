import { createFileRoute } from "@tanstack/react-router";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { WIZ_SYSTEM_PROMPT } from "@/lib/wiz-prompt";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(messages)) {
            return new Response("Messages required", { status: 400 });
          }
          const apiKey = process.env.AI_GATEWAY_API_KEY;
          const baseUrl = process.env.AI_GATEWAY_BASE_URL;
          if (!apiKey || !baseUrl) {
            return new Response("Missing AI_GATEWAY_API_KEY or AI_GATEWAY_BASE_URL", { status: 500 });
          }

          const provider = createOpenAICompatible({
            name: "ai-gateway",
            baseURL: baseUrl,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          const result = streamText({
            model: provider("openai/gpt-5.5"),
            system: WIZ_SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error("Wiz chat error", err);
          const msg = err instanceof Error ? err.message : "Wiz sa práve stratil v úli.";
          return new Response(msg, { status: 500 });
        }
      },
    },
  },
});
