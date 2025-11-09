import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderSearchTrigger } from "@/components/header-search-trigger";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SiteHeader() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex w-[95%] flex-wrap items-center justify-between gap-4 px-4 py-4">
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
        <ul className="flex items-center gap-4">
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
            <a
              aria-label="GitHub repository"
              className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
              href="https://github.com/preetsuthar17/hextaui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github
                aria-hidden="true"
                className="text-muted-foreground"
                size={20}
              />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
