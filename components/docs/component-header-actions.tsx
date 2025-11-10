import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { componentsRegistry } from "@/lib/components-registry";

type ComponentHeaderActionsProps = {
  componentId: string;
  className?: string;
};

export function ComponentHeaderActions({
  componentId,
  className,
}: ComponentHeaderActionsProps) {
  const all = componentsRegistry;
  const index = all.findIndex((c) => c.id === componentId);
  const prevMeta = index > 0 ? all[index - 1] : undefined;
  const nextMeta =
    index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <div className={className ?? "flex items-center gap-2"}>
      {prevMeta ? (
        <Button
          aria-label={`Previous: ${prevMeta.title}`}
          asChild
          size="icon-sm"
          variant="secondary"
        >
          <Link href={`/components/${prevMeta.id}`}>
            <ArrowLeft className="size-4" />
            <span className="sr-only">Previous</span>
          </Link>
        </Button>
      ) : null}
      {nextMeta ? (
        <Button
          aria-label={`Next: ${nextMeta.title}`}
          asChild
          size="icon-sm"
          variant="secondary"
        >
          <Link href={`/components/${nextMeta.id}`}>
            <span className="sr-only">Next</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}

export default ComponentHeaderActions;
