"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import {
  IconBrandOpenai,
  IconChevronDown,
  IconCopy,
  IconMarkdown,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  dropdownMenuItemVariants,
} from "@/components/ui/dropdown-menu"
import { absoluteUrl } from "@/lib/site"
import { track } from "@/lib/track"
import { useChrome } from "@/lib/i18n/chrome"

function IconV0(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 40 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z" />
      <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z" />
    </svg>
  )
}

function IconClaude(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
    </svg>
  )
}

function IconScira(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.53 5.72A7.64 7.64 0 1 0 17.44 17.53"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.03 4.69Q13.37 6.78 15.47 7.12Q13.37 7.47 13.03 9.56Q12.69 7.47 10.59 7.12Q12.69 6.78 13.03 4.69ZM18 3.84Q18.26 5.46 19.88 5.72Q18.26 5.98 18 7.59Q17.74 5.98 16.12 5.72Q17.74 5.46 18 3.84Z"
        fill="currentColor"
      />
      <path
        d="M16.41 9.84Q16.81 12.34 19.31 12.75Q16.81 13.16 16.41 15.66Q16 13.16 13.5 12.75Q16 12.34 16.41 9.84Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const assistants = [
  {
    name: "ChatGPT",
    icon: IconBrandOpenai,
    href: (prompt: string) => `https://chatgpt.com/?hints=search&q=${prompt}`,
  },
  {
    name: "Claude",
    icon: IconClaude,
    href: (prompt: string) => `https://claude.ai/new?q=${prompt}`,
  },
  {
    name: "Scira",
    icon: IconScira,
    href: (prompt: string) => `https://scira.ai/?q=${prompt}`,
  },
]

const markdownCache = new Map<string, Promise<string>>()

function loadMarkdown(href: string) {
  let request = markdownCache.get(href)

  if (!request) {
    request = fetch(href).then((response) => {
      if (!response.ok) {
        throw new Error(`Couldn't load ${href}`)
      }
      return response.text()
    })
    request.catch(() => markdownCache.delete(href))
    markdownCache.set(href, request)
  }

  return request
}

async function copyMarkdown(href: string) {
  const text = loadMarkdown(href)

  if (typeof ClipboardItem !== "undefined" && navigator.clipboard.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": text.then(
          (value) => new Blob([value], { type: "text/plain" })
        ),
      }),
    ])
    return
  }

  await navigator.clipboard.writeText(await text)
}

function DocsPageActions({
  markdownHref,
  registryHref,
  className,
}: {
  markdownHref: string
  registryHref?: string
  className?: string
}) {
  const prompt = encodeURIComponent(
    `Read ${absoluteUrl(markdownHref)}, I want to ask questions about it.`
  )
  const itemClassName = dropdownMenuItemVariants()
  const c = useChrome()

  return (
    <ButtonGroup aria-label={c("Page actions")} className={className}>
      <Button
        variant="secondary"
        size="sm"
        feedback
        successLabel={c("Copied")}
        errorLabel={c("Couldn’t copy")}
        onPointerEnter={() => {
          void loadMarkdown(markdownHref).catch(() => {})
        }}
        onClick={() => {
          track("Copy page")
          return copyMarkdown(markdownHref)
        }}
      >
        <IconCopy />
        {c("Copy page")}
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label={c("More page actions")}
            />
          }
        >
          <IconChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuGroup>
            <MenuPrimitive.LinkItem
              href={markdownHref}
              target="_blank"
              rel="noopener"
              closeOnClick
              className={itemClassName}
            >
              <IconMarkdown />
              {c("View as Markdown")}
            </MenuPrimitive.LinkItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {registryHref ? (
              <MenuPrimitive.LinkItem
                href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(
                  absoluteUrl(registryHref)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                closeOnClick
                className={itemClassName}
              >
                <IconV0 />
                Open in v0
              </MenuPrimitive.LinkItem>
            ) : null}
            {assistants.map((assistant) => (
              <MenuPrimitive.LinkItem
                key={assistant.name}
                href={assistant.href(prompt)}
                target="_blank"
                rel="noopener noreferrer"
                closeOnClick
                className={itemClassName}
              >
                <assistant.icon />
                Open in {assistant.name}
              </MenuPrimitive.LinkItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export { DocsPageActions, copyMarkdown, loadMarkdown }
