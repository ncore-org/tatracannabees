import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createAiGateway(apiKey: string, baseUrl: string) {
  return createOpenAICompatible({
    name: "ai-gateway",
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
