import { Check, Copy, Download, Pencil, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ResultPanel({
  value,
  onChange,
  loading,
  filename,
}: {
  value: string;
  onChange: (next: string) => void;
  loading: boolean;
  filename: string;
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  };

  const download = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${filename}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface/60 p-8 text-center">
        <Sparkles className="size-5 animate-pulse text-brand" aria-hidden />
        <p className="text-sm font-medium">Generating your output…</p>
        <p className="text-xs text-muted-foreground">
          The assistant is working through your prompt. This usually takes a few seconds.
        </p>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-surface/60 p-8 text-center">
        <p className="text-sm font-medium">No output yet</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Fill in the form and run the assistant. Every result is editable before you use it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setEditing((prev) => !prev)}>
          <Pencil className="mr-1.5 size-3.5" aria-hidden />
          {editing ? "Preview" : "Edit"}
        </Button>
        <Button variant="outline" size="sm" onClick={copy}>
          {copied ? (
            <Check className="mr-1.5 size-3.5" aria-hidden />
          ) : (
            <Copy className="mr-1.5 size-3.5" aria-hidden />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button variant="outline" size="sm" onClick={download}>
          <Download className="mr-1.5 size-3.5" aria-hidden />
          Download
        </Button>
      </div>

      {editing ? (
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-96 font-mono text-xs leading-relaxed"
          aria-label="Editable AI output"
        />
      ) : (
        <div className="prose-ai max-w-none rounded-xl border border-border bg-card p-5 text-sm text-card-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        AI-generated draft — check facts, names, numbers and dates before you use it.
      </p>
    </div>
  );
}
