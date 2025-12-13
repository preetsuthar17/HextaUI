"use client";

import Link from "next/link";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { ThemeSelectorWithCopy } from "@/components/home/theme-selector-with-copy";
import AIPreview from "@/components/previews/ai-preview";
import AuthPreview from "@/components/previews/auth-preview";
import BillingPreview from "@/components/previews/billing-preview";
import SettingsPreview from "@/components/previews/settings-preview";
import TasksPreview from "@/components/previews/tasks-preview";
import TeamPreview from "@/components/previews/team-preview";
import { Button } from "@/registry/new-york/ui/button";
import { Spinner } from "@/registry/new-york/ui/spinner";

const previewOptions = [
  { value: "auth", label: "Authentication", component: AuthPreview },
  { value: "ai", label: "AI", component: AIPreview },
  { value: "billing", label: "Billing", component: BillingPreview },
  { value: "settings", label: "Settings", component: SettingsPreview },
  { value: "tasks", label: "Tasks", component: TasksPreview },
  { value: "team", label: "Team", component: TeamPreview },
] as const;

const parsePreviewTab = parseAsStringEnum([
  "auth",
  "ai",
  "billing",
  "settings",
  "tasks",
  "team",
]).withDefault("auth");

function PreviewSection() {
  const [selected, setSelected] = useQueryState("preview", parsePreviewTab);

  const SelectedPreview =
    previewOptions.find((o) => o.value === selected)?.component ?? AuthPreview;

  return (
    <div className="flex w-full flex-col gap-12 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {previewOptions.map((option) => (
              <Button
                aria-current={selected === option.value ? "page" : undefined}
                aria-pressed={selected === option.value}
                className="px-4"
                key={option.value}
                onClick={() => setSelected(option.value)}
                size="sm"
                type="button"
                variant={selected === option.value ? "secondary" : "ghost"}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <ThemeSelectorWithCopy />
        </div>
        <Link className="underline underline-offset-4" href="/blocks">
          Check out all blocks
        </Link>
      </div>

      <div>
        <SelectedPreview />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto flex w-[95%] flex-col gap-16 px-4 py-12">
      <div>
        <Hero />
      </div>

      <Suspense
        fallback={
          <section className="flex min-h-screen items-center justify-center">
            <Spinner />
          </section>
        }
      >
        <PreviewSection />
      </Suspense>
    </div>
  );
}
