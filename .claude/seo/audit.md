# HextaUI SEO audit

Date: 2026-10-16. Commit audited: `ea0b528` on `main`, built with the Pro checkout present (25 Pro blocks).

Sources: `pnpm build` output in `out/` (845 HTML files, 7,257 files in total), crawled with a script that reads every HTML file's head, JSON-LD, headings, links and asset hints, then a breadth-first walk of internal links from `/`. The live site at https://hextaui.com was sampled for headers, TTFB and parity (live `sitemap.xml` has the same 815 URLs as the build).

## Summary

The foundations are solid. Every indexable page has a unique title, a description of 68 to 159 characters, a self canonical and, where translated, eight hreflang links. No indexable page is deeper than three clicks. The gaps are breadth and richness, not hygiene:

1. **Long-tail example queries have no landing page.** 600 titled examples live only as `#anchors` inside 79 docs pages. Queries like "shadcn button loading state" or "react combobox multi select" land on a 1 MB page whose title names only the component.
2. **One Open Graph image for all 815 URLs.** Every share card shows the same generic image.
3. **Structured data stops at TechArticle.** 16 English pages (hubs, guides, compare, legal) have no page-level JSON-LD, no index page carries an ItemList, the WebSite node has no SearchAction, and non-docs pages have no BreadcrumbList.
4. **No hub pages between `/components` and 65 components.** "react form components" or "shadcn chat components" have no target.
5. **No per-component shadcn/ui comparison.** HextaUI's main differentiator against shadcn/ui is per component (finished states, extra props, extra parts), but the only comparison is one site-level page.
6. **Sitemap has no image entries and no `/compare` index page exists.**

## Inventory

| Set | English URLs | Translated copies (6 locales) | Notes |
| --- | --- | --- | --- |
| Home | 1 | 6 | |
| `/components` | 1 | 6 | 65 live cards |
| `/docs` guides | 4 | 18 | `/docs/api` is English only |
| `/docs/<component>` | 65 | 390 | |
| `/docs/<hook or utility>` | 14 | 84 | |
| `/blocks` + `/blocks/<name>` | 26 | 156 | 25 Pro blocks, Prompt Input free |
| `/compare/<slug>` | 5 | 30 | no `/compare` index |
| About, changelog, contact, pricing, sponsor, legal | 9 | 0 | English only by design |
| **Indexable total** | **125** | **690** | **815** |

Noindex, correctly excluded from the sitemap: `/404`, `/account`, `/docs/stress`, `/unsubscribe` and the 25 `/preview/blocks/*` frames (`noindex, nofollow, indexifembedded`). `robots.txt` disallows `/docs/stress`, `/account`, `/api/` and `/unsubscribe`, and leaves `/preview/` crawlable so `indexifembedded` can work. Markdown twins, `/r/*`, `/mcp/*`, `/docs/search.json`, `/docs/source/*` and every `.txt` carry `X-Robots-Tag: noindex` from `public/_headers`, and the Markdown twins send a canonical `Link` header back to the HTML page.

## Titles and descriptions

- **Duplicates:** none. 815 titles and 125 English descriptions are all unique. Translated pages have translated titles and descriptions (690 of 690).
- **Length:** docs titles are 13 to 65 characters with the " — HextaUI" suffix, enforced at 60 before the suffix by `lib/docs-titles.test.ts`. Descriptions run 68 to 159 characters through the 160-character clamp in `lib/metadata.ts`.
- **Weak titles:** `/pricing` ("Pricing"), `/about` ("About"), `/contact`, `/changelog` and `/sponsor` carry no query terms. The docs component default ("{Name} component for React & shadcn/ui") matches "shadcn {name}" and "react {name} component", but no title mentions Tailwind or Base UI.
- **Short description:** `/legal/terms` at 68 characters, acceptable for a legal page.

## Structured data

Every page carries the root graph from `app/layout.tsx`: WebSite, Organization and SoftwareSourceCode.

| Page-level type | English pages | Where |
| --- | --- | --- |
| BreadcrumbList | 104 | docs entries and blocks only |
| TechArticle (with SoftwareSourceCode `about`) | 104 | docs entries and blocks |
| FAQPage | 5 | home, pricing, three compare pages |
| Product | 1 | pricing |
| ItemList | 0 | none, including `/components`, `/blocks`, `/docs` |

Pages with only the site graph: `/about`, `/blocks`, `/changelog`, `/compare/shadcn-ai-chat-templates`, `/compare/shadcn-ui`, `/components`, `/contact`, `/docs`, `/docs/api`, `/docs/installation`, `/docs/mcp`, the four `/legal/*` pages and `/sponsor`.

Notes on eligibility, so the work targets what Google actually renders:

- BreadcrumbList is the only rich result every page can earn. It needs `itemListElement` entries with `position`, `name` and `item`.
- SoftwareApplication rich results require `aggregateRating` or `review`. HextaUI has no real ratings, so SoftwareSourceCode stays the honest type for components and none should be invented.
- FAQ rich results have been limited to government and health sites since 2023. FAQPage markup is still valid and still read by other engines and assistants, so it belongs only where a page shows real questions.
- Google retired the sitelinks search box in November 2024. A SearchAction is still valid schema and still useful to other consumers, so it is worth adding only if the URL template really opens search.

## Open Graph

All 815 indexable URLs point `og:image` and `twitter:image` at the single `/opengraph-image`. Titles and descriptions are per page, images are not.

## Internal links and depth

Breadth-first from `/` over `<a href>` in the built HTML:

| Clicks from home | Pages |
| --- | --- |
| 0 | 1 |
| 1 | 37 |
| 2 | 225 |
| 3 | 552 |
| more than 3 | 0 |

The docs sidebar, footer and locale switcher do most of the work. Docs pages link to related components (registry dependencies, then category, then dependents) and to the Pro blocks that use them, and block pages link back with "Built with". There are no visible breadcrumbs and no hub pages per category. Any new page set has to be linked from an existing depth-2 page to stay within three clicks.

## Sitemap and robots

- `sitemap.xml` is one file: 815 URLs, 690 KB, 6,440 `xhtml:link` alternates.
- Every locale URL is listed with all eight alternates (en, es, de, pt, fr, tr, ja, x-default). English-only pages correctly have none.
- `lastmod` is present on all 815 entries, from `git log` of the page file plus the component's example, ui, hook and lib sources, and from the Pro repository for blocks. Dates range from 2026-10-05 to 2026-10-15, which reflects real edits.
- No `image:image` entries.
- `robots.txt` is correct and points at the sitemap. `host` is set, which Google ignores but is harmless.

## Core Web Vitals risks

Measured on the build and sampled live (TTFB plus download 0.13 to 0.56 s).

| Risk | Where | Evidence | Severity |
| --- | --- | --- | --- |
| Heavy HTML and RSC payload | `/docs/sidebar`, `/docs/data-table`, `/docs/dropdown-menu`, `/docs/combobox` | 1.0 to 1.14 MB HTML, 287 to 366 KB inline flight data, text ratio 2.6 to 3.4 % | Medium, INP and TBT on mid-range phones |
| Monospace font swap | every page with code | `PaperMono` uses `display: swap` with `adjustFontFallback: false`, so code blocks reflow when it loads | Low, preloaded, code sits below the fold on most pages |
| Third-party image in the LCP line | home H1 | `github.com/shadcn.png` inline, 64 px, sized | Low, sized so no CLS, adds one connection |
| Render-blocking CSS | all pages | two stylesheets | Low, expected |
| Images without dimensions | `/docs/aspect-ratio` | demo images inside fixed-ratio boxes | None, the box reserves the space |

The home page sits at 5.58 % text ratio with ordered headings, just above the 5 % rule. Titled example demos already mount after load through `DocsDeferredPreview`, and the 1.5 MB HTML budget passes with 0.33 MB to spare on the largest page.

## Keyword map

Query patterns the audience types, mapped to the page that should rank and its state before this work.

| Query pattern | Examples | Target page | State before |
| --- | --- | --- | --- |
| brand | hextaui, hexta ui | `/` | Covered |
| shadcn {component} | shadcn combobox, shadcn tree view | `/docs/{slug}` | Covered by title ("… for React & shadcn/ui") |
| react {component} component | react toast component | `/docs/{slug}` | Covered |
| {component} tailwind | tailwind drawer, tailwind otp input | `/docs/{slug}` | Weak: Tailwind is not in titles or most descriptions |
| base ui {component} | base ui select, base ui dialog | `/docs/{slug}` | Weak: Base UI appears in API sections only |
| shadcn {component} examples | shadcn button examples | `/docs/{slug}` `#examples` | Weak: anchors only |
| shadcn {component} {variant or state} | shadcn button loading, shadcn combobox multiple, shadcn dialog nested | none | **Gap: 600 examples with no URL** |
| react {component} {feature} | react drawer snap points, react carousel thumbnails | none | **Gap** |
| shadcn {component} alternative, hextaui vs shadcn {component} | shadcn button alternative | `/compare/shadcn-ui` | **Gap per component**, site-level page only |
| react {category} components | react form components, react overlay components | `/components` | **Gap: no category hubs** |
| shadcn chat components, react chat ui components | | `/components` | **Gap** |
| ai chat ui react, react ai chat components | | `/blocks`, `/blocks/chat-thread` | Covered |
| shadcn ai chat, shadcn ai chat template | | `/compare/shadcn-ai-chat-templates`, `/blocks/hexta-ai` | Covered |
| shadcn ai blocks, shadcn {screen} block | shadcn billing page, shadcn settings page | `/blocks/{name}` | Covered by `lib/pro/titles.ts` |
| {competitor} alternative | ai elements alternative, assistant-ui alternative, prompt-kit alternative | `/compare/{slug}` | Covered for four |
| {competitor} alternative, other libraries | magic ui, aceternity ui, origin ui, kibo ui alternative | none | Gap, needs hand-written research, not programmatic |
| {component} vs {component} | dialog vs sheet, popover vs tooltip, select vs combobox | none | Gap, needs hand-written guidance per pair |
| shadcn registry | shadcn registry list, shadcn custom registry | `/docs/installation` | Weak: covered only as a section |
| shadcn hooks, react {hook} hook | react autosize textarea hook | `/docs/use-*` | Covered |
| shadcn mcp server, ui components mcp | | `/docs/mcp` | Covered |
| pricing | hextaui pro, hextaui pricing | `/pricing` | Covered, weak title |
| translated variants | componentes react shadcn, shadcn コンポーネント | `/{locale}/docs/{slug}` | Covered for docs, blocks, compare |

Components that shadcn/ui ships in its base-vega registry and HextaUI does not: `form`, `sonner`, `direction`, `trace`, `code-block` (a Pro block covers it). Components HextaUI ships that shadcn/ui does not: `data-table` (a guide in shadcn/ui), `date-picker`, `number-flow`, `tree`, `video-player`.

## Plan, highest impact first

1. **Example pages:** one indexable page per titled example at `/docs/{component}/examples/{example}`, rendered from the docs page's own JSX so the demo, description and source never drift. Each carries the live demo, the full source, the props from the component's API table that this example actually sets, install command, sibling examples and related components, plus its own title, description, breadcrumbs and JSON-LD. English only: 600 pages times seven languages would add about 25,000 files, past Cloudflare Pages' 20,000-file limit, and the content is mostly code.
2. **Per-component shadcn/ui comparisons** at `/compare/shadcn-ui/{component}`, from a dated snapshot of the shadcn/ui base-vega registry: exported parts, variants, sizes, the props each wrapper handles itself, dependencies and source size, side by side, with the HextaUI-only props described from the API table.
3. **Category hubs** at `/components/{category}` for the eight categories with three or more components, with written intros, live cards, descriptions and the Pro blocks built from them.
4. **A `/compare` index** with ItemList.
5. **Structured data everywhere:** BreadcrumbList on every indexable page, ItemList on index pages, SearchAction on WebSite backed by a working `?q=` search URL, SoftwareSourceCode for examples.
6. **Per-page OG images** for docs entries, comparisons and hubs, rendered by the existing `app/opengraph-image.tsx` design.
7. **Sitemap index** split by section, with `lastmod` from one `git log` pass and `image:image` entries for the new OG images.
8. **Title rewrites** for `/pricing`, `/about`, `/changelog`, `/contact` and `/sponsor`.
9. **A build check** that parses every page's JSON-LD and fails on missing required properties, so structured data is validated by schema shape on every build.

Left for later, on purpose: "{component} vs {component}" guides and more competitor pages need hand-written judgment per page, and templated versions would be thin.

## Before and after

Filled in after implementation.

## Appendix: every English indexable route

Translated copies mirror these rows: all 690 have a self canonical on the locale URL, eight hreflang links, translated titles and the same JSON-LD types with `inLanguage` set. Depth is clicks from `/`.

| Route | Title (before the site suffix) | Desc chars | Canonical | hreflang | Page JSON-LD | OG image | Depth |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | HextaUI — React components and blocks for shadcn/ui | 155 | self | 8 | FAQPage | /opengraph-image | 0 |
| `/about` | About | 72 | self | none | site graph only | /opengraph-image | 1 |
| `/blocks` | React blocks for AI products, built on shadcn/ui | 138 | self | 8 | site graph only | /opengraph-image | 1 |
| `/blocks/agent-todos` | AI Agent Plan & Todo List block for React & shadcn/ui | 153 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/api-keys` | API Keys Settings Page block for React & shadcn/ui | 159 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/appearance` | Appearance Settings block for React & shadcn/ui | 156 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/artifact` | AI Artifact Preview Panel for React & shadcn/ui | 153 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/billing` | Billing & Usage Page block for React & shadcn/ui | 156 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/chat-sidebar` | AI Chat Sidebar block for React & shadcn/ui | 159 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/chat-thread` | AI Chat Thread block for React & shadcn/ui | 157 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/blocks/code-block` | AI Code Block with streaming highlighting for React | 156 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/diff-review` | AI Code Diff Review block for React & shadcn/ui | 159 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/hexta-ai` | HextaAI: complete AI chat app template for React | 156 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/markdown` | Streaming Markdown for AI chat in React & shadcn/ui | 155 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/models` | AI Model Settings block for React & shadcn/ui | 151 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/notifications` | Notification Settings block for React & shadcn/ui | 157 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/profile` | Profile Settings block for React & shadcn/ui | 156 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/prompt-input` | Prompt Input: AI chat input for React & shadcn/ui | 122 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/blocks/security` | Security & Sessions Settings for React & shadcn/ui | 158 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/settings` | AI Product Settings Page block for React & shadcn/ui | 155 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/stack-trace` | AI Stack Trace and error view for React & shadcn/ui | 143 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/streaming` | Streaming Text for AI responses in React & shadcn/ui | 157 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/subagents` | AI Subagents UI block for React & shadcn/ui | 139 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/team` | Team Members & Invites block for React & shadcn/ui | 158 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/test-results` | AI Test Results UI block for React & shadcn/ui | 147 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/thinking` | AI Thinking & Reasoning block for React & shadcn/ui | 157 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/blocks/tool-calls` | AI Tool Calls UI block for React & shadcn/ui | 147 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/blocks/voice-mode` | AI Voice Mode UI block for React & shadcn/ui | 158 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/changelog` | Changelog | 114 | self | none | site graph only | /opengraph-image | 1 |
| `/compare/ai-elements` | HextaUI vs AI Elements: pieces or finished screens | 154 | self | 8 | FAQPage | /opengraph-image | 1 |
| `/compare/assistant-ui` | HextaUI vs assistant-ui: chat runtime or screens | 156 | self | 8 | FAQPage | /opengraph-image | 1 |
| `/compare/prompt-kit` | HextaUI vs prompt-kit: pieces or finished screens | 157 | self | 8 | FAQPage | /opengraph-image | 1 |
| `/compare/shadcn-ai-chat-templates` | shadcn AI chat templates: 7 options compared | 144 | self | 8 | site graph only | /opengraph-image | 1 |
| `/compare/shadcn-ui` | HextaUI vs shadcn/ui: what HextaUI adds on top | 155 | self | 8 | site graph only | /opengraph-image | 1 |
| `/components` | React UI components for shadcn/ui | 143 | self | 8 | site graph only | /opengraph-image | 1 |
| `/contact` | Contact | 87 | self | none | site graph only | /opengraph-image | 1 |
| `/docs` | React components for shadcn/ui, built on Base UI | 138 | self | 8 | site graph only | /opengraph-image | 1 |
| `/docs/accordion` | Accordion component for React & shadcn/ui | 131 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/alert` | Alert component for React & shadcn/ui | 118 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/alert-dialog` | Alert Dialog component for React & shadcn/ui | 123 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/api` | API | 144 | self | none | site graph only | /opengraph-image | 2 |
| `/docs/aspect-ratio` | Aspect Ratio component for React & shadcn/ui | 119 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/attachment` | File Attachment component for React & shadcn/ui | 122 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/avatar` | Avatar component for React & shadcn/ui | 99 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/badge` | Badge component for React & shadcn/ui | 106 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/breadcrumb` | Breadcrumb component for React & shadcn/ui | 129 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/bubble` | Chat Bubble component for React & shadcn/ui | 96 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/button` | Button component for React & shadcn/ui | 124 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/button-group` | Button Group component for React & shadcn/ui | 105 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/calendar` | Calendar component for React & shadcn/ui | 111 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/card` | Card component for React & shadcn/ui | 111 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/carousel` | Carousel component for React & shadcn/ui | 138 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/chart` | Chart components for React & shadcn/ui with Recharts | 141 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/checkbox` | Checkbox component for React & shadcn/ui | 100 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/collapsible` | Collapsible component for React & shadcn/ui | 100 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/combobox` | Combobox & Multi-Select for React & shadcn/ui | 94 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/command` | Command Palette component for React & shadcn/ui | 103 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/context-menu` | Context Menu component for React & shadcn/ui | 116 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/data-table` | Data Table for React & shadcn/ui with TanStack Table | 107 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/date-picker` | Date Picker & Date Range Picker for React & shadcn/ui | 102 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/dialog` | Dialog component for React & shadcn/ui | 133 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/drawer` | Drawer component for React & shadcn/ui | 127 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/dropdown-menu` | Dropdown Menu component for React & shadcn/ui | 110 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/empty` | Empty State component for React & shadcn/ui | 96 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/field` | Form Field component for React & shadcn/ui | 101 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/hairline` | Hairline: one-device-pixel borders for Tailwind CSS | 108 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/hotkey` | Hotkey: parse and match keyboard shortcuts in React | 104 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/hover-card` | Hover Card component for React & shadcn/ui | 101 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/input` | Input component for React & shadcn/ui | 133 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/input-group` | Input Group component for React & shadcn/ui | 98 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/input-otp` | OTP Input component for React & shadcn/ui | 137 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/installation` | Install HextaUI with the shadcn CLI | 81 | self | 8 | site graph only | /opengraph-image | 1 |
| `/docs/item` | Item component for React & shadcn/ui | 136 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/kbd` | Kbd: keyboard shortcut keys for React & shadcn/ui | 127 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/label` | Label component for React & shadcn/ui | 108 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/marker` | Chat Date Divider & Event Marker for React & shadcn/ui | 127 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/mcp` | MCP server for Claude Code, Cursor and VS Code | 143 | self | 8 | site graph only | /opengraph-image | 1 |
| `/docs/menubar` | Menubar component for React & shadcn/ui | 121 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/message` | AI Chat Message component for React & shadcn/ui | 111 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/message-scroller` | Chat Scroll Area that sticks to the bottom for React | 130 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/motion` | Motion: easing, durations and reduced motion for React | 135 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/native-select` | Native Select component for React & shadcn/ui | 123 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/navigation-menu` | Navigation Menu component for React & shadcn/ui | 111 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/number-flow` | Animated Number (Number Flow) for React & shadcn/ui | 85 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/pagination` | Pagination component for React & shadcn/ui | 117 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/popover` | Popover component for React & shadcn/ui | 114 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/progress` | Progress component for React & shadcn/ui | 110 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/questionnaire` | Multi-Step Form (Questionnaire) for React & shadcn/ui | 126 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/radio-group` | Radio Group component for React & shadcn/ui | 124 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/resizable` | Resizable component for React & shadcn/ui | 136 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/scroll-area` | Scroll Area component for React & shadcn/ui | 144 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/scroll-fade` | Scroll Fade: CSS-only scroll edge fades for Tailwind | 107 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/select` | Select component for React & shadcn/ui | 110 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/separator` | Separator component for React & shadcn/ui | 129 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/sheet` | Sheet component for React & shadcn/ui | 93 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/shimmer` | Shimmer: loading text effect for Tailwind CSS | 122 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/sidebar` | Sidebar component for React & shadcn/ui | 126 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/skeleton` | Skeleton component for React & shadcn/ui | 130 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/slider` | Slider component for React & shadcn/ui | 125 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/spinner` | Spinner component for React & shadcn/ui | 128 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/switch` | Switch component for React & shadcn/ui | 131 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/table` | Table component for React & shadcn/ui | 116 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/tabs` | Tabs component for React & shadcn/ui | 151 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/textarea` | Textarea component for React & shadcn/ui | 150 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/toast` | Toast Notifications for React & shadcn/ui | 119 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/toggle` | Toggle component for React & shadcn/ui | 137 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/toggle-group` | Toggle Group component for React & shadcn/ui | 128 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/tooltip` | Tooltip component for React & shadcn/ui | 129 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/tree` | Tree View component for React & shadcn/ui | 146 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-autosize` | useAutosize: auto-resizing textarea hook for React | 130 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 1 |
| `/docs/use-button-feedback` | useButtonFeedback: async button states hook for React | 135 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-composed-ref` | useComposedRef: keep and forward a ref in React | 95 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-delayed-loading` | useDelayedLoading: flicker-free loading hook for React | 107 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-held-keys` | useHeldKeys: track pressed keys in React | 112 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-invalid-shake` | useInvalidShake: shake invalid form fields in React | 102 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-merged-ref` | useMergedRef: merge refs in React 19 | 101 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-pagination` | usePagination: page range hook with ellipses for React | 121 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/use-today` | useToday: a React date hook that rolls over at midnight | 99 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/docs/video-player` | Video Player component for React & shadcn/ui | 127 | self | 8 | BreadcrumbList, TechArticle | /opengraph-image | 2 |
| `/legal/license` | Pro License | 80 | self | none | site graph only | /opengraph-image | 1 |
| `/legal/privacy` | Privacy Policy | 75 | self | none | site graph only | /opengraph-image | 1 |
| `/legal/refunds` | Refund Policy | 74 | self | none | site graph only | /opengraph-image | 1 |
| `/legal/terms` | Terms of Service | 68 | self | none | site graph only | /opengraph-image | 1 |
| `/pricing` | Pricing | 136 | self | none | Product, FAQPage | /opengraph-image | 1 |
| `/sponsor` | Sponsor | 112 | self | none | site graph only | /opengraph-image | 1 |
