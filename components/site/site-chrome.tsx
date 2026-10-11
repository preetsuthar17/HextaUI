"use client"

import { useSitePathname } from "@/lib/i18n/client"

function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = useSitePathname()
  return pathname.startsWith("/preview/") ? null : children
}

export { SiteChrome }
