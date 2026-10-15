"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

type ClassName<State> =
  string | ((state: State) => string | undefined) | undefined

function mergeClassName<State>(base: string, className: ClassName<State>) {
  return typeof className === "function"
    ? (state: State) => cn(base, className(state))
    : cn(base, className)
}

type ProgressSize = "xs" | "sm" | "default" | "lg"

type ProgressVariant = "default" | "success" | "warning" | "destructive"

type ProgressCircleSize = "sm" | "default" | "lg" | "xl"

const ProgressContext = React.createContext<{
  kind: "bar" | "circle"
  size: ProgressSize | ProgressCircleSize
  variant: ProgressVariant
} | null>(null)

function useProgressContext(part: string) {
  const context = React.useContext(ProgressContext)
  if (!context) {
    throw new Error(`${part} must be used within <Progress>.`)
  }
  return context
}

function toPercent(value: number | null | undefined, min: number, max: number) {
  if (value == null || !Number.isFinite(value)) {
    return null
  }
  const percent = ((value - min) * 100) / (max - min)
  return Number.isNaN(percent) ? 0 : Math.min(100, Math.max(0, percent))
}

const progressTrackVariants = cva(
  "relative flex w-full items-center overflow-hidden rounded-full bg-foreground/10 [--progress-dir:1] rtl:[--progress-dir:-1] dark:bg-foreground/15 forced-colors:border",
  {
    variants: {
      size: {
        xs: "h-0.5",
        sm: "h-1",
        default: "h-1.5",
        lg: "h-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-0 rounded-full transition-[width] duration-300 ease-spring data-indeterminate:transition-none data-indeterminate:before:absolute data-indeterminate:before:inset-y-0 data-indeterminate:before:start-0 data-indeterminate:before:w-2/5 data-indeterminate:before:rounded-full data-indeterminate:before:bg-inherit motion-safe:data-indeterminate:before:animate-progress-slide motion-reduce:transition-none motion-reduce:data-indeterminate:before:w-full motion-reduce:data-indeterminate:before:animate-skeleton-pulse forced-colors:bg-highlight",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const progressSegmentVariants = cva(
  "h-full w-(--progress-segment) shrink-0 transition-[width,margin-inline-start] duration-300 ease-spring data-gap:ms-0.5 motion-reduce:transition-none forced-colors:bg-highlight",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const progressCircleStroke = {
  default: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
} satisfies Record<ProgressVariant, string>

const progressCircleVariants = cva(
  "relative inline-grid size-(--progress-circle-size) shrink-0 place-items-center *:col-start-1 *:row-start-1",
  {
    variants: {
      size: {
        sm: "text-[0.5rem] [--progress-circle-size:1rem] [--progress-stroke:3px]",
        default:
          "text-[0.5rem] [--progress-circle-size:1.5rem] [--progress-stroke:2.5px]",
        lg: "text-[0.625rem] [--progress-circle-size:2.5rem] [--progress-stroke:2px]",
        xl: "text-sm [--progress-circle-size:4rem] [--progress-stroke:1.5px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type ProgressSegment = {
  value: number
  variant?: ProgressVariant
  label?: string
}

type ProgressProps = Omit<ProgressPrimitive.Root.Props, "value"> & {
  value?: ProgressPrimitive.Root.Props["value"]
  size?: ProgressSize
  variant?: ProgressVariant
  segments?: ProgressSegment[]
}

function segmentsText(
  segments: ProgressSegment[],
  locale: Intl.LocalesArgument
) {
  const format = new Intl.NumberFormat(locale)
  return segments
    .filter((segment) => segment.label && segment.value > 0)
    .map((segment) => `${format.format(segment.value)} ${segment.label}`)
    .join(", ")
}

function ProgressSegments({
  segments,
  min,
  max,
}: {
  segments: ProgressSegment[]
  min: number
  max: number
}) {
  let filled = false
  return segments.map((segment, index) => {
    const percent = toPercent(segment.value + min, min, max) ?? 0
    const gap = filled && percent > 0
    filled ||= percent > 0
    return (
      <span
        key={index}
        data-slot="progress-segment"
        data-variant={segment.variant ?? "default"}
        data-gap={gap ? "" : undefined}
        style={{ "--progress-segment": `${percent}%` } as React.CSSProperties}
        className={progressSegmentVariants({ variant: segment.variant })}
      />
    )
  })
}

function Progress({
  className,
  children,
  size = "default",
  variant = "default",
  locale = "en-US",
  segments,
  value,
  min = 0,
  max = 100,
  getAriaValueText,
  ...props
}: ProgressProps) {
  const context = React.useMemo(
    () => ({ kind: "bar" as const, size, variant }),
    [size, variant]
  )
  const total = segments
    ? segments.reduce(
        (sum, segment) =>
          sum + (Number.isFinite(segment.value) ? Math.max(0, segment.value) : 0),
        min
      )
    : undefined
  const labelled = segments?.some((segment) => segment.label)

  return (
    <ProgressContext.Provider value={context}>
      <ProgressPrimitive.Root
        data-slot="progress"
        data-size={size}
        data-variant={variant}
        locale={locale}
        value={total ?? value ?? null}
        min={min}
        max={max}
        getAriaValueText={
          getAriaValueText ??
          (segments && labelled
            ? (formattedValue) => {
                const parts = segmentsText(segments, locale)
                return parts
                  ? `${formattedValue ?? ""} (${parts})`.trim()
                  : (formattedValue ?? "")
              }
            : undefined)
        }
        className={mergeClassName(
          "flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2",
          className
        )}
        {...props}
      >
        {children}
        <ProgressTrack>
          {segments ? (
            <ProgressSegments segments={segments} min={min} max={max} />
          ) : (
            <ProgressIndicator />
          )}
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const { size } = useProgressContext("ProgressTrack")

  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={mergeClassName(
        progressTrackVariants({ size: size === "xl" ? "lg" : size }),
        className
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const { variant } = useProgressContext("ProgressIndicator")

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={mergeClassName(
        progressIndicatorVariants({ variant }),
        className
      )}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={mergeClassName(
        "min-w-0 flex-1 text-sm font-medium wrap-anywhere",
        className
      )}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  const { kind } = useProgressContext("ProgressValue")

  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={mergeClassName(
        kind === "bar"
          ? "ms-auto shrink-0 text-sm text-muted-foreground tabular-nums"
          : "font-medium tabular-nums",
        className
      )}
      {...props}
    />
  )
}

type ProgressCircleProps = ProgressPrimitive.Root.Props &
  VariantProps<typeof progressCircleVariants> & {
    variant?: ProgressVariant
  }

function ProgressCircle({
  className,
  children,
  size = "default",
  variant = "default",
  value,
  min = 0,
  max = 100,
  locale = "en-US",
  ...props
}: ProgressCircleProps) {
  const resolvedSize = size ?? "default"
  const context = React.useMemo(
    () => ({ kind: "circle" as const, size: resolvedSize, variant }),
    [resolvedSize, variant]
  )
  const percent = toPercent(value, min, max)

  return (
    <ProgressContext.Provider value={context}>
      <ProgressPrimitive.Root
        data-slot="progress-circle"
        data-size={resolvedSize}
        data-variant={variant}
        value={value}
        min={min}
        max={max}
        locale={locale}
        className={mergeClassName(
          progressCircleVariants({ size: resolvedSize }),
          className
        )}
        {...props}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          data-slot="progress-circle-svg"
          style={{ "--progress": percent ?? 0 } as React.CSSProperties}
          className="size-full -rotate-90"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            data-slot="progress-circle-track"
            className="stroke-foreground/10 [stroke-width:var(--progress-stroke)] dark:stroke-foreground/15"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            pathLength={100}
            data-slot="progress-circle-indicator"
            className={cn(
              "origin-center [stroke-width:var(--progress-stroke)] [stroke-dasharray:100_100] [stroke-linecap:round] [transform-box:fill-box]",
              progressCircleStroke[variant],
              percent === null
                ? "[stroke-dasharray:25_75] motion-safe:animate-spinner-rotate motion-reduce:animate-skeleton-pulse motion-reduce:[stroke-dasharray:100_100]"
                : "transition-[stroke-dashoffset,opacity] duration-300 ease-spring [stroke-dashoffset:calc(100_-_var(--progress))] motion-reduce:transition-none",
              percent === 0 && "opacity-0"
            )}
          />
        </svg>
        {children}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

export {
  Progress,
  ProgressCircle,
  progressCircleVariants,
  ProgressIndicator,
  progressIndicatorVariants,
  ProgressLabel,
  progressSegmentVariants,
  ProgressTrack,
  progressTrackVariants,
  ProgressValue,
}
export type {
  ProgressCircleProps,
  ProgressCircleSize,
  ProgressProps,
  ProgressSegment,
  ProgressSize,
  ProgressVariant,
}
