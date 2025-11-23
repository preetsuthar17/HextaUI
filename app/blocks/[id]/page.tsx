import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { AskAIButton } from "@/components/docs/ask-ai-button";
import { BlockDemo } from "@/components/docs/block-demo";
import BlockHeaderActions from "@/components/docs/block-header-actions";
import { BlockPrevNext } from "@/components/docs/block-prev-next";
import { BlocksSidebar } from "@/components/docs/blocks-sidebar";
import { ComponentSection } from "@/components/docs/component-section";
import ComponentUsage from "@/components/docs/component-usage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  blocksRegistry,
  categoryLabels,
  getBlockMetaById,
} from "@/lib/blocks-registry";
import { getComponentCode } from "@/lib/get-component-code";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

const ComponentInstallation = dynamic(
  () =>
    import("@/components/docs/component-installation").then(
      (mod) => mod.ComponentInstallation
    ),
  {
    loading: () => <Spinner />,
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
    <div className="mx-auto flex max-w-7xl flex-col gap-8 py-12">
      <div className="flex justify-evenly gap-12">
        <BlocksSidebar currentId={meta.id} />
        <div className="flex w-full max-w-4xl flex-col gap-12">
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
          <Suspense fallback={<Spinner />}>
            <BlockDemo blockId={meta.id} Component={Component} />
          </Suspense>
          {/* Installation second */}
          <ComponentSection id="installation">
            <Suspense fallback={<Spinner />}>
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
        </div>
      </div>
    </div>
  );
}
