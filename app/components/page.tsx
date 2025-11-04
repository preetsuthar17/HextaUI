import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { componentsRegistry } from "@/lib/components-registry";

export default function ComponentsIndexPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 font-sans">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Components</h1>
          <p className="text-muted-foreground text-sm">
            Pick a component to view installation, usage, and demo.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {componentsRegistry.map((c) => (
          <Link
            key={c.id}
            href={`/components/${c.id}`}
            className="flex items-center justify-between gap-2 rounded-md border bg-card p-3 transition-colors hover:bg-accent focus-visible:bg-accent outline-none"
            tabIndex={0}
            aria-label={`View ${c.title} component`}
          >
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{c.title}</span>
              <span className="text-muted-foreground text-xs">{c.id}</span>
            </div>
            <ArrowRightIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
