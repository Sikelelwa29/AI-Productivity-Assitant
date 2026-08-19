# AI-Powered Workplace Productivity Assistant

One integrated AI platform that automates the workplace tasks that eat the most time. Built as a single responsive dashboard with sidebar navigation, structured prompts, editable AI outputs and responsible-AI guardrails.

## Features

| Feature | What it does |
| --- | --- |
| Smart Email Generator | Professional emails with tone (formal, friendly, persuasive, direct, apologetic, encouraging), length, recipient, sign-off and desired outcome controls. Returns subject + body + verification notes. |
| Meeting Notes Summarizer | Turns raw notes or transcripts into an executive summary, key decisions, an action-item table (owner / action / due date / priority), deadlines and open risks. |
| AI Task Planner | Ranks tasks by impact and effort, then blocks them into a realistic daily or weekly schedule around fixed commitments, with coaching notes and capacity warnings. |
| AI Research Assistant | Topic or pasted-article briefs: TL;DR, key findings, business implications, recommended next steps, plus explicit confidence and limitations. |
| AI Chatbot | Conversational workplace assistant that keeps the full conversation in context, with suggested starters and markdown-rendered answers. |

Every tool: example input, prompt-engineering tips, editable output, copy and markdown download.

## Prompt engineering approach

- Each feature has its own **role-based system prompt** with a fixed output contract (required markdown sections/tables), so outputs are consistent and parseable.
- User context is injected as **labelled fields** (tone, audience, deadlines, working hours) rather than free text alone.
- Shared **responsible-AI rule block** in every system prompt: no fabricated facts/citations, explicit "Assumptions" section, "Not stated" instead of guessing, redaction of sensitive data, no legal/medical/financial advice, human-review reminder.

## Responsible AI

- Persistent disclaimer in the sidebar, footer and on every output panel.
- The assistant has no live web access — facts must be verified against primary sources.
- Users are told not to paste confidential, personal or regulated data.
- Accountability stays with the human who sends, publishes or acts on an output.

## Tools used

- Lovable AI (Google Gemini via the Lovable AI Gateway) with the Vercel AI SDK
- TanStack Start (React 19) + TanStack Router, server functions for all AI calls
- Tailwind CSS v4 design tokens + shadcn/ui components, lucide icons
- react-markdown + remark-gfm for rendering AI output

## Architecture

```
src/lib/prompts.ts             system prompts + structured user-prompt builders
src/lib/ai-gateway.server.ts   Lovable AI Gateway provider (server only)
src/lib/assistant.server.ts    model call, streaming consumption, error mapping
src/lib/assistant.functions.ts validated server function called by the UI
src/components/AppLayout.tsx   responsive dashboard shell + sidebar
src/components/ToolWorkspace.tsx reusable input/output workspace
src/routes/                    dashboard, email, summarizer, planner, research, chat
```

The API key never reaches the browser: all model calls run inside server functions.

## Setup

```bash
bun install   # or npm install
bun run dev   # http://localhost:8080
```

AI access is provided by the Lovable AI Gateway via the server-side `LOVABLE_API_KEY` environment variable. No other keys are required.

## Team

ASA 15 / CPT Week 15 — AI-Powered Workplace Productivity Assistant project.
