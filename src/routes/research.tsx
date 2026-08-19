import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/AppLayout";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Summarise topics or pasted articles into key findings, business implications, recommendations and stated limitations.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Fast research briefs with insights, recommendations and honest confidence levels.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppLayout
      title="AI Research Assistant"
      description="Topic and article briefs with insights and next steps"
    >
      <ToolWorkspace
        task="research"
        submitLabel="Create research brief"
        inputLabel="Topic, question or pasted article"
        inputPlaceholder="Paste an article, or describe the topic you need a brief on…"
        sample="Brief me on how mid-sized South African retailers are using AI for demand forecasting: what approaches exist, what data they need, typical pitfalls, and what a 3-month pilot could look like."
        fields={[
          {
            name: "audience",
            label: "Audience",
            type: "input",
            placeholder: "e.g. Exec committee, non-technical",
          },
          {
            name: "depth",
            label: "Depth",
            type: "select",
            defaultValue: "Executive brief",
            options: ["Quick scan", "Executive brief", "Deep dive"],
          },
          {
            name: "questions",
            label: "Must-answer questions",
            type: "input",
            placeholder: "e.g. What would a pilot cost?",
          },
        ]}
        promptTips={[
          "Say who the brief is for — an exec summary and an engineering brief need different language.",
          "Paste the source text when you have it; that keeps the answer grounded in real material.",
          "List the specific questions you must answer so the brief is decision-ready.",
          "The assistant has no live web access: verify every figure and claim against a primary source before quoting it.",
        ]}
      />
    </AppLayout>
  );
}
