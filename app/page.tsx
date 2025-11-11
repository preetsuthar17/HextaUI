"use client";

import Link from "next/link";
import { useState } from "react";
import { Contributors } from "@/components/home/contributors";
import { Hero } from "@/components/home/hero";
import { Sponsors } from "@/components/home/sponsors";
import AIPreview from "@/components/previews/ai-preview";
import AuthPreview from "@/components/previews/auth-preview";
import BillingPreview from "@/components/previews/billing-preview";
import SettingsPreview from "@/components/previews/settings-preview";
import TeamPreview from "@/components/previews/team-preview";
import { Button } from "@/components/ui/button";

const previewOptions = [
  { value: "auth", label: "Authentication", component: AuthPreview },
  { value: "ai", label: "AI", component: AIPreview },
  { value: "billing", label: "Billing", component: BillingPreview },
  { value: "settings", label: "Settings", component: SettingsPreview },
  { value: "team", label: "Team", component: TeamPreview },
];

export default function Home() {
  const [selected, setSelected] = useState("auth");

  const SelectedPreview =
    previewOptions.find((o) => o.value === selected)?.component ?? AuthPreview;

  return (
    <div className="mx-auto flex w-[95%] flex-col gap-16 px-4 py-12">
      <div>
        <Hero />
      </div>

      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {previewOptions.map((option) => (
              <Button
                aria-current={selected === option.value ? "page" : undefined}
                aria-pressed={selected === option.value}
                key={option.value}
                onClick={() => setSelected(option.value)}
                size="sm"
                type="button"
                variant={selected === option.value ? "outline" : "ghost"}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <Link className="underline underline-offset-4" href="/blocks">
            Check out all blocks
          </Link>
        </div>

        <div>
          <SelectedPreview />
        </div>
      </div>

      <section className="flex flex-col gap-8 py-8">
        <Sponsors />
        <Contributors />
        <div className="flex flex-col items-start gap-4 text-left">
          <p className="text-muted-foreground text-sm">
            Want to support HextaUI?{" "}
            <Link
              className="underline underline-offset-4 hover:no-underline"
              href="https://preetsuthar.me/sponsor"
              rel="noopener noreferrer"
              target="_blank"
            >
              Become a sponsor
            </Link>{" "}
            or{" "}
            <Link
              className="underline underline-offset-4 hover:no-underline"
              href="https://github.com/preetsuthar17/hextaui"
              rel="noopener noreferrer"
              target="_blank"
            >
              contribute on GitHub
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
