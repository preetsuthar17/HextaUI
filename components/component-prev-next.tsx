import Link from "next/link";

import { componentsRegistry } from "@/lib/components-registry";

export function ComponentPrevNext({ currentId }: { currentId: string }) {
  const order = componentsRegistry.map((c) => c.id);
  const index = order.indexOf(currentId);
  const prevId = index > 0 ? order[index - 1] : undefined;
  const nextId =
    index >= 0 && index < order.length - 1 ? order[index + 1] : undefined;
  const prevMeta = prevId
    ? componentsRegistry.find((c) => c.id === prevId)
    : undefined;
  const nextMeta = nextId
    ? componentsRegistry.find((c) => c.id === nextId)
    : undefined;

  if (!(prevMeta || nextMeta)) return null;

  return (
    <nav aria-label="Component pagination">
      <div className="mx-auto max-w-5xl">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <li className="min-w-0">
            {prevMeta && (
              <Link
                className="group block rounded-md border bg-card p-4 outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                href={`/components/${prevMeta.id}`}
                rel="prev"
              >
                <div className="text-muted-foreground text-xs">Previous</div>
                <div className="truncate font-medium">{prevMeta.title}</div>
              </Link>
            )}
          </li>
          <li className="min-w-0 sm:justify-self-end">
            {nextMeta && (
              <Link
                className="group block rounded-md border bg-card p-4 text-right outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                href={`/components/${nextMeta.id}`}
                rel="next"
              >
                <div className="text-muted-foreground text-xs">Next</div>
                <div className="truncate font-medium">{nextMeta.title}</div>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
