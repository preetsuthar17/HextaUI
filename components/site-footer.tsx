export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-[95%] items-center justify-between px-4 py-4 font-medium text-sm">
        <span>
          Built by{" "}
          <a
            className="underline hover:no-underline"
            href="https://preetsuthar.me/twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            Preet Suthar
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
            className="hover:underline"
            href="https://preetsuthar.me/github"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <span aria-hidden="true">/</span>
          <a
            className="hover:underline"
            href="https://preetsuthar.me/twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          <span aria-hidden="true">/</span>
          <a
            className="hover:underline"
            href="https://preetsuthar.me/sponsor"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sponsor
          </a>
        </nav>
      </div>
    </footer>
  );
}
