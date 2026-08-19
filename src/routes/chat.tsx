import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, Bot, Send, Sparkles, Trash2, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { AppLayout } from "@/components/AppLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateAssistantOutput } from "@/lib/assistant.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant that keeps conversation context and helps with writing, planning and process questions.",
      },
      { property: "og:title", content: "AI Workplace Chatbot" },
      {
        property: "og:description",
        content: "An interactive AI colleague for everyday workplace questions and drafting.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "How do I say no to a low-priority request from another team without damaging the relationship?",
  "Give me an agenda for a 30-minute weekly team check-in.",
  "How can I cut our meeting load without losing alignment?",
  "Help me structure a handover document before I go on leave.",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const history = messages;
    setMessages([...history, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const result = await generateAssistantOutput({
        data: { task: "chat", input: trimmed, history: history.slice(-16) },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      title="AI Chatbot"
      description="An interactive workplace assistant that remembers the conversation"
    >
      <Card className="flex h-[calc(100vh-15rem)] min-h-125 flex-col border-border/70 shadow-elevated">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4 pt-6">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 && !loading && (
              <div className="space-y-4">
                <div className="rounded-xl border border-dashed border-border bg-surface/60 p-6 text-center">
                  <Sparkles className="mx-auto size-5 text-brand" aria-hidden />
                  <p className="mt-2 text-sm font-medium">Ask your workplace assistant anything</p>
                  <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
                    It keeps the full conversation in context. Avoid sharing confidential or personal
                    data.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {STARTERS.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => send(starter)}
                      className="rounded-xl border border-border bg-card p-3 text-left text-sm transition-colors hover:border-brand/60 hover:bg-accent/50"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg",
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-gradient-brand text-brand-foreground",
                  )}
                  aria-hidden
                >
                  {message.role === "user" ? (
                    <User className="size-4" />
                  ) : (
                    <Bot className="size-4" />
                  )}
                </span>
                <div
                  className={cn(
                    "prose-ai max-w-[85%] rounded-xl border px-4 py-3 text-sm",
                    message.role === "user"
                      ? "border-transparent bg-secondary text-secondary-foreground"
                      : "border-border bg-card text-card-foreground",
                  )}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {loading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4 animate-pulse text-brand" aria-hidden />
                Thinking…
              </p>
            )}
            <div ref={endRef} />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" aria-hidden />
              <AlertTitle>Message failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form
            className="space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about drafting, planning, meetings, process… (Enter to send, Shift+Enter for a new line)"
              className="min-h-20"
              aria-label="Message"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                AI-generated answers may be inaccurate — verify anything important.
              </p>
              <div className="flex gap-2">
                {messages.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setMessages([]);
                      setError(null);
                    }}
                  >
                    <Trash2 className="mr-1.5 size-3.5" aria-hidden />
                    Clear chat
                  </Button>
                )}
                <Button type="submit" disabled={loading || !input.trim()}>
                  <Send className="mr-1.5 size-3.5" aria-hidden />
                  Send
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
