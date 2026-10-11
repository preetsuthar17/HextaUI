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
import { UseComposedRefDemo } from "@/components/examples/use-composed-ref/demo"
import { getDocsComponentMetadata } from "@/lib/docs"

export const metadata = getDocsComponentMetadata("use-composed-ref")

const importCode = `import { useComposedRef } from "@/hooks/use-composed-ref"`

const usageCode = `function SearchInput({ ref, ...props }: React.ComponentProps<"input">) {
  const [inputRef, setRef] = useComposedRef<HTMLInputElement>(ref)

  React.useEffect(() => {
    inputRef.current?.select()
  }, [inputRef])

  return <input ref={setRef} {...props} />
}`

const problemCode = `function SearchInput({ ref, ...props }: React.ComponentProps<"input">) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  return <input ref={inputRef} {...props} />
}`

export default function Page() {
  return (
    <DocsComponentPage slug="use-composed-ref">
      <DocsExample file="use-composed-ref/demo">
        <UseComposedRefDemo />
      </DocsExample>

      <DocsInstall dependencies={[]} files={["hooks/use-composed-ref.ts"]} />

      <DocsSection title="Usage">
        <DocsCodeBlock code={importCode} />
        <DocsCodeBlock code={usageCode} />
        <DocsParagraph>
          In React 19, <DocsCode>ref</DocsCode> is a regular prop. When your
          component also needs the element for itself, you have two refs and
          only one <DocsCode>ref</DocsCode> attribute. This hook gives you an
          object ref to read, plus a callback that fills both refs.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="The problem it solves">
        <DocsCodeBlock code={problemCode} />
        <DocsParagraph>
          This compiles, but the parent&apos;s <DocsCode>ref</DocsCode> is
          dropped, so <DocsCode>ref.current</DocsCode> stays{" "}
          <DocsCode>null</DocsCode> in the parent. With{" "}
          <DocsCode>useComposedRef</DocsCode>, both the parent and the component
          get the element.
        </DocsParagraph>
        <DocsList>
          <li>
            The returned <DocsCode>inputRef</DocsCode> is a normal{" "}
            <DocsCode>RefObject</DocsCode>, so you can pass it to hooks that
            expect one, like <DocsCode>useAutosize</DocsCode> or{" "}
            <DocsCode>useInvalidShake</DocsCode>.
          </li>
          <li>
            <DocsCode>setRef</DocsCode> keeps the same identity while the
            parent&apos;s ref does, so React doesn&apos;t detach and reattach it
            on every render.
          </li>
          <li>Works with object refs, callback refs and no ref at all.</li>
        </DocsList>
      </DocsSection>

      <DocsSection title="Composed or merged">
        <DocsParagraph>
          Use <DocsCode>useComposedRef</DocsCode> when you combine exactly one
          forwarded ref with your own object ref, which is most components. Use{" "}
          <Link
            href="/docs/use-merged-ref"
            className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
          >
            useMergedRef
          </Link>{" "}
          when you combine more than two, when one of them is a callback ref
          from another hook, or when a forwarded callback ref returns a React 19
          cleanup function. <DocsCode>useComposedRef</DocsCode> calls a callback
          ref with <DocsCode>null</DocsCode> on detach instead of running its
          cleanup.
        </DocsParagraph>
      </DocsSection>

      <DocsSection title="API reference">
        <DocsSection title="useComposedRef(ref)" id="parameters" level={3}>
          <DocsPropsTable
            props={[
              {
                name: "ref",
                type: "Ref<T> | undefined",
                description: "The ref your component received.",
              },
            ]}
          />
          <DocsAttributesTable
            label="Returns"
            attributes={[
              {
                name: "[0] RefObject<T | null>",
                description: "Your own ref to the element.",
              },
              {
                name: "[1] (node: T | null) => void",
                description: "Pass to the element's ref. Fills both refs.",
              },
            ]}
          />
        </DocsSection>
        <DocsSection title="Used by" level={3}>
          <DocsParagraph>
            <DocsCode>Input</DocsCode>, <DocsCode>Textarea</DocsCode>,{" "}
            <DocsCode>NativeSelect</DocsCode>, <DocsCode>Field</DocsCode> and{" "}
            <DocsCode>InputGroup</DocsCode>.
          </DocsParagraph>
        </DocsSection>
      </DocsSection>
    </DocsComponentPage>
  )
}
