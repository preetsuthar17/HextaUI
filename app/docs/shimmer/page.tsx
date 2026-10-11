import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsCommand } from "@/components/docs/docs-command"
import { DocsComponentPage } from "@/components/docs/docs-component-page"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { DocsAttributesTable } from "@/components/docs/docs-props-table"
import { ShimmerDemo } from "@/components/examples/shimmer/demo"
import { ShimmerOptions } from "@/components/examples/shimmer/options"
import { ShimmerStatus } from "@/components/examples/shimmer/status"
import { getDocsComponentMetadata } from "@/lib/docs"
import { getRegistryItemUrl } from "@/lib/docs-registry"

export const metadata = getDocsComponentMetadata("shimmer")

const cssCode = `@import "tailwindcss";
@import "shadcn/tailwind.css";`

const usageCode = `<p className="shimmer text-muted-foreground">Generating response…</p>`

const responsiveCode = `<p className="shimmer md:shimmer-none">Generating response…</p>
<p className="shimmer shimmer-reverse">Undoing…</p>`

const linkClassName =
  "underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"

export default function Page() {
  return (
    <DocsComponentPage slug="shimmer">
      <DocsExample file="shimmer/demo">
        <ShimmerDemo />
      </DocsExample>

      <DocsSection title="Installation">
        <DocsParagraph>
          Shimmer is a Tailwind utility from shadcn&apos;s{" "}
          <DocsCode>tailwind.css</DocsCode>. The HextaUI theme already imports
          it, so if you&apos;ve added the theme or any component, you have it.
        </DocsParagraph>
        <DocsCommand
          mode="dlx"
          packages={["shadcn@latest", "add", getRegistryItemUrl("theme")]}
        />
        <DocsParagraph>
          Without the theme, install <DocsCode>shadcn</DocsCode> and import its
          CSS after Tailwind.
        </DocsParagraph>
        <DocsCommand packages={["shadcn"]} />
        <DocsCodeBlock code={cssCode} lang="css" title="app/globals.css" />
      </DocsSection>

      <DocsSection title="Usage">
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          Use it on short text that describes work in progress, like an
          assistant thinking, a file processing or a step that&apos;s running.
          The moving highlight says &quot;still working&quot; without a spinner
          taking up space beside the words.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="How it works">
        <DocsParagraph>
          The text is painted with a gradient through{" "}
          <DocsCode>background-clip: text</DocsCode>, and a lighter band slides
          across it. The band is derived from the text&apos;s own color, so it
          suits muted, foreground or colored text without configuration, and it
          brightens in dark mode, where a lighter band reads better.
        </DocsParagraph>
        <DocsList>
          <li>
            Under reduced motion the gradient is removed entirely and the text
            renders in its normal color.
          </li>
          <li>
            In right-to-left layouts the sweep reverses, so it still travels in
            reading direction.
          </li>
          <li>
            The text stays real text: selectable, searchable and read normally
            by screen readers.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="shimmer/options"
          title="Options"
          description="Speed, band width, color and angle are each one class."
        >
          <ShimmerOptions />
        </DocsExample>
        <DocsExample
          file="shimmer/status"
          title="Status updates"
          description={
            <>
              Shimmer while a task runs, then sweep once with{" "}
              <DocsCode>shimmer-once</DocsCode> when it finishes. Changing the
              key restarts the sweep for each new step.
            </>
          }
        >
          <ShimmerStatus />
        </DocsExample>
        <DocsSection title="Direction and breakpoints" level={3}>
          <DocsCodeBlock code={responsiveCode} />
        </DocsSection>
      </DocsSection>

      <DocsSection title="Good to know">
        <DocsList>
          <li>
            Keep it to a line or two. A shimmering paragraph is tiring to read.
          </li>
          <li>
            Put the text in a <DocsCode>role=&quot;status&quot;</DocsCode>{" "}
            region when it changes, so the new step is announced. The shimmer
            itself is decoration.
          </li>
          <li>
            For placeholder blocks rather than text, use{" "}
            <Link href="/docs/skeleton" className={linkClassName}>
              Skeleton
            </Link>
            , which shimmers surfaces with the theme&apos;s{" "}
            <DocsCode>animate-shimmer</DocsCode>.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsAttributesTable
          label="Class"
          attributes={[
            {
              name: "shimmer",
              description: "Sweeps a highlight across the text, every 2s.",
            },
            {
              name: "shimmer-once",
              description: "Sweeps once instead of repeating.",
            },
            {
              name: "shimmer-reverse",
              description: "Sweeps in the opposite direction.",
            },
            {
              name: "shimmer-none",
              description: "Turns it off, for example at a breakpoint.",
            },
            {
              name: "shimmer-color-<color>",
              description:
                "Color of the highlight, from the theme or arbitrary. Takes an opacity modifier.",
            },
            {
              name: "shimmer-duration-<ms>",
              description: "Length of one sweep in milliseconds.",
            },
            {
              name: "shimmer-spread-<number>",
              description:
                "Width of the band on the spacing scale, or any length. Defaults to 3ch + 40px.",
            },
            {
              name: "shimmer-angle-<deg>",
              description: "Tilt of the band. Defaults to 20°.",
            },
          ]}
        />
      </DocsSection>
    </DocsComponentPage>
  )
}
