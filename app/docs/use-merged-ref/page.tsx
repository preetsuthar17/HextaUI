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
  DocsPropsTable,
} from "@/components/docs/docs-props-table"
import { UseMergedRefDemo } from "@/components/examples/use-merged-ref/demo"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("use-merged-ref")

const importCode = `import { useMergedRef } from "@/hooks/use-merged-ref"`

const usageCode = `function Panel({ ref, ...props }: React.ComponentProps<"div">) {
  const localRef = React.useRef<HTMLDivElement>(null)
  const morphRef = useSizeMorph<HTMLDivElement>({ axis: "height" })
  const setRef = useMergedRef(ref, localRef, morphRef)

  return <div ref={setRef} {...props} />
}`

const cleanupCode = `const observeRef = React.useCallback((node: HTMLDivElement | null) => {
  if (!node) return
  const observer = new ResizeObserver(onResize)
  observer.observe(node)
  return () => observer.disconnect()
}, [onResize])

const setRef = useMergedRef(ref, observeRef)`

const unstableCode = `useMergedRef(ref, (node) => console.log(node))

const logRef = React.useCallback((node) => console.log(node), [])
useMergedRef(ref, logRef)`

export default function Page() {
  return (
    <DocsComponentPage slug="use-merged-ref">
      <DocsExample file="use-merged-ref/demo">
        <UseMergedRefDemo />
      </DocsExample>

      <DocsInstall dependencies={[]} files={["hooks/use-merged-ref.ts"]} />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          An element has one <DocsCode>ref</DocsCode>, but components often need
          to hand it to several places: the parent that forwarded a ref, a local
          ref for effects, and hooks that work through a callback ref.
          <DocsCode>useMergedRef</DocsCode> returns one callback that feeds all
          of them.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="How it works">
        <DocsParagraph>
          When the element attaches, every ref receives it. Object refs get{" "}
          <DocsCode>.current</DocsCode> set, and callback refs are called with
          the node. The merged callback returns a cleanup in the React 19 style.
          On detach it runs each callback ref&apos;s own cleanup, or calls the
          ref with <DocsCode>null</DocsCode> if it didn&apos;t return one, and
          resets object refs to <DocsCode>null</DocsCode>.
        </DocsParagraph>
        <DocsCodeBlock code={cleanupCode} />
        <DocsParagraph>
          That makes callback refs a good home for anything tied to the
          element&apos;s lifetime, like observers and listeners. Setup and
          teardown live together, and merging them with other refs keeps them
          working.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="Good to know">
        <DocsCodeBlock code={unstableCode} />
        <DocsList>
          <li>
            The merged callback changes whenever any ref changes. An inline
            arrow is a new ref on every render, so React detaches and reattaches
            the element each time. Wrap callback refs in{" "}
            <DocsCode>useCallback</DocsCode>.
          </li>
          <li>
            <DocsCode>undefined</DocsCode> and <DocsCode>null</DocsCode> refs
            are skipped, so you can pass optional props straight in.
          </li>
          <li>
            For one forwarded ref plus a local object ref,{" "}
            <Link
              href="/docs/use-composed-ref"
              className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              useComposedRef
            </Link>{" "}
            is shorter.
          </li>
        </DocsList>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsSection title="useMergedRef(...refs)" id="parameters" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "...refs",
                type: "Array<Ref<T> | undefined>",
                description: "Object refs, callback refs or undefined.",
              },
            ]}
          />
          <DocsAttributesTable
            label="Returns"
            attributes={[
              {
                name: "(node: T | null) => () => void",
                description:
                  "Pass to the element's ref. Returns the combined cleanup.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="Used by" level={3}>
          <DocsParagraph>
            <DocsCode>Field</DocsCode> and <DocsCode>InputGroup</DocsCode>.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}
