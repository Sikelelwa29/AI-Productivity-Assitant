import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { runAssistantTask } from "./assistant.server";

const AssistantInput = z.object({
  task: z.enum(["email", "summarize", "planner", "research", "chat"]),
  input: z.string().min(1).max(20000),
  options: z.record(z.string()).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(20000),
      }),
    )
    .max(40)
    .optional(),
});

export const generateAssistantOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AssistantInput.parse(input))
  .handler(async ({ data }) => runAssistantTask(data));
