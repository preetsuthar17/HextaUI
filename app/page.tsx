import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { componentsRegistry } from "@/lib/components-registry";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col gap-12 px-4 py-8">
      <header className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="flex flex-wrap items-center justify-center gap-2">
            Extended Components for
            <span className="inline-flex items-center gap-1 px-2">
              <Image
                alt="shadcn/ui"
                className="size-9 rounded-full align-middle"
                height={36}
                src="https://avatars.githubusercontent.com/u/124599?v=4"
                style={{ display: "inline-block" }}
                width={36}
              />
              <span>shadcn/ui</span>
            </span>
          </h1>
          <p className="text-muted-foreground">
            Ready-to-use foundation components built on top of shadcn/ui.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button asChild variant="default">
              <Link href="/components/accordion">View Components</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="https://github.com/preetsuthar17/hextaui">
                GitHub
              </Link>
            </Button>
          </div>
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
