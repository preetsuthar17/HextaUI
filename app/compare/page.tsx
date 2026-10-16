import type { Metadata } from "next"

import { DocsParagraph } from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import { InfoPage } from "@/components/site/info-page"
import { JsonLd } from "@/components/site/json-ld"
import { comparisons } from "@/lib/compare"
import { t } from "@/lib/i18n/rich"
import { pageMetadata } from "@/lib/metadata"
import {
  getShadcnComparisonHref,
  getShadcnComparisons,
} from "@/lib/shadcn-compare"
import { pageJsonLd } from "@/lib/structured-data"

const title = "HextaUI compared with shadcn/ui, AI Elements and more"

const description =
  "How HextaUI compares with shadcn/ui, AI Elements, assistant-ui, prompt-kit and shadcn AI chat templates, plus shadcn/ui comparisons component by component."

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/compare",
})

export default function Page() {
  const components = getShadcnComparisons()

  return (
    <InfoPage
      title="Comparisons"
      lead="Honest comparisons between HextaUI and the libraries people weigh it against, with when each one is the better choice. Facts were checked against each project’s source and docs on the date each page states."
    >
      <JsonLd
        data={pageJsonLd({
          path: "/compare",
          name: title,
          description,
          breadcrumbs: [{ name: "Compare", path: "/compare" }],
          type: "CollectionPage",
          items: [
            ...comparisons.map((page) => ({
              name: page.title,
              path: page.href,
            })),
            ...components.map((item) => ({
              name: item.name,
              path: getShadcnComparisonHref(item.slug),
            })),
          ],
        })}
      />
      <LegalSection title="Libraries">
        <ul className="mt-4 flex flex-col gap-2 text-base/7 text-muted-foreground">
          {comparisons.map((page) => (
            <li key={page.href}>
              <LegalLink href={page.href}>{t(page.title)}</LegalLink>
            </li>
          ))}
        </ul>
      </LegalSection>
      <LegalSection title="Component by component">
        <DocsParagraph>
          Each page puts one HextaUI component next to its shadcn/ui version:
          the parts, variants and props that differ, read from both sources, and
          the command to switch.
        </DocsParagraph>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-base/7">
          {components.map((item) => (
            <li key={item.slug}>
              <LegalLink href={getShadcnComparisonHref(item.slug)}>
                {item.name}
              </LegalLink>
            </li>
          ))}
        </ul>
      </LegalSection>
    </InfoPage>
  )
}
