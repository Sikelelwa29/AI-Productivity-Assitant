import { streamText } from "ai";

import { ASSISTANT_MODEL, createLovableAiGatewayProvider } from "./ai-gateway.server";
import { buildUserPrompt, getSystemPrompt, type AssistantTaskId } from "./prompts";

export type RunAssistantArgs = {
  task: AssistantTaskId;
  input: string;
  options?: Record<string, string> | undefined;
  history?: Array<{ role: "user" | "assistant"; content: string }> | undefined;
};

export async function runAssistantTask({ task, input, options, history }: RunAssistantArgs) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error("AI is not configured for this app (missing API key).");
  }

  const gateway = createLovableAiGatewayProvider(apiKey);

  try {
    const result = streamText({
      model: gateway(ASSISTANT_MODEL),
      system: getSystemPrompt(task),
      messages: [
        ...(history ?? []).map((message) => ({
          role: message.role,
          content: message.content,
        })),
        { role: "user" as const, content: buildUserPrompt(task, input, options ?? {}) },
      ],
    });

    const text = await result.text;
    return { text };
  } catch (error) {
    const status =
      typeof error === "object" && error !== null && "statusCode" in error
        ? Number((error as { statusCode?: number }).statusCode)
        : undefined;

    if (status === 429) {
      throw new Error("The AI service is busy right now. Please wait a moment and try again.");
    }
    if (status === 402) {
      throw new Error(
        "AI credits for this workspace are exhausted. The app owner needs to top up credits in Lovable.",
      );
    }
    if (status === 403) {
      throw new Error("AI access is blocked for this workspace. The app owner needs to enable it.");
    }

    const message = error instanceof Error ? error.message : "Unknown AI error";
    throw new Error(`AI request failed: ${message}`);
  }
}
