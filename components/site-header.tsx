import Link from "next/link";
import { HeaderSearchTrigger } from "@/components/docs/header-search-trigger";
import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
        <ul className="flex flex-wrap items-center gap-4">
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:opacity-100 hover:underline"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:opacity-100 hover:underline"
              href="/components"
            >
              Components
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:opacity-100 hover:underline"
              href="/blocks"
            >
              Blocks
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:opacity-100 hover:underline"
              href="/showcase"
            >
              Showcase
            </Link>
          </li>
          <li>
            <Link
              className="text-sm underline-offset-4 opacity-60 hover:opacity-100 hover:underline"
              href="https://preetsuthar.me/sponsor"
            >
              Sponsor
            </Link>
          </li>
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
}
