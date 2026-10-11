import Link from "@/components/site/link"

import { DocsCodeBlock } from "@/components/docs/docs-code-block"
import { DocsComponentPage } from "@/components/docs/docs-component-page"
import {
  DocsCode,
  DocsList,
  DocsParagraph,
  DocsSection,
} from "@/components/docs/docs-content"
import { DocsExample } from "@/components/docs/docs-example"
import { DocsInstall } from "@/components/docs/docs-install"
import {
  DocsAttributesTable,
  DocsKeyboardTable,
  DocsPropsTable,
} from "@/components/docs/docs-props-table"
import { PaginationCompact } from "@/components/examples/pagination/compact"
import { PaginationComposable } from "@/components/examples/pagination/composable"
import { PaginationDemo } from "@/components/examples/pagination/demo"
import { PaginationLinks } from "@/components/examples/pagination/links"
import { PaginationLong } from "@/components/examples/pagination/long"
import { PaginationRtl } from "@/components/examples/pagination/rtl"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("pagination")

const importCode = `import { Pagination } from "@/components/ui/pagination"`

const usageCode = `const [page, setPage] = React.useState(1)

<Pagination page={page} count={25} onPageChange={setPage} />`

const renderType = "ReactElement | (props, state) => ReactElement"

const compositionCode = `Pagination
└── PaginationContent
    ├── PaginationItem
    │   └── PaginationPrevious
    ├── PaginationItem
    │   └── PaginationLink
    ├── PaginationItem
    │   └── PaginationEllipsis
    └── PaginationItem
        └── PaginationNext`

export default function Page() {
  return (
    <DocsComponentPage slug="pagination">
      <DocsExample file="pagination/demo">
        <PaginationDemo />
      </DocsExample>

      <DocsInstall
        dependencies={[
          "@base-ui/react",
          "@tabler/icons-react",
          "class-variance-authority",
          "cn",
        ]}
        files={[
          "components/ui/pagination.tsx",
          "components/ui/button.tsx",
          "lib/motion.ts",
        ]}
      />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          Give <DocsCode>Pagination</DocsCode> a <DocsCode>count</DocsCode> and
          it builds the whole bar. It always shows the same number of slots, so
          Previous, Next and the numbers never shift under your cursor while you
          click through pages. Leave <DocsCode>count</DocsCode> out to compose
          the parts yourself.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Composition">
        <DocsCodeBlock code={compositionCode} lang="text" />
      </DocsSection>

      <DocsSection title="Examples">
        <DocsExample
          file="pagination/long"
          title="Jump to a page"
          description={
            <>
              Click an ellipsis to type a page number. Enter jumps, an
              out-of-range number shakes the field, and Esc puts the ellipsis
              back. Turn it off with <DocsCode>jump={"{false}"}</DocsCode>.
            </>
          }
        >
          <PaginationLong />
        </DocsExample>
        <DocsExample
          file="pagination/compact"
          title="Compact"
          description={
            <>
              When the bar doesn&apos;t fit its container, it switches to
              Previous, &ldquo;Page 4 of 24&rdquo; and Next, and switches back
              when there&apos;s room. The label is a jump field too. Force
              either layout with <DocsCode>compact</DocsCode>.
            </>
          }
        >
          <PaginationCompact />
        </DocsExample>
        <DocsExample
          file="pagination/links"
          title="Links"
          description={
            <>
              With <DocsCode>getPageHref</DocsCode>, every page is a real link,
              so it can be opened in a new tab. Plain clicks still call{" "}
              <DocsCode>onPageChange</DocsCode>.
            </>
          }
        >
          <PaginationLinks />
        </DocsExample>
        <DocsExample
          file="pagination/composable"
          title="Composable"
          description={
            <>
              Without <DocsCode>count</DocsCode>, build the bar from the parts,
              as in shadcn/ui. Pass <DocsCode>render</DocsCode> to use your
              router&apos;s link.
            </>
          }
        >
          <PaginationComposable />
        </DocsExample>
        <DocsExample
          file="pagination/rtl"
          title="Right to left"
          description={
            <>
              <DocsCode>usePagination</DocsCode> returns the page and ellipsis
              items for custom layouts. Chevrons flip in right-to-left text.
            </>
          }
        >
          <PaginationRtl />
        </DocsExample>
      </DocsSection>

      <DocsSection title="Keyboard">
        <DocsKeyboardTable
          keys={[
            {
              keys: ["Tab"],
              description:
                "Moves into and out of the bar. Previous and Next stay focusable at the ends.",
            },
            {
              keys: ["←", "→"],
              description:
                "Moves between Previous, the pages and Next. Flips in right-to-left layouts.",
            },
            {
              keys: ["Home", "End"],
              description: "Moves to the first or last item.",
            },
            {
              keys: ["Enter"],
              description:
                "Opens the focused page or the page field. In the field, jumps to that page and focuses it.",
            },
            {
              keys: ["Esc"],
              description:
                "Closes the page field and returns focus to the ellipsis.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="Accessibility">
        <DocsList>
          <li>
            The root is a <DocsCode>{"<nav>"}</DocsCode> labelled
            &ldquo;Pagination&rdquo;, and the current page has{" "}
            <DocsCode>{'aria-current="page"'}</DocsCode>.
          </li>
          <li>
            At the first and last page, Previous and Next use{" "}
            <DocsCode>aria-disabled</DocsCode> instead of{" "}
            <DocsCode>disabled</DocsCode>, so focus isn&apos;t lost when you
            reach the end.
          </li>
          <li>
            The sliding indicator becomes a fade when reduced motion is on.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsSection title="Pagination" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "count",
                type: "number",
                description:
                  "Total pages. When set, the bar is built for you; leave it out to compose the parts.",
              },
              { name: "page", type: "number" },
              { name: "defaultPage", type: "number", default: "1" },
              { name: "onPageChange", type: "(page: number) => void" },
              {
                name: "getPageHref",
                type: "(page: number) => string",
                description: "Renders pages as links instead of buttons.",
              },
              {
                name: "siblings",
                type: "number",
                default: "1",
                description: "Pages shown on each side of the current one.",
              },
              {
                name: "boundaries",
                type: "number",
                default: "1",
                description: "Pages always shown at the start and end.",
              },
              {
                name: "compact",
                type: 'boolean | "auto"',
                default: '"auto"',
                description:
                  "auto switches to Previous, “Page x of y” and Next when the bar doesn't fit.",
              },
              {
                name: "jump",
                type: "boolean",
                default: "true",
                description: "Lets the ellipsis open a page field.",
              },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="pagination"',
                description: "The nav.",
              },
              {
                name: 'data-slot="pagination-indicator"',
                description: "The background that glides to the current page.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="PaginationLink" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "isActive",
                type: "boolean",
                default: "false",
                description: 'Marks the current page with aria-current="page".',
              },
              {
                name: "disabled",
                type: "boolean",
                default: "false",
                description: "Sets aria-disabled and ignores clicks.",
              },
              { name: "render", type: renderType, default: "<a>" },
            ]}
          />
          <DocsAttributesTable
            attributes={[
              {
                name: 'data-slot="pagination-link"',
                description: "Target page links in CSS.",
              },
              {
                name: "data-active",
                description: "Present on the current page.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="PaginationPrevious / PaginationNext" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "text",
                type: "ReactNode",
                default: '"Previous" / "Next"',
                description: "Pass null for an icon-only button.",
              },
              { name: "disabled", type: "boolean", default: "false" },
            ]}
          />
        </DocsSection>
        <DocsSection title="PaginationEllipsis" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "onJump",
                type: "(page: number) => void",
                description:
                  "Makes the ellipsis a page field. Without it, the ellipsis is decorative.",
              },
              {
                name: "count",
                type: "number",
                description: "The highest page the field accepts.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="usePagination" level={3}>
          <DocsPropsTable
            props={[
              { name: "page", type: "number" },
              { name: "count", type: "number" },
              { name: "siblings", type: "number", default: "1" },
              { name: "boundaries", type: "number", default: "1" },
            ]}
          />
          <DocsParagraph>
            Returns <DocsCode>items</DocsCode>, the clamped{" "}
            <DocsCode>page</DocsCode> and <DocsCode>count</DocsCode>, and{" "}
            <DocsCode>hasPrevious</DocsCode> and <DocsCode>hasNext</DocsCode>.
            See the{" "}
            <Link
              href="/docs/use-pagination"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              usePagination guide
            </Link>{" "}
            for building your own pager.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}
