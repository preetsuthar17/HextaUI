"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.ComponentProps<"table">
>(function Table({ className, ...props }, ref) {
  return (
    <div data-slot="table-wrapper" className="relative w-full overflow-auto touch-manipulation">
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
})

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"thead">
>(function TableHeader({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("[&_tr]:border-b tabular-nums", className)}
      {...props}
    />
  )
})

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"tbody">
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
})

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentProps<"tfoot">
>(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn("bg-muted/50 font-medium text-foreground tabular-nums", className)}
      {...props}
    />
  )
})

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentProps<"tr">
>(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-b transition-colors motion-safe:duration-200 hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
})

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"th">
>(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-10 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
        className
      )}
      scope={(props as any).scope ?? "col"}
      {...props}
    />
  )
})

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentProps<"td">
>(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn("p-4 align-middle tabular-nums", className)}
      {...props}
    />
  )}
)

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.ComponentProps<"caption">
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      aria-live="polite"
      aria-atomic="true"
      {...props}
    />
  )
})

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}