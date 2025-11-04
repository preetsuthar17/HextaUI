import Link from "next/link";
import { componentsRegistry } from "@/lib/components-registry";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-12 px-4 py-8 font-sans">
      <header className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-4xl tracking-tighter">
            Extended Components for shadcn/ui
          </h1>
          <p className="text-muted-foreground text-sm">
            Ready-to-use foundation components built on top of shadcn/ui.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {componentsRegistry.map((c) => (
          <Link
            className="flex items-center justify-between gap-2 rounded-md border bg-card p-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            href={`/components/${c.id}`}
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
