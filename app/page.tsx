import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { componentsRegistry } from "@/lib/components-registry";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 font-sans">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">
            HextaUI
          </h1>
          <p className="text-muted-foreground text-sm">
            Foundation components built on top of shadcn/ui.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {componentsRegistry.map((c) => (
          <Link
            href={`/components/${c.id}`}
            className="flex items-center justify-between gap-2 rounded-md border bg-card p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            key={c.id}
            tabIndex={0}
          >
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-medium">{c.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
