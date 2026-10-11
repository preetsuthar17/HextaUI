"use client"

import Link from "@/components/site/link"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import {
  currentSponsor,
  sponsorHref,
  sponsorPlaceholder,
  type SponsorCard,
} from "@/lib/sponsor"

const linkClassName = cn(
  buttonVariants({ variant: "outline", size: "sm" }),
  "max-w-full"
)

function DocsSponsorCard({
  sponsor,
  placeholder = false,
  className,
}: {
  sponsor: SponsorCard
  placeholder?: boolean
  className?: string
}) {
  const href = sponsorHref(sponsor.url)

  return (
    <aside
      aria-label={placeholder ? "Sponsor HextaUI" : "Sponsor"}
      className={cn(
        "flex min-w-0 flex-col items-start gap-3 rounded-3xl bg-muted p-4.5 text-sm",
        className
      )}
    >
      {placeholder ? null : (
        <p className="text-xs text-muted-foreground">Sponsor</p>
      )}
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="font-medium text-pretty wrap-break-word text-foreground">
          {sponsor.headline}
        </p>
        <p className="text-pretty wrap-break-word text-muted-foreground">
          {sponsor.description}
        </p>
      </div>
      {placeholder ? (
        <Link href={href} className={linkClassName}>
          <span className="truncate">{sponsor.cta}</span>
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener"
          className={linkClassName}
        >
          <span className="truncate">{sponsor.cta}</span>
        </a>
      )}
    </aside>
  )
}

function DocsSponsor({ className }: { className?: string }) {
  return currentSponsor ? (
    <DocsSponsorCard sponsor={currentSponsor} className={className} />
  ) : (
    <DocsSponsorCard
      sponsor={sponsorPlaceholder}
      placeholder
      className={className}
    />
  )
}

export { DocsSponsor, DocsSponsorCard }
