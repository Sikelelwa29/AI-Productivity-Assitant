export type ToolMeta = {
  id: string;
  to: string;
  label: string;
  tagline: string;
  description: string;
  icon: "mail" | "notebook" | "calendar" | "search" | "chat";
};

export const TOOLS: ToolMeta[] = [
  {
    id: "email",
    to: "/email",
    label: "Smart Email Generator",
    tagline: "Draft in seconds",
    description:
      "Turn a rough intent into a polished, ready-to-send email with tone, length and call-to-action control.",
    icon: "mail",
  },
  {
    id: "summarize",
    to: "/summarizer",
    label: "Meeting Notes Summarizer",
    tagline: "Decisions & actions",
    description:
      "Paste raw notes or a transcript and get an executive summary, decisions, owners and deadlines.",
    icon: "notebook",
  },
  {
    id: "planner",
    to: "/planner",
    label: "AI Task Planner",
    tagline: "Prioritised schedule",
    description:
      "Rank tasks by impact and effort, then block them into a realistic daily or weekly schedule.",
    icon: "calendar",
  },
  {
    id: "research",
    to: "/research",
    label: "AI Research Assistant",
    tagline: "Briefs & insights",
    description:
      "Summarise a topic or pasted article into findings, business implications and next steps.",
    icon: "search",
  },
  {
    id: "chat",
    to: "/chat",
    label: "AI Chatbot",
    tagline: "Ask anything",
    description:
      "A conversational workplace assistant that keeps context across the whole conversation.",
    icon: "chat",
  },
];
