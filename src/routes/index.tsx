import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Mail,
  MessageSquare,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant | Dashboard" },
      {
        name: "description",
        content:
          "One AI dashboard for professional emails, meeting summaries, prioritised task plans, research briefs and a workplace chatbot.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Automate workplace admin with five AI tools in a single responsive dashboard, built with responsible AI guardrails.",
      },
    ],
  }),
  component: Dashboard,
});

const ICONS = {
  mail: Mail,
  notebook: NotebookPen,
  calendar: Calendar,
  search: Search,
  chat: MessageSquare,
} as const;

const STATS = [
  { label: "AI tools in one platform", value: "5", icon: Sparkles },
  { label: "Typical drafting time saved", value: "~30 min/task", icon: Timer },
  { label: "Human review required", value: "Always", icon: ShieldCheck },
];

function Dashboard() {
  return (
    <AppLayout
      title="Dashboard"
      description="Your AI-powered workplace productivity command centre"
    >
      <div className="space-y-8">
        <section className="overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-elevated sm:p-8">
          <Badge variant="secondary" className="mb-4">
            Powered by Lovable AI
          </Badge>
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Automate the admin. Keep the judgement.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            This single platform bundles five AI assistants for the workplace tasks that eat the most
            time: writing emails, cleaning up meeting notes, planning the week, researching topics
            and answering day-to-day questions. Every feature uses a structured, role-based prompt
            and returns an editable draft — never a final decision.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/email">
                Start with an email
                <ArrowRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/chat">Open the AI chatbot</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-border/70">
              <CardContent className="flex items-center gap-4 pt-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <stat.icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold">AI tools</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {TOOLS.map((tool) => {
              const Icon = ICONS[tool.icon];
              return (
                <Card
                  key={tool.id}
                  className="group border-border/70 transition-shadow hover:shadow-elevated"
                >
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <CardTitle className="mt-3 text-base">{tool.label}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm">
                      <Link to={tool.to}>
                        {tool.tagline}
                        <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section>
          <Card className="border-brand/40 bg-surface/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4 text-brand" aria-hidden />
                Responsible AI disclaimer
              </CardTitle>
              <CardDescription>How this assistant is designed to be used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                All outputs are generated by a large language model and can contain mistakes,
                outdated information or invented detail. Treat every result as a first draft that a
                human must review, fact-check and approve.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Do not paste confidential, personal or regulated data into the input fields.</li>
                <li>
                  The assistant has no live internet access — verify facts, figures and citations
                  against primary sources.
                </li>
                <li>
                  It does not give legal, medical or financial advice; consult a qualified
                  professional.
                </li>
                <li>
                  Accountability stays with the person who sends, publishes or acts on the output.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
