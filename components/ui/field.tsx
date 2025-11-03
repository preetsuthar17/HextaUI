"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentProps<"fieldset">
>(function FieldSet({ className, ...props }, ref) {
  return (
    <fieldset
      ref={ref}
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6 touch-manipulation",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
})

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.ComponentProps<"legend"> & { variant?: "legend" | "label" }
>(function FieldLegend({ className, variant = "legend", ...props }, ref) {
  return (
    <legend
      ref={ref}
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
})

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 touch-manipulation",
        className
      )}
      {...props}
    />
  )
})

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

const Field = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>
>(function Field({ className, orientation = "vertical", ...props }, ref) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="field"
      data-orientation={orientation}
      aria-invalid={(props as any)["data-invalid"] ? true : undefined}
      aria-disabled={(props as any)["data-disabled"] ? true : undefined}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
})

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
})

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

const FieldTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
})

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function FieldDescription({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance tabular-nums",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
})

const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function FieldSeparator({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
})

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
