import * as React from "react"

import { DocsList } from "@/components/docs/docs-content"
import { LegalLink, LegalSection } from "@/components/legal/legal-page"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { comparisons } from "@/lib/compare"
import { T, t } from "@/lib/i18n/rich"

type CompareRow = { label: string; values: React.ReactNode[] }

function CompareTable({
  caption,
  rowHeader,
  columns,
  rows,
}: {
  caption: string
  rowHeader?: string
  columns: string[]
  rows: CompareRow[]
}) {
  return (
    <div className="mt-6">
      <Table wrap aria-label={t(caption)}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">
              {rowHeader ? (
                t(rowHeader)
              ) : (
                <span className="sr-only">{t(caption)}</span>
              )}
            </TableHead>
            {columns.map((column) => (
              <TableHead key={column}>{t(column)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableHead scope="row">{t(row.label)}</TableHead>
              {row.values.map((value, index) => (
                <TableCell key={columns[index]}>
                  <T>{value}</T>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function MoreComparisons({ current }: { current: string }) {
  return (
    <LegalSection title="More comparisons">
      <DocsList>
        <li>
          <LegalLink href="/compare">All comparisons</LegalLink>
        </li>
        {comparisons
          .filter((page) => page.href !== current)
          .map((page) => (
            <li key={page.href}>
              <LegalLink href={page.href}>{page.title}</LegalLink>
            </li>
          ))}
      </DocsList>
    </LegalSection>
  )
}

export { CompareTable, MoreComparisons, type CompareRow }
