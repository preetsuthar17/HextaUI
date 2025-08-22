import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";

import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import AskChatGPTButton from "@/components/other/AskChatGPTButton";
import CarbonAds from "@/components/other/carbon";
import CopyMarkdownButton from "@/components/other/CopyMarkdownButton";
import { UnifiedCopyOpenButton  } from "@/components/ai/page-actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  
  const doc = page.data

  const links = doc.links


  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      breadcrumb={{
        includeRoot: true,
        includeSeparator: true,
      }}
      footer={{
        enabled: true,
      }}
      editOnGithub={{
        owner: "preetsuthar17",
        repo: "hextaui",
        sha: "master",
        path: `content/docs/${page.file.path}`,
      }}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
      article={{
        className: "max-sm:pb-16",
      }}
    >
      <DocsTitle className="flex items-center gap-2 justify-between w-full">{page.data.title} <div className="flex gap-2">
        <UnifiedCopyOpenButton 
         markdownUrl={`${page.url}.mdx`} 
         githubUrl={`https://github.com/preetsuthar17/hextaui/blob/dev/apps/docs/content/docs/${page.path}`} 
         />
      </div></DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
        {links ? (
          <div>
            <div className="flex items-center gap-2">  
              {links?.doc && (
                <Badge variant="outline" className="flex items-center gap-2">
                  <Link href={links.doc} target="_blank" className="flex items-center gap-1" rel="noreferrer">
                    Docs <ArrowUpRight size={12}/>
                  </Link>
                </Badge>
              )}  
              {links?.api && (
                <Badge variant="outline" className="flex items-center gap-2">
                  <Link href={links.api} target="_blank" className="flex items-center gap-1" rel="noreferrer">
                    API Reference <ArrowUpRight size={12}/>
                  </Link>
                </Badge>
              )}
            </div>
          </div>
        ) : null}
      
      <CarbonAds format="cover" />
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();


  return customMetaDataGenerator({
    title: page.data.title,
    description: page.data.description,
    canonicalUrl: `https://hextaui.com/docs/${page.slugs.join("/")}`,
  });
}
