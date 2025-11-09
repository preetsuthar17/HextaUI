import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AskAIButton } from "@/components/ask-ai-button";
import { BlockDemo } from "@/components/block-demo";
import BlockHeaderActions from "@/components/block-header-actions";
import { BlockPrevNext } from "@/components/block-prev-next";
import { BlocksSidebar } from "@/components/blocks-sidebar";
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
import {
  blocksRegistry,
  categoryLabels,
  getBlockMetaById,
} from "@/lib/blocks-registry";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";

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
          <BlockDemo blockId={meta.id} Component={Component} />

          <Separator />
          <BlockPrevNext currentId={meta.id} />
        </div>
      </div>
    </div>
  );
}
