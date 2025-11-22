import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-wrap items-center gap-6 border border-dashed p-6 rounded-xl">
        <div className="hidden md:block">
          <Image
            alt="shadcnblocks logo"
            height={84}
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
            width={84}
          />
        </div>
        <div className="flex flex-col md:gap-2 gap-4">
          <h2 className="flex items-center gap-2 font-semibold text-xl tracking-tighter flex-wrap">
            <span className="block md:hidden shrink-0">
              <Image
                className="shrink-0"
                alt="shadcnblocks logo"
                height={24}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                width={24}
              />
            </span>
            The ultimate block set for Shadcn UI & Tailwind
          </h2>
          <p className="text-muted-foreground text-sm">
            Browse 929 blocks and 1115 patterns for shadcn/ui, Tailwind, and
            React. Ready to copy, paste, or install in your project.
          </p>
          <div>
            <Button asChild variant={"outline"}>
              <a
                href="https://shadcnblocks.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                tabIndex={0}
                target="_blank"
              >
                Check out more blocks
                <ArrowRightIcon aria-hidden="true" className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {blockCategories.map((category) => {
          const categoryBlocks = getBlocksByCategory(category);
          return (
            <section className="flex flex-col gap-4" key={category}>
              <h3 className="font-semibold text-lg tracking-tight">
                {categoryLabels[category]}
              </h3>
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
