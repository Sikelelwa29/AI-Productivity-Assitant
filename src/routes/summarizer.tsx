import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/AppLayout";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into an executive summary with decisions, action items, owners and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      {
        property: "og:description",
        content: "Extract decisions, action items and deadlines from long meeting notes instantly.",
      },
    ],
  }),
  component: SummarizerPage,
});

function SummarizerPage() {
  return (
    <AppLayout
      title="Meeting Notes Summarizer"
      description="Summaries, decisions, owners and deadlines from raw notes"
    >
      <ToolWorkspace
        task="summarize"
        submitLabel="Summarize notes"
        inputLabel="Paste your meeting notes or transcript"
        inputPlaceholder="Paste the raw notes, bullet points or transcript here…"
        sample={`Weekly ops sync - 18 Aug
Present: Lerato (ops), Sipho (dev), Ana (support), Kyle (finance)

- Lerato: warehouse scanner rollout is 60% done, two sites left. Blocked on network cabling at Epping, contractor comes 25 Aug.
- Sipho: new returns API is in staging, needs load testing. Says he can only start after the release freeze lifts on 21 Aug.
- Ana: support tickets up 18% this month, mostly refund status questions. Suggests a self-service status page.
- Kyle: refund SLA breaches cost us R42k in credits last month. Wants a weekly report.
- Decision: we go ahead with the self-service status page, Ana to write requirements by 22 Aug, Sipho to estimate after freeze.
- Decision: no new scanner sites until Epping is done.
- Kyle will send the credit breakdown to Lerato. Nobody picked up the weekly report owner yet.
- Ana raised that the support team is short-staffed for December, needs a decision by end of September.`}
        fields={[
          { name: "title", label: "Meeting title", type: "input", placeholder: "e.g. Weekly ops sync" },
          {
            name: "attendees",
            label: "Attendees",
            type: "input",
            placeholder: "e.g. Lerato, Sipho, Ana",
          },
          {
            name: "detail",
            label: "Detail level",
            type: "select",
            defaultValue: "Balanced",
            options: ["Very concise", "Balanced", "Detailed record"],
          },
        ]}
        promptTips={[
          "Keep the raw wording — the model finds owners and dates better in messy notes than in your pre-summarised version.",
          "List attendees so action items can be attributed to real people instead of roles.",
          "Anything marked 'Not stated' is a genuine gap in the notes: chase it, don't let the AI fill it in.",
          "Strip out personal or confidential details before pasting notes into any AI tool.",
        ]}
      />
    </AppLayout>
  );
}
