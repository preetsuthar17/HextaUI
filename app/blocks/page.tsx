import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  blockCategories,
  categoryLabels,
  getBlocksByCategory,
} from "@/lib/blocks-registry";

export default function BlocksIndexPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blocks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Blocks</h1>
          <p className="text-muted-foreground text-sm">
            Pick a block to view installation, usage, and demo.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-12">
        {blockCategories.map((category) => {
          const categoryBlocks = getBlocksByCategory(category);
          return (
            <section className="flex flex-col gap-4" key={category}>
              <h2 className="font-semibold text-lg tracking-tight">
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {categoryBlocks.map((block) => (
                  <Link
                    aria-label={`View ${block.title} block`}
                    className="flex items-center justify-between gap-2 rounded-md border bg-card p-3 outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                    href={`/blocks/${block.id}`}
                    key={block.id}
                    tabIndex={0}
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">
                        {block.title}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {block.id}
                      </span>
                    </div>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-muted-foreground"
                    />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
