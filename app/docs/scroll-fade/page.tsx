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
import { ScrollFadeDemo } from "@/components/examples/scroll-fade/demo"
import { ScrollFadeEdge } from "@/components/examples/scroll-fade/edge"
import { ScrollFadeHorizontal } from "@/components/examples/scroll-fade/horizontal"
import { getDocsComponentMetadata } from "@/lib/docs"
import { getRegistryItemUrl } from "@/lib/docs-registry"

export const metadata = getDocsComponentMetadata("scroll-fade")

const cssCode = `@import "tailwindcss";
@import "shadcn/tailwind.css";`

const usageCode = `<div className="scroll-fade h-64 overflow-y-auto">…</div>
<div className="flex scroll-fade-x overflow-x-auto">…</div>`

const sizeCode = `<div className="scroll-fade scroll-fade-16 overflow-y-auto">…</div>
<div className="scroll-fade scroll-fade-[20%] overflow-y-auto">…</div>
<div className="scroll-fade [--scroll-fade-reveal:12rem] overflow-y-auto">…</div>`

const linkClassName =
  "underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"

export default function Page() {
  return (
    <DocsComponentPage slug="scroll-fade">
      <DocsExample file="scroll-fade/demo">
        <ScrollFadeDemo />
      </DocsExample>

      <DocsSection title="Installation">
        <DocsParagraph>
          Scroll fade is a set of Tailwind utilities from shadcn&apos;s{" "}
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
          Add it to any element that scrolls. An edge fades only while there is
          more content past it, so a cut-off row signals &quot;keep
          scrolling&quot; and a list at rest keeps crisp edges.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="How it works">
        <DocsParagraph>
          The fade is a <DocsCode>mask-image</DocsCode>, so content dissolves
          into whatever is behind it. There&apos;s no overlay gradient to match
          to the background, and it works on images, tinted surfaces and glass.
          A CSS scroll-driven animation grows each edge&apos;s fade over the
          first and last 96px of scrolling. No JavaScript runs, and it never
          re-renders.
        </DocsParagraph>
        <DocsList>
          <li>Each fade is 12% of the container, capped at 40px.</li>
          <li>
            Browsers without scroll-driven animations show both fades all the
            time. It&apos;s a little less precise, but still reads as
            scrollable.
          </li>
          <li>
            <DocsCode>scroll-fade-x</DocsCode>,{" "}
            <DocsCode>scroll-fade-s</DocsCode> and{" "}
            <DocsCode>scroll-fade-e</DocsCode> follow the writing direction, so
            the start fade sits on the right in right-to-left layouts.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="scroll-fade/horizontal"
          title="Horizontal"
          description={
            <>
              A row of filters that scrolls sideways. Pair it with{" "}
              <DocsCode>no-scrollbar</DocsCode>, also from shadcn&apos;s CSS,
              when the fade alone shows that there&apos;s more.
            </>
          }
        >
          <ScrollFadeHorizontal />
        </DocsExample>
        <DocsExample
          file="scroll-fade/edge"
          title="One edge"
          description={
            <>
              A chat starts at the bottom, so only older messages above need a
              hint. <DocsCode>scroll-fade-t</DocsCode> fades the top alone, and{" "}
              <DocsCode>scroll-fade-t-16</DocsCode> makes it taller.
            </>
          }
        >
          <ScrollFadeEdge />
        </DocsExample>
        <DocsSection title="Size and reveal distance" level={3}>
          <DocsCodeBlock code={sizeCode} />
          <DocsParagraph>
            Sizes take the spacing scale or any length or percentage.{" "}
            <DocsCode>--scroll-fade-reveal</DocsCode> sets how far you scroll
            before an edge reaches its full fade.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>

      <DocsSection title="Good to know">
        <DocsList>
          <li>
            The mask fades the element&apos;s own background and border too. Put
            the surface on a wrapper and the fade on the scrolling child, as the
            examples do.
          </li>
          <li>
            A mask hides everything near the edge, including focus rings. Give
            the scrolling element some padding so focused items aren&apos;t
            faded out.
          </li>
          <li>
            Use{" "}
            <Link href="/docs/scroll-area" className={linkClassName}>
              Scroll area
            </Link>{" "}
            instead when you also want custom scrollbars. It has its own fades,
            measured with JavaScript, which work in every browser.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsAttributesTable
          label="Class"
          attributes={[
            {
              name: "scroll-fade, scroll-fade-y",
              description: "Fades the top and bottom edges.",
            },
            {
              name: "scroll-fade-x",
              description:
                "Fades the start and end edges, following direction.",
            },
            {
              name: "scroll-fade-t, scroll-fade-b",
              description: "Fades only the top or bottom edge.",
            },
            {
              name: "scroll-fade-s, scroll-fade-e",
              description: "Fades only the start or end edge.",
            },
            {
              name: "scroll-fade-l, scroll-fade-r",
              description:
                "Fades only the left or right edge, ignoring direction.",
            },
            {
              name: "scroll-fade-<size>",
              description: "Size of every fade.",
            },
            {
              name: "scroll-fade-{t,b,s,e}-<size>",
              description: "Size of one edge's fade.",
            },
            {
              name: "scroll-fade-none",
              description: "Turns the fade off, for example at a breakpoint.",
            },
            {
              name: "--scroll-fade-reveal",
              description:
                "Scroll distance over which an edge fades in. Defaults to 96px.",
            },
          ]}
        />
      </DocsSection>
    </DocsComponentPage>
  )
}
