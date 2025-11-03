"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group touch-manipulation"
      aria-live="polite"
      aria-atomic="true"
      icons={{
        success: <CircleCheckIcon aria-hidden="true" className="size-4" />,
        info: <InfoIcon aria-hidden="true" className="size-4" />,
        warning: <TriangleAlertIcon aria-hidden="true" className="size-4" />,
        error: <OctagonXIcon aria-hidden="true" className="size-4" />,
        loading: <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
