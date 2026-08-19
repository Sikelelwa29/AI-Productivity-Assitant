import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calendar,
  LayoutDashboard,
  Mail,
  MessageSquare,
  NotebookPen,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { TOOLS } from "@/lib/tools";
import { cn } from "@/lib/utils";

const ICONS = {
  mail: Mail,
  notebook: NotebookPen,
  calendar: Calendar,
  search: Search,
  chat: MessageSquare,
} as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const item = (to: string, label: string, Icon: typeof Mail) => {
    const active = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-elevated"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
        )}
      >
        <Icon
          className={cn("size-4 shrink-0", active ? "text-sidebar-primary" : "opacity-70")}
          aria-hidden
        />
        <span className="truncate">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Assistant tools">
      {item("/", "Dashboard", LayoutDashboard)}
      <p className="mt-5 px-3 pb-1 text-[0.7rem] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
        AI tools
      </p>
      {TOOLS.map((tool) => item(tool.to, tool.label, ICONS[tool.icon]))}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 bg-sidebar p-4 text-sidebar-foreground">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2 py-1">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-brand text-brand-foreground shadow-glow">
          <Sparkles className="size-4" aria-hidden />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-semibold">Workplace AI</span>
          <span className="block text-xs text-sidebar-foreground/50">Productivity Assistant</span>
        </span>
      </Link>

      <NavLinks onNavigate={onNavigate} />

      <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-xs text-sidebar-foreground/70">
        <p className="flex items-center gap-2 font-semibold text-sidebar-foreground">
          <ShieldCheck className="size-4 text-sidebar-primary" aria-hidden />
          Responsible AI
        </p>
        <p className="mt-1.5">
          Outputs are AI-generated and may be inaccurate. Review, edit and verify before sending or
          acting on them. Never paste confidential personal data.
        </p>
      </div>
    </div>
  );
}

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-68 shrink-0 border-r border-sidebar-border lg:block">
        <SidebarInner />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-elevated">
            <SidebarInner onNavigate={() => setOpen(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-8">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-4" aria-hidden />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold sm:text-xl">{title}</h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>

        <footer className="border-t border-border/70 px-4 py-4 text-xs text-muted-foreground sm:px-8">
          AI-generated content can be wrong. A human must review every output before it is sent,
          published or used for a decision.
        </footer>
      </div>
    </div>
  );
}
