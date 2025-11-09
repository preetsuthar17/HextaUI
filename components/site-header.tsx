import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderSearchTrigger } from "@/components/header-search-trigger";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <nav className="mx-auto flex w-[95%] flex-col flex-wrap items-start justify-start gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          aria-label="Hexta UI home"
          className="flex items-center gap-2 font-medium"
          href="/"
        >
          <Image alt="Hexta UI" height={20} src="/favicon.ico" width={20} />
          <span className="font-medium tracking-tight">HextaUI</span>
        </Link>
        <div className="max-w-xs flex-1 md:hidden">
          <HeaderSearchTrigger />
        </div>
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <Link
              className="text-sm underline-offset-4 hover:font-medium hover:underline"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 hover:font-medium hover:underline"
              href="/components"
            >
              Components
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 hover:font-medium hover:underline"
              href="/blocks"
            >
              Blocks
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 hover:font-medium hover:underline"
              href="https://preetsuthar.me/sponsor"
            >
              Sponsor
            </Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <Button
              aria-label="GitHub repository"
              asChild
              size="icon-sm"
              variant="ghost"
            >
              <Link
                href="https://github.com/preetsuthar17/hextaui"
                target="_blank"
              >
                <Github
                  aria-hidden="true"
                  className="text-muted-foreground"
                  size={20}
                />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
