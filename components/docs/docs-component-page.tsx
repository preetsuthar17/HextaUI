import * as React from "react"

import { DocsPage } from "@/components/docs/docs-page"
import { DocsProBlocksNote } from "@/components/docs/docs-pro-blocks-note"
import { DocsRelated } from "@/components/docs/docs-related"
import { JsonLd } from "@/components/site/json-ld"
import { TrackedLink } from "@/components/site/tracked-link"
import { docsComponents, getDocsComponent } from "@/lib/docs"
import {
  getProBlocksUsing,
  getRelatedBlocks,
  getRelatedDocs,
} from "@/lib/docs-related"
import { T, t } from "@/lib/i18n/rich"
import { docsArticleJsonLd } from "@/lib/structured-data"

function DocsComponentPage({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const component = getDocsComponent(slug)
  const path = `/docs/${component.slug}`
  const isComponent = docsComponents.some((item) => item.slug === slug)

  return (
    <DocsPage
      href={path}
      title={component.name}
      description={component.description}
      markdownHref={`/docs/${component.slug}.md`}
      registryHref={`/r/${component.slug}.json`}
      note={<DocsProBlocksNote links={getProBlocksUsing(component.slug)} />}
    >
      <JsonLd
        data={docsArticleJsonLd({
          path,
          headline: component.name,
          description: component.description,
          breadcrumbs: [
            { name: "Docs", path: "/docs" },
            ...(isComponent
              ? [{ name: "Components", path: "/components" }]
              : []),
            { name: component.name, path },
          ],
          code: {
            name: component.name,
            free: true,
            license: "https://opensource.org/licenses/MIT",
          },
        })}
      />
      {children}
      <DocsRelated title="Related" links={getRelatedDocs(component.slug)} />
      <DocsRelated
        title="Used in Pro blocks"
        description={t("Blocks that build on {name}.", {
          name: component.name,
        })}
        links={getRelatedBlocks(component.slug)}
        event={{ name: "Pro link clicked", from: "component-related" }}
      >
        <p className="text-sm text-pretty text-muted-foreground">
          <T>
            Every block comes with{" "}
            <TrackedLink
              href="/pricing"
              event="Pro link clicked"
              eventProps={{ from: "component-related", to: "/pricing" }}
              className="text-foreground underline underline-offset-4"
            >
              HextaUI Pro
            </TrackedLink>
            , and Prompt Input is free.
          </T>
        </p>
      </DocsRelated>
    </DocsPage>
  )
}

export { DocsComponentPage }
