import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/AppLayout";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised daily or weekly schedule with impact/effort ranking and focus blocks.",
      },
      { property: "og:title", content: "AI Task Planner & Scheduler" },
      {
        property: "og:description",
        content: "Prioritise tasks by impact and effort, then block them into a realistic schedule.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AppLayout
      title="AI Task Planner"
      description="Prioritise your workload and block it into a realistic schedule"
    >
      <ToolWorkspace
        task="planner"
        submitLabel="Build my plan"
        inputLabel="List your tasks (one per line)"
        inputPlaceholder={"e.g.\nFinish Q3 board deck (due Thursday)\nInterview two candidates\nReview 4 pull requests\n…"}
        sample={`Finish Q3 board deck - due Thursday 09:00, needs finance numbers from Kyle
Interview 2 candidates for the support role - 45 min each, must be this week
Review 4 pull requests - team is blocked
Write the refund SLA report - Kyle asked, no hard deadline
Reply to 30 unread emails
Prep and run the Friday retro
Onboarding doc for the new intern - starts Monday
Fix the broken staging deploy - annoying but not urgent`}
        fields={[
          {
            name: "horizon",
            label: "Planning horizon",
            type: "select",
            defaultValue: "One working day",
            options: ["One working day", "Next 3 days", "Full working week"],
          },
          {
            name: "hours",
            label: "Working hours",
            type: "input",
            placeholder: "e.g. 08:30-17:00, lunch 13:00",
          },
          {
            name: "commitments",
            label: "Fixed commitments",
            type: "input",
            placeholder: "e.g. Standup 09:00, client call 14:00",
          },
          {
            name: "goal",
            label: "Top goal",
            type: "input",
            placeholder: "e.g. Board deck signed off",
          },
        ]}
        promptTips={[
          "Add deadlines and rough durations to each task — that's what makes the ranking useful instead of generic.",
          "Declare your fixed meetings so the schedule works around reality.",
          "State one top goal; it gives the model a tie-breaker when tasks compete.",
          "If the plan says your load is unrealistic, treat that as a signal to renegotiate scope, not to work later.",
        ]}
      />
    </AppLayout>
  );
}
