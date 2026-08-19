import { AlertCircle, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

import { ResultPanel } from "@/components/ResultPanel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateAssistantOutput } from "@/lib/assistant.functions";
import type { AssistantTaskId } from "@/lib/prompts";

export type Field =
  | { name: string; label: string; type: "input"; placeholder?: string; defaultValue?: string }
  | {
      name: string;
      label: string;
      type: "select";
      options: string[];
      defaultValue: string;
    };

export function ToolWorkspace({
  task,
  inputLabel,
  inputPlaceholder,
  fields,
  promptTips,
  sample,
  submitLabel,
}: {
  task: AssistantTaskId;
  inputLabel: string;
  inputPlaceholder: string;
  fields: Field[];
  promptTips: string[];
  sample: string;
  submitLabel: string;
}) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, field.defaultValue ?? ""])),
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setOption = (name: string, value: string) =>
    setOptions((prev) => ({ ...prev, [name]: value }));

  const run = async () => {
    if (!input.trim()) {
      setError("Add some input first so the assistant has something to work with.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generateAssistantOutput({
        data: {
          task,
          input: input.trim(),
          options: Object.fromEntries(
            Object.entries(options).filter(([, value]) => value.trim().length > 0),
          ),
        },
      });
      setOutput(result.text);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <Card className="h-fit border-border/70 shadow-elevated">
        <CardHeader>
          <CardTitle className="text-base">Input</CardTitle>
          <CardDescription>
            The more context you give, the more usable the AI output will be.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="tool-input">{inputLabel}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setInput(sample)}
              >
                <Wand2 className="mr-1.5 size-3.5" aria-hidden />
                Use example
              </Button>
            </div>
            <Textarea
              id="tool-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={inputPlaceholder}
              className="min-h-44"
            />
            <p className="text-right text-xs text-muted-foreground">{input.length} characters</p>
          </div>

          {fields.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={`field-${field.name}`}>{field.label}</Label>
                  {field.type === "select" ? (
                    <Select
                      value={options[field.name] ?? field.defaultValue}
                      onValueChange={(value) => setOption(field.name, value)}
                    >
                      <SelectTrigger id={`field-${field.name}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={`field-${field.name}`}
                      value={options[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => setOption(field.name, event.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="size-4" aria-hidden />
              <AlertTitle>Could not generate</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={run} disabled={loading} size="lg">
              <Sparkles className="mr-2 size-4" aria-hidden />
              {loading ? "Working…" : submitLabel}
            </Button>
            {output && (
              <Button variant="ghost" onClick={() => setOutput("")} disabled={loading}>
                Clear output
              </Button>
            )}
          </div>

          <div className="rounded-xl border border-border bg-surface/70 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prompt engineering tips
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {promptTips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-elevated">
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">AI output</CardTitle>
            <CardDescription>Editable before you use it.</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            Lovable AI
          </Badge>
        </CardHeader>
        <CardContent>
          <ResultPanel
            value={output}
            onChange={setOutput}
            loading={loading}
            filename={`${task}-output`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
