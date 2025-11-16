export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-[95%] flex-wrap items-center justify-between gap-8 px-4 py-4 font-medium text-sm">
        <span>
          Built by{" "}
          <a
            className="underline hover:no-underline"
            href="https://preetsuthar.me/twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            @preetsuthar17
          </a>
          . Theme by{" "}
          <a
            className="underline hover:no-underline"
            href="https://x.com/matsugfx"
            rel="noopener noreferrer"
            target="_blank"
          >
            @matsugfx
          </a>
          . The source code is available on{" "}
          <a
            className="underline hover:no-underline"
            href="https://github.com/preetsuthar17/hextaui"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          .
        </span>
        <nav className="flex items-center gap-2">
          <a
            aria-label="Preet Suthar on GitHub"
            className="hover:underline"
            href="https://preetsuthar.me/github"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="select-none">
            /
          </span>
          <a
            aria-label="Preet Suthar on Twitter"
            className="hover:underline"
            href="https://preetsuthar.me/twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          <span aria-hidden="true" className="select-none">
            /
          </span>
          <a
            aria-label="Sponsor Preet Suthar"
            className="hover:underline"
            href="https://preetsuthar.me/sponsor"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sponsor
          </a>
          <span aria-hidden="true" className="select-none">
            /
          </span>
          <a
            aria-label="RSS Feed"
            className="hover:underline"
            href="/rss.xml"
            rel="alternate"
            type="application/rss+xml"
          >
            RSS
          </a>
          <span aria-hidden="true" className="select-none">
            /
          </span>
          <a
            aria-label="LLMs"
            className="hover:underline"
            href="/llms.txt"
            rel="noopener noreferrer"
            target="_blank"
          >
            LLMs
          </a>
        </nav>
      </div>
    </footer>
  );
}
