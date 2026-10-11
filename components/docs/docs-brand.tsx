import Link from "@/components/site/link"
import { cn } from "cn"

function DocsBrand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex h-8 items-center rounded-md px-2 text-sm font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:outline-hidden",
        className
      )}
    >
      HextaUI
    </Link>
  )
}

export { DocsBrand }
