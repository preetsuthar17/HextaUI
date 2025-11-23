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
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-dashed p-6">
        <div className="hidden md:block">
          <Image
            alt="shadcnblocks logo"
            className="dark:invert"
            height={84}
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
            width={84}
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-2">
          <h2 className="flex flex-wrap items-center gap-2 font-semibold text-xl tracking-tighter">
            <span className="block shrink-0 md:hidden">
              <Image
                alt="shadcnblocks logo"
                className="shrink-0 dark:invert"
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
                data-s-event="Blocks link: shadcnblocks.com"
                data-s-event-props="location=blocks;label=shadcnblocks.com"
                href="https://shadcnblocks.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com"
                rel="noopener noreferrer"
                role="button"
                style={{ textDecoration: "none" }}
                tabIndex={0}
                target="_blank"
                type="button"
              >
                Check out more blocks
                <ArrowRightIcon aria-hidden="true" className="ml-1 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6 rounded-xl border border-dashed p-6">
        <div className="hidden md:block">
          <Image
            alt="shadcnblocks logo"
            className="dark:invert"
            height={84}
            src="https://ikiform.com/favicon.ico"
            width={84}
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-2">
          <h2 className="flex flex-wrap items-center gap-2 font-semibold text-xl tracking-tighter">
            <span className="block shrink-0 md:hidden">
              <Image
                alt="shadcnblocks logo"
                className="shrink-0 dark:invert"
                height={24}
                src="https://ikiform.com/favicon.ico"
                width={24}
              />
            </span>
            Build Forms, Collect Responses & Analyze.
          </h2>
          <p className="text-muted-foreground text-sm">
            The open-source forms platform for effortless data collection and
            analysis. Get 49% OFF for black friday sale!
          </p>
          <div>
            <Button asChild variant={"outline"}>
              <a
                data-s-event="Blocks link: ikiform.com"
                data-s-event-props="location=blocks;label=ikiform.com"
                href="https://ikiform.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com"
                rel="noopener noreferrer"
                role="button"
                style={{ textDecoration: "none" }}
                tabIndex={0}
                target="_blank"
                type="button"
              >
                Start collecting responses
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
