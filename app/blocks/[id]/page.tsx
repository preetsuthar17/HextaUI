import { ArrowLeft, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CarbonAds from "@/components/carbon";
import { AskAIButton } from "@/components/docs/ask-ai-button";
import { BlockDemo } from "@/components/docs/block-demo";
import BlockHeaderActions from "@/components/docs/block-header-actions";
import { BlockPrevNext } from "@/components/docs/block-prev-next";
import { BlocksSidebar } from "@/components/docs/blocks-sidebar";
import { ComponentSection } from "@/components/docs/component-section";
import ComponentUsage from "@/components/docs/component-usage";
import {
  blocksRegistry,
  categoryLabels,
  getBlockMetaById,
} from "@/lib/blocks-registry";
import { getComponentCode } from "@/lib/get-component-code";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/new-york/ui/breadcrumb";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Spinner } from "@/registry/new-york/ui/spinner";

const ComponentInstallation = dynamic(
  () =>
    import("@/components/docs/component-installation").then(
      (mod) => mod.ComponentInstallation
    ),
  {
    loading: () => (
      <div className="flex h-24 w-full animate-pulse items-center justify-center rounded-xl bg-muted p-4">
        <Spinner />
      </div>
    ),
    ssr: true,
  }
);

export function generateStaticParams() {
  return blocksRegistry.map((block) => ({
    id: block.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id?: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const id = (resolved.id ?? "").trim();
  const meta = id ? getBlockMetaById(id) : undefined;

  if (!meta) {
    return generatePageMetadata({
      title: "Block not found - HextaUI",
      description: `No block with id "${id}".`,
      url: `/blocks/${id}`,
    });
  }

  return generatePageMetadata({
    title: `${meta.title} - HextaUI`,
    description: meta.description,
    url: `/blocks/${meta.id}`,
    image: `https://www.hextaui.com/og?block=${meta.id}`,
    keywords: [
      meta.title,
      meta.id,
      categoryLabels[meta.category],
      "shadcn/ui",
      "react block",
      "ui block",
    ],
  });
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const resolved = await params;
  const id = (resolved.id ?? "").trim();
  const meta = id ? getBlockMetaById(id) : undefined;

  if (!meta) {
    return (
      <div className="mx-auto flex w-[95%] flex-col gap-4">
        <h1 className="font-semibold text-3xl tracking-tight">
          Block not found
        </h1>
        <p className="text-muted-foreground">
          No block found with id &quot;{id}&quot;.
        </p>
        <div>
          <Button asChild>
            <Link href="/blocks">
              <ArrowLeft /> Back to Blocks
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Component = meta.Component;

  return (
    <div className="mx-auto flex max-w-[95%] flex-col gap-8 py-12">
      <div className="flex w-full gap-8">
        <aside className="hidden w-1/5 min-w-[180px] max-w-[240px] flex-col md:flex">
          <BlocksSidebar currentId={meta.id} />
        </aside>
        <main className="z-22 mx-auto flex w-full max-w-4xl flex-1 flex-col gap-12 bg-background">
          <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-1 flex-col gap-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/blocks">Blocks</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/blocks">
                        {categoryLabels[meta.category]}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{meta.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="wrap-break-word font-semibold text-3xl tracking-tight">
                {meta.title}
              </h1>
              {meta.description && (
                <p className="text-muted-foreground">{meta.description}</p>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 md:mt-0">
              <AskAIButton blockId={meta.id} />
              <BlockHeaderActions blockId={meta.id} />
            </div>
          </header>

          {/* Demo */}
          <Suspense
            fallback={
              <div className="flex h-84 w-full animate-pulse items-center justify-center rounded-xl bg-muted p-4">
                <Spinner />
              </div>
            }
          >
            <BlockDemo blockId={meta.id} Component={Component} />
          </Suspense>
          {/* Installation second */}
          <ComponentSection id="installation">
            <Suspense
              fallback={
                <div className="flex h-24 w-full animate-pulse items-center justify-center rounded-xl bg-muted p-4">
                  <Spinner />
                </div>
              }
            >
              <ComponentInstallation
                componentCode={getComponentCode(meta.id)}
                componentName={meta.id}
              />
            </Suspense>
          </ComponentSection>
          {/* Usage */}
          {meta.usageCode && (
            <ComponentSection id="usage">
              <ComponentUsage
                code={meta.usageCode}
                imports={meta.usageImports}
              />
            </ComponentSection>
          )}

          <Separator />
          <BlockPrevNext currentId={meta.id} />
        </main>
        <aside className="hidden w-1/5 min-w-[180px] max-w-[240px] flex-col items-end gap-4 md:flex">
          <div className="flex flex-col gap-2 border border-dashed p-4 sm:p-6">
            <h2 className="flex flex-wrap items-center gap-2 font-semibold text-xl leading-tight tracking-tighter">
              <span className="block shrink-0">
                <Image
                  alt="shadcnblocks logo"
                  className="shrink-0 dark:invert"
                  height={32}
                  src="https://ikiform.com/favicon.ico"
                  width={32}
                />
              </span>
              Build Forms, Collect Responses & Analyze.
            </h2>
            <p className="text-muted-foreground text-sm">
              The open-source forms platform for effortless data collection and
              analysis.
            </p>
            <div>
              <Button asChild variant={"outline"}>
                <a
                  data-s-event="Blocks/Components link: ikiform.com"
                  data-s-event-props="location=blocks/components;label=ikiform.com"
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
          <CarbonAds />
        </aside>
      </div>
    </div>
  );
}
