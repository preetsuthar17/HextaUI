"use client"

import { usePathname } from "next/navigation"

import { getPathLocale, stripLocale } from "@/lib/i18n/config"

function useLocale() {
  return getPathLocale(usePathname() ?? "/")
}

function useSitePathname() {
  return stripLocale(usePathname() ?? "/")
}

export { useLocale, useSitePathname }
