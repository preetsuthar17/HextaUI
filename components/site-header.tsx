import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex w-[95%] items-center justify-between px-4 py-4">
        <Link
          aria-label="Hexta UI home"
          className="flex items-center gap-2 font-medium"
          href="/"
        >
          <Image alt="Hexta UI" height={20} src="/favicon.ico" width={20} />
          <span className="font-medium tracking-tight">HextaUI</span>
        </Link>
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
              href="https://github.com/preetsuthar17/hextaui"
            >
              GitHub
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
        </ul>
      </nav>
    </header>
  );
}
