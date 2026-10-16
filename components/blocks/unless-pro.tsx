"use client"

import { usePro } from "@/lib/auth-client"

function UnlessPro({
  children,
  fallback = null,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const pro = usePro()
  return pro ? fallback : children
}

export { UnlessPro }
