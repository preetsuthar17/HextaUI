"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/registry/new-york/ui/label";
import { Separator } from "@/registry/new-york/ui/separator";

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentProps<"fieldset">
>(function FieldSet({ className, ...props }, ref) {
  return (
    <fieldset
      aria-disabled={(props as any).disabled ? true : undefined}
      className={cn(
        "flex touch-manipulation flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      data-slot="field-set"
      ref={ref}
      {...props}
    />
  );
});

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.ComponentProps<"legend"> & { variant?: "legend" | "label" }
>(function FieldLegend({ className, variant = "legend", ...props }, ref) {
  return (
    <legend
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      data-slot="field-legend"
      data-variant={variant}
      ref={ref}
      {...props}
    />
  );
});

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldGroup({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "group/field-group @container/field-group flex w-full touch-manipulation flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      data-slot="field-group"
      ref={ref}
      {...props}
    />
  );
});

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
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
          "@md/field-group:flex-row flex-col @md/field-group:items-center @md/field-group:[&>*]:w-auto [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

const Field = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>
>(function Field({ className, orientation = "vertical", ...props }, ref) {
  return (
    <div
      aria-disabled={(props as any)["data-disabled"] ? true : undefined}
      className={cn(fieldVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="field"
      ref={ref}
      role="group"
      {...props}
    />
  );
});

const FieldContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldContent({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "group/field-content flex flex-1 flex-col gap-2 leading-snug",
        className
      )}
      data-slot="field-content"
      ref={ref}
      {...props}
    />
  );
});

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      data-slot="field-label"
      {...props}
    />
  );
}

const FieldTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function FieldTitle({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 font-medium text-sm leading-snug group-data-[disabled=true]/field:opacity-50",
        className
      )}
      data-slot="field-title"
      ref={ref}
      {...props}
    />
  );
});

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(function FieldDescription({ className, ...props }, ref) {
  return (
    <p
      className={cn(
        "font-normal text-muted-foreground text-sm tabular-nums leading-normal group-has-data-[orientation=horizontal]/field:text-balance",
        "nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5 last:mt-0",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      data-slot="field-description"
      ref={ref}
      {...props}
    />
  );
});

const FieldSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { children?: React.ReactNode }
>(function FieldSeparator({ children, className, ...props }, ref) {
  return (
    <div
      className={cn(
        "-my-2 group-data-[variant=outline]/field-group:-mb-2 relative h-5 text-sm",
        className
      )}
      data-content={!!children}
      data-slot="field-separator"
      ref={ref}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
});

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = React.useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={cn("font-normal text-destructive text-sm", className)}
      data-slot="field-error"
      {...props}
    >
      {content}
    </div>
  );
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
};
