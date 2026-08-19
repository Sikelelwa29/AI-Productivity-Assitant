import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/AppLayout";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in formal, friendly, persuasive or apologetic tones, with editable AI drafts.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Turn a rough intent into a polished, ready-to-send business email in seconds.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppLayout
      title="Smart Email Generator"
      description="Professional emails with tone, length and call-to-action control"
    >
      <ToolWorkspace
        task="email"
        submitLabel="Generate email"
        inputLabel="What is the email about?"
        inputPlaceholder="e.g. Tell the client our delivery slips by one week because of a supplier delay, and offer a partial early release."
        sample="Ask our supplier to confirm the revised delivery date for order #4471. They missed the original date of 12 August and have not replied to two emails. We need a firm date by Friday, otherwise we escalate to their account manager."
        fields={[
          {
            name: "tone",
            label: "Tone",
            type: "select",
            defaultValue: "Formal",
            options: ["Formal", "Friendly", "Persuasive", "Direct", "Apologetic", "Encouraging"],
          },
          {
            name: "length",
            label: "Length",
            type: "select",
            defaultValue: "Short (under 150 words)",
            options: [
              "Very short (under 80 words)",
              "Short (under 150 words)",
              "Medium (150-250 words)",
              "Detailed (250-400 words)",
            ],
          },
          { name: "recipient", label: "Recipient", type: "input", placeholder: "e.g. Client, CFO" },
          { name: "sender", label: "Sign off as", type: "input", placeholder: "e.g. Thabo, Ops" },
          {
            name: "goal",
            label: "Desired outcome",
            type: "input",
            placeholder: "e.g. Confirm a new date by Friday",
          },
        ]}
        promptTips={[
          "Name the situation, the relationship and the outcome you want — the model cannot guess office politics.",
          "Include facts you want quoted (dates, order numbers, amounts) so the AI never has to invent them.",
          "Pick the tone deliberately: persuasive for buy-in, formal for escalation, friendly for internal peers.",
          "Always re-read for accuracy and confidentiality before hitting send.",
        ]}
      />
    </AppLayout>
  );
}
