"use client";

import Image from "next/image";
import Link from "next/link";
import { HeaderSearchTrigger } from "@/components/docs/header-search-trigger";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <nav className="mx-auto flex w-[95%] flex-col flex-wrap items-start justify-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          aria-label="Hexta UI home"
          className="flex items-center gap-2 font-medium"
          href="/"
        >
          <Logo size={26} />
          <span className="font-medium tracking-tight">HextaUI</span>
        </Link>
        <div className="max-w-xs flex-1 md:hidden">
          <HeaderSearchTrigger />
        </div>
        <div
          className="max-w-xs flex-1 md:hidden"
          onClick={() =>
            window.open(
              "https://shadcnblocks.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com",
              "_blank"
            )
          }
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="cursor-pointer gap-2 lowercase" tabIndex={0}>
                  <Image
                    alt="shadcnblocks logo"
                    className="invert"
                    height={16}
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                    width={16}
                  />
                  shadcnblocks.com
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>
                  shadcnblocks – The ultimate block set for Shadcn UI & Tailwind
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100"
              href="/components"
            >
              Components
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100"
              href="/blocks"
            >
              Blocks
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100"
              href="/showcase"
            >
              Showcase
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:underline hover:opacity-100"
              href="https://preetsuthar.me/sponsor"
            >
              Sponsor
            </Link>
          </li>
          <li
            onClick={() =>
              window.open(
                "https://shadcnblocks.com?utm_source=hextaui&utm_medium=referral&utm_campaign=component-docs&ref=hextaui.com",
                "_blank"
              )
            }
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="translate-y-0.5">
                  <Badge
                    className="cursor-pointer gap-2 lowercase"
                    tabIndex={0}
                  >
                    <Image
                      alt="shadcnblocks logo"
                      className="invert"
                      height={16}
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/images/logo/shadcnblocks-logo.svg"
                      width={16}
                    />
                    shadcnblocks.com
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>
                    shadcnblocks – The ultimate block set for Shadcn UI &
                    Tailwind
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
