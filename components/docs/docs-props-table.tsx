import * as React from "react"

import { DocsCode } from "@/components/docs/docs-content"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { markLiteral, t, translateNode } from "@/lib/i18n/rich"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DocsProp = {
  name: string
  type: string
  default?: string
  description?: React.ReactNode
}

function DocsPropsTable({ props }: { props: DocsProp[] }) {
  return (
    <Table variant="surface" wrap className="min-w-lg table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[42%]">{t("Prop")}</TableHead>
          <TableHead className="w-[38%]">{t("Type")}</TableHead>
          <TableHead className="w-[20%]">{t("Default")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableHead scope="row">
              <div className="flex flex-col items-start gap-1.5 font-normal">
                <DocsCode>{prop.name}</DocsCode>
                {prop.description ? (
                  <span className="text-sm text-muted-foreground">
                    {translateNode(prop.description)}
                  </span>
                ) : null}
              </div>
            </TableHead>
            <TableCell>
              <code className="font-mono text-xs leading-relaxed text-foreground/80">
                {prop.type}
              </code>
            </TableCell>
            <TableCell>
              <code className="font-mono text-xs leading-relaxed text-muted-foreground">
                {prop.default ?? "–"}
              </code>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type DocsKey = {
  keys: string[]
  description: React.ReactNode
}

function DocsKbd({ children }: { children: React.ReactNode }) {
  return <Kbd>{children}</Kbd>
}

function DocsKeyboardTable({ keys }: { keys: DocsKey[] }) {
  return (
    <Table variant="surface" wrap className="min-w-md table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[38%]">{t("Key")}</TableHead>
          <TableHead>{t("Action")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((row, index) => (
          <TableRow key={`${index}-${row.keys.join("+")}`}>
            <TableHead scope="row">
              <KbdGroup className="flex-wrap">
                {row.keys.map((key, index) => (
                  <Kbd key={`${index}-${key}`}>{key}</Kbd>
                ))}
              </KbdGroup>
            </TableHead>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {translateNode(row.description)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type DocsAttribute = {
  name: string
  description: React.ReactNode
}

function DocsAttributesTable({
  attributes,
  label = "Attribute",
}: {
  attributes: DocsAttribute[]
  label?: string
}) {
  return (
    <Table variant="surface" wrap className="min-w-md table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[42%]">{t(label)}</TableHead>
          <TableHead>{t("Description")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attributes.map((attribute) => (
          <TableRow key={attribute.name}>
            <TableHead scope="row">
              <DocsCode>{attribute.name}</DocsCode>
            </TableHead>
            <TableCell>
              <span className="text-sm text-muted-foreground">
                {translateNode(attribute.description)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

markLiteral(Kbd)
markLiteral(DocsKbd)

export { DocsAttributesTable, DocsKbd, DocsKeyboardTable, DocsPropsTable }
export type { DocsAttribute, DocsKey, DocsProp }
