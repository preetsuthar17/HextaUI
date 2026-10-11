"use client"

import * as React from "react"
import Link from "@/components/site/link"
import { cn } from "cn"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSharedHighlight } from "@/components/site/use-shared-highlight"
import type { DocsNavSection } from "@/lib/docs"
import { useSitePathname } from "@/lib/i18n/client"

const buttonSelector = "[data-sidebar=menu-button]"

function DocsNav({
  sections,
  onNavigate,
  className,
}: {
  sections: DocsNavSection[]
  onNavigate?: () => void
  className?: string
}) {
  const pathname = useSitePathname()
  const { navRef, highlightRef, handlers } = useSharedHighlight<HTMLElement>(
    pathname,
    buttonSelector,
    `${buttonSelector}[data-active]`
  )

  return (
    <nav
      ref={navRef}
      aria-label="Docs"
      className={cn(
        "relative isolate [&_[data-sidebar=menu-button]]:bg-transparent! [&_[data-sidebar=menu-button][data-active]]:font-medium",
        className
      )}
      {...handlers}
    >
      <span
        ref={highlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 rounded-md bg-sidebar-accent opacity-0 transition-all duration-200 ease-out-quint data-instant:transition-none motion-reduce:transition-none forced-colors:hidden"
      />
      {sections.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className="transition-none"
                    isActive={pathname === item.href}
                    render={<Link href={item.href} onNavigate={onNavigate} />}
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  )
}

export { DocsNav }
