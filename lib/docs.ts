import type { Metadata } from "next"

import { ogImagePath, pageMetadata } from "@/lib/metadata"

type DocsNavItem = {
  title: string
  href: string
}

type DocsNavSection = {
  title: string
  items: DocsNavItem[]
}

type DocsTocItem = {
  id: string
  title: string
  depth?: 2 | 3
}

const docsCategories = [
  "actions",
  "forms",
  "overlays",
  "navigation",
  "feedback",
  "data-display",
  "layout",
  "chat",
  "media",
] as const

type DocsCategory = (typeof docsCategories)[number]

type DocsComponent = {
  name: string
  slug: string
  description: string
  category?: DocsCategory
}

const docsComponents: DocsComponent[] = [
  {
    name: "Accordion",
    slug: "accordion",
    description:
      "Stacked headings that each reveal a panel, with height motion you can reverse mid-way and panels that stay searchable while closed.",
    category: "layout",
  },
  {
    name: "Alert",
    slug: "alert",
    description:
      "Inline messages for status and feedback, with a neutral surface, a colored icon and a dismiss that collapses smoothly.",
    category: "feedback",
  },
  {
    name: "Alert dialog",
    slug: "alert-dialog",
    description:
      "A confirmation dialog for destructive or important actions that waits for async work, and becomes a bottom sheet on phones.",
    category: "overlays",
  },
  {
    name: "Aspect ratio",
    slug: "aspect-ratio",
    description:
      "A box that holds its shape before media loads, shimmers while loading, fades the media in and falls back when it fails.",
    category: "layout",
  },
  {
    name: "Attachment",
    slug: "attachment",
    description:
      "File and image cards for uploads, with progress, states, actions, a full-card trigger and names that keep their extension.",
    category: "chat",
  },
  {
    name: "Avatar",
    slug: "avatar",
    description:
      "User photos with an initials fallback, status badges and stacked groups that collapse into a count.",
    category: "data-display",
  },
  {
    name: "Badge",
    slug: "badge",
    description:
      "Status labels with colored dots, removable tags that slide closed and counts that roll to their new value.",
    category: "data-display",
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description:
      "A trail of links to the current page that wraps safely, mirrors in right-to-left layouts and expands collapsed segments in place.",
    category: "navigation",
  },
  {
    name: "Bubble",
    slug: "bubble",
    description:
      "Chat message bubbles with variants, grouped corners, reactions and room for interactive content.",
    category: "chat",
  },
  {
    name: "Button",
    slug: "button",
    description:
      "Buttons in every variant and size, with a built-in loading, success and error flow that skips the spinner for fast requests.",
    category: "actions",
  },
  {
    name: "Button group",
    slug: "button-group",
    description:
      "Buttons joined into one control, with shared seams, separators, text addons, nesting and vertical stacks.",
    category: "actions",
  },
  {
    name: "Calendar",
    slug: "calendar",
    description:
      "A date grid for single, range and multiple selection, with sliding months, range previews and touch-sized days.",
    category: "forms",
  },
  {
    name: "Card",
    slug: "card",
    description:
      "A surface for grouping content, with three variants, edge-to-edge media, concentric radii and whole-card links.",
    category: "data-display",
  },
  {
    name: "Carousel",
    slug: "carousel",
    description:
      "Native scroll-snap slides with momentum on touch, mouse dragging, arrow keys, dots, thumbnails and an autoplay that pauses when it should.",
    category: "layout",
  },
  {
    name: "Chart",
    slug: "chart",
    description:
      "Recharts charts with themed colors, a tooltip and legend that read labels from one config, and keyboard navigation with a visible focus ring.",
    category: "data-display",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description:
      "A checkbox whose check draws in, with indeterminate parents, groups and labels that share its hover.",
    category: "forms",
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    description:
      "A panel that shows and hides with height motion you can reverse mid-way, without jumping the layout.",
    category: "layout",
  },
  {
    name: "Combobox",
    slug: "combobox",
    description:
      "A filterable select with chips, groups and async results, in a popup that resizes as you type.",
    category: "forms",
  },
  {
    name: "Command",
    slug: "command",
    description:
      "A searchable list of actions, inline or as a ⌘K palette, with pages, shortcuts and highlighted matches.",
    category: "overlays",
  },
  {
    name: "Context menu",
    slug: "context-menu",
    description:
      "A menu of actions on right click or long press, with submenus, checkbox and radio items, and hold feedback on touch.",
    category: "overlays",
  },
  {
    name: "Data table",
    slug: "data-table",
    description:
      "A table for real data, with sorting, search, row selection, pinned columns, a sticky header and pagination.",
    category: "data-display",
  },
  {
    name: "Date picker",
    slug: "date-picker",
    description:
      "A button that opens a calendar in a popover, or a bottom sheet on phones, for single dates and ranges.",
    category: "forms",
  },
  {
    name: "Dialog",
    slug: "dialog",
    description:
      "A window over the page for forms and focused tasks, with a pinned header and footer, nesting, and a swipeable bottom sheet on phones.",
    category: "overlays",
  },
  {
    name: "Drawer",
    slug: "drawer",
    description:
      "A panel that slides in from any edge and follows your finger, with snap points, a working handle and nested drawers that stack.",
    category: "overlays",
  },
  {
    name: "Dropdown menu",
    slug: "dropdown-menu",
    description:
      "A menu of actions and options behind a button, with groups, submenus, checkbox and radio items, and shortcuts.",
    category: "overlays",
  },
  {
    name: "Empty",
    slug: "empty",
    description:
      "A placeholder for screens with nothing to show yet, with an icon, a message and the next action.",
    category: "feedback",
  },
  {
    name: "Field",
    slug: "field",
    description:
      "Labels, descriptions and errors wired to their control, with validation states and layouts for forms.",
    category: "forms",
  },
  {
    name: "Hover card",
    slug: "hover-card",
    description:
      "A preview card that opens when a link is hovered or focused, for content sighted users can glance at.",
    category: "overlays",
  },
  {
    name: "Input",
    slug: "input",
    description:
      "A text input with three sizes, invalid and read-only states, native validation styling and a 16px touch font so phones never zoom in.",
    category: "forms",
  },
  {
    name: "Input group",
    slug: "input-group",
    description:
      "An input with icons, text, buttons or a keyboard hint attached, sharing one border and focus ring.",
    category: "forms",
  },
  {
    name: "Input OTP",
    slug: "input-otp",
    description:
      "One-time code slots that take typing, paste and SMS autofill, with an opt-in animation that cascades codes in and a status for verifying.",
    category: "forms",
  },
  {
    name: "Item",
    slug: "item",
    description:
      "A row of media, text and actions for lists, settings and pickers, with a grouped surface and a hover highlight that glides between rows.",
    category: "data-display",
  },
  {
    name: "Kbd",
    slug: "kbd",
    description:
      "Key caps for shortcuts that show the right symbols on every platform, read them out properly and press down with the real keys.",
    category: "data-display",
  },
  {
    name: "Label",
    slug: "label",
    description:
      "A label that follows its control, dimming when it's disabled and marking it required or optional on its own.",
    category: "forms",
  },
  {
    name: "Marker",
    slug: "marker",
    description:
      "Quiet notes between content, like date dividers and system events, with sticky dates and times that read as Today or Yesterday.",
    category: "chat",
  },
  {
    name: "Menubar",
    slug: "menubar",
    description:
      "A desktop-style bar of menus with one highlight that slides between open menus and instant switching as you sweep across.",
    category: "overlays",
  },
  {
    name: "Message",
    slug: "message",
    description:
      "A chat message row with an avatar, name, bubbles and status, where new messages rise in from the sender's side.",
    category: "chat",
  },
  {
    name: "Message scroller",
    slug: "message-scroller",
    description:
      "A chat scroll area that follows new messages, keeps your place while you read back, and counts what you missed on the jump button.",
    category: "chat",
  },
  {
    name: "Native select",
    slug: "native-select",
    description:
      "The browser's own select, styled to match Input, with a quiet placeholder, Field support and the OS picker on every device.",
    category: "forms",
  },
  {
    name: "Navigation menu",
    slug: "navigation-menu",
    description:
      "Site navigation with dropdowns, or one full-width panel that stays open while its content slides between menus.",
    category: "navigation",
  },
  {
    name: "Number flow",
    slug: "number-flow",
    description:
      "Animated numbers where only the changed digits spin, with any Intl format and locale.",
    category: "data-display",
  },
  {
    name: "Pagination",
    slug: "pagination",
    description:
      "Page navigation that keeps every button in place, glides to the current page and jumps to any page from the ellipsis.",
    category: "navigation",
  },
  {
    name: "Popover",
    slug: "popover",
    description:
      "A floating panel anchored to a trigger that resizes smoothly with its content and follows the trigger’s direction.",
    category: "overlays",
  },
  {
    name: "Progress",
    slug: "progress",
    description:
      "A bar or ring that shows how far a task has come, eases between updates and slides while the total is unknown.",
    category: "feedback",
  },
  {
    name: "Questionnaire",
    slug: "questionnaire",
    description:
      "A step-by-step form that moves between questions with a sense of direction, shows real progress and answers from the keyboard.",
    category: "forms",
  },
  {
    name: "Radio group",
    slug: "radio-group",
    description:
      "Pick one option from a set, with a dot that hands off between choices and cards whose selection ring slides to the new pick.",
    category: "forms",
  },
  {
    name: "Resizable",
    slug: "resizable",
    description:
      "Panels you can drag apart, with a quiet divider that wakes up on hover, sizes that glide on reset or collapse, and layouts that persist.",
    category: "layout",
  },
  {
    name: "Scroll area",
    slug: "scroll-area",
    description:
      "Native scrolling with a minimal scrollbar, edges that fade only where there’s more to see, and an optional peek that cuts the last item in half.",
    category: "layout",
  },
  {
    name: "Select",
    slug: "select",
    description:
      "Pick one or more options from a list that opens on the current value, with typeahead, groups and form support.",
    category: "forms",
  },
  {
    name: "Separator",
    slug: "separator",
    description:
      "A hairline that divides content horizontally or vertically, with an optional label and a decorative mode for purely visual lines.",
    category: "layout",
  },
  {
    name: "Sheet",
    slug: "sheet",
    description:
      "A panel that slides in from any edge, with swipe-to-dismiss, scroll lock and stacked nesting.",
    category: "overlays",
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    description:
      "An app sidebar that collapses to icons or off canvas, stays pinned under your header, and becomes a swipeable sheet on phones.",
    category: "navigation",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description:
      "Placeholders that wait 150ms before showing, take the exact size of the content they wrap, and fade it in without moving anything.",
    category: "feedback",
  },
  {
    name: "Slider",
    slug: "slider",
    description:
      "Pick a value or a range by dragging, tapping the track or using the keys, with jumps that glide and an optional value bubble.",
    category: "forms",
  },
  {
    name: "Spinner",
    slug: "spinner",
    description:
      "A loading indicator with Apple-style ticks or a breathing ring that can wait before showing and stay long enough not to flicker.",
    category: "feedback",
  },
  {
    name: "Switch",
    slug: "switch",
    description:
      "An on/off toggle you can tap, press or drag, with a thumb that stretches under your finger and an optional pending state for saves.",
    category: "forms",
  },
  {
    name: "Table",
    slug: "table",
    description:
      "A responsive table with a surface style, wrapping or compact cells, sticky headers, pinned columns and scroll hints.",
    category: "data-display",
  },
  {
    name: "Tabs",
    slug: "tabs",
    description:
      "Switch between views with an indicator that slides to the active tab, as a segmented control or an underline, and lists that scroll when they overflow.",
    category: "navigation",
  },
  {
    name: "Textarea",
    slug: "textarea",
    description:
      "Multi-line text that grows smoothly with what you write between a minimum and maximum number of rows, with counters, validation and a submit shortcut.",
    category: "forms",
  },
  {
    name: "Toast",
    slug: "toast",
    description:
      "Brief messages that stack neatly, expand on hover, swipe away, and turn a loading state into success or error in place.",
    category: "feedback",
  },
  {
    name: "Toggle",
    slug: "toggle",
    description:
      "A button that stays on or off, with a fill that settles in when pressed, a clear hover-to-on step and icons that can fill with the state.",
    category: "actions",
  },
  {
    name: "Toggle group",
    slug: "toggle-group",
    description:
      "A row of toggles for one choice or many, with a fill that slides to the picked item, joined or spaced items and arrow-key focus.",
    category: "actions",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description:
      "A short hint on hover or keyboard focus that opens after a brief rest, switches instantly between neighbours and shows shortcuts.",
    category: "overlays",
  },
  {
    name: "Tree",
    slug: "tree",
    description:
      "Nested, expandable rows for files and hierarchies, with indent guides, connector lines, cascading checkboxes, typeahead and full keyboard support.",
    category: "data-display",
  },
  {
    name: "Video player",
    slug: "video-player",
    description:
      "A video player with a scrubbable seek bar, auto-hiding controls, keyboard shortcuts, speed, picture in picture and full screen.",
    category: "media",
  },
]

const docsHooks: DocsComponent[] = [
  {
    name: "useAutosize",
    slug: "use-autosize",
    description:
      "Grows a textarea with what you write between its minimum and maximum height, animating each change without ever touching the text.",
  },
  {
    name: "useButtonFeedback",
    slug: "use-button-feedback",
    description:
      "Runs an async action through loading, success and error, skipping the spinner for fast requests and holding an error while you read it.",
  },
  {
    name: "useComposedRef",
    slug: "use-composed-ref",
    description:
      "Keeps a ref to your own element while still forwarding it to whatever ref the parent passed in.",
  },
  {
    name: "useDelayedLoading",
    slug: "use-delayed-loading",
    description:
      "Shows a loading state only when work is actually slow, then keeps it up long enough that it never flickers.",
  },
  {
    name: "useHeldKeys",
    slug: "use-held-keys",
    description:
      "The keys someone is holding down right now, shared by every subscriber through a single set of window listeners.",
  },
  {
    name: "useInvalidShake",
    slug: "use-invalid-shake",
    description:
      "Shakes a form control when a submit attempt finds it invalid, and never while someone is still typing.",
  },
  {
    name: "useMergedRef",
    slug: "use-merged-ref",
    description:
      "Combines any number of callback and object refs into one, with React 19 ref cleanup for each of them.",
  },
  {
    name: "usePagination",
    slug: "use-pagination",
    description:
      "Turns a page and a page count into the list of pages and ellipses to render, keeping its length steady as the page moves.",
  },
  {
    name: "useToday",
    slug: "use-today",
    description:
      "Today's date that rolls over at midnight and when the tab comes back, without a hydration mismatch.",
  },
]

const docsUtilities: DocsComponent[] = [
  {
    name: "Hairline",
    slug: "hairline",
    description:
      "Borders and rings exactly one device pixel wide on every screen, through one variable the whole theme reads.",
  },
  {
    name: "Hotkey",
    slug: "hotkey",
    description:
      "Parse, label, announce and match keyboard shortcuts, with ⌘ on Apple platforms and Ctrl everywhere else.",
  },
  {
    name: "Motion",
    slug: "motion",
    description:
      "The easing curves, durations and reduced-motion check every component animates with, plus hooks for size morphs and sliding highlights.",
  },
  {
    name: "Scroll fade",
    slug: "scroll-fade",
    description:
      "Edges of a scroll area that fade only when there's more to see, driven by the scroll position in CSS alone.",
  },
  {
    name: "Shimmer",
    slug: "shimmer",
    description:
      "A band of light that sweeps across text for in-progress states, tinted from the text color and still under reduced motion.",
  },
]

type DocsGuide = {
  slug: string
  title: string
  description: string
}

const docsGuides: DocsGuide[] = [
  {
    slug: "",
    title: "Introduction",
    description:
      "What HextaUI is, what it is built on and the principles behind it.",
  },
  {
    slug: "installation",
    title: "Installation",
    description:
      "Add HextaUI with the shadcn CLI or by hand, register the @hextaui namespace, the theme tokens, and setup for AI assistants.",
  },
  {
    slug: "mcp",
    title: "MCP server",
    description:
      "Connect Claude Code, Cursor, VS Code and other AI assistants to HextaUI, so they search the docs, read each API and install components for you.",
  },
  {
    slug: "api",
    title: "API",
    description:
      "The HextaUI HTTP API and OpenAPI spec: registry and docs endpoints, authentication with sessions and API tokens, Pro blocks and error responses.",
  },
]

const docsKeywords: Record<string, string[]> = {
  accordion: ["disclosure", "expand", "faq", "collapse"],
  alert: ["callout", "banner", "notice", "message"],
  "alert-dialog": ["confirm", "confirmation", "destructive", "modal"],
  "aspect-ratio": ["image", "media", "ratio", "embed"],
  attachment: ["file", "upload", "image", "preview"],
  avatar: ["profile", "user", "picture", "initials"],
  badge: ["tag", "chip", "pill", "label", "status"],
  breadcrumb: ["path", "trail", "navigation"],
  bubble: ["chat", "message", "speech"],
  button: ["action", "cta", "submit", "link"],
  "button-group": ["segmented", "split button", "toolbar"],
  calendar: ["date", "month", "day", "schedule"],
  card: ["panel", "container", "surface", "tile"],
  carousel: ["slider", "gallery", "slideshow", "swipe"],
  chart: ["graph", "plot", "visualization", "recharts", "analytics"],
  checkbox: ["check", "tick", "boolean", "indeterminate"],
  collapsible: ["disclosure", "expand", "show more", "toggle"],
  combobox: ["autocomplete", "typeahead", "searchable select", "multi select"],
  command: ["palette", "cmdk", "spotlight", "search", "launcher"],
  "context-menu": ["right click", "menu", "actions"],
  "data-table": ["grid", "sort", "filter", "tanstack", "rows"],
  "date-picker": ["date", "calendar", "range", "datepicker"],
  dialog: ["modal", "popup", "lightbox", "overlay"],
  drawer: ["bottom sheet", "sheet", "vaul", "swipe"],
  "dropdown-menu": ["menu", "actions", "dropdown", "overflow"],
  empty: ["empty state", "zero state", "blank", "placeholder", "no results"],
  field: ["form", "label", "error", "validation", "helper text"],
  "hover-card": ["preview", "popover", "profile card"],
  input: ["text field", "textbox", "form", "text input"],
  "input-group": ["addon", "prefix", "suffix", "adornment"],
  "input-otp": ["one time password", "pin", "code", "2fa", "verification"],
  item: ["list item", "row", "media object"],
  kbd: ["keyboard", "shortcut", "key", "keycap", "hotkey"],
  label: ["form", "caption"],
  marker: ["highlight", "mark", "annotation"],
  menubar: ["menu", "app menu", "toolbar"],
  message: ["chat", "ai", "conversation", "assistant"],
  "message-scroller": ["chat", "stick to bottom", "auto scroll", "ai"],
  "native-select": ["select", "dropdown", "picker"],
  "navigation-menu": ["nav", "mega menu", "header", "links"],
  "number-flow": ["animated number", "counter", "ticker", "odometer"],
  pagination: ["pages", "pager", "next previous"],
  popover: ["popup", "floating", "overlay", "flyout"],
  progress: ["loading bar", "meter", "percent", "upload"],
  questionnaire: ["survey", "quiz", "form", "onboarding", "steps"],
  "radio-group": ["radio", "option", "choice"],
  resizable: ["split", "panels", "pane", "splitter"],
  "scroll-area": ["scrollbar", "overflow", "scroll"],
  select: ["dropdown", "picker", "options", "listbox"],
  separator: ["divider", "hr", "rule", "line"],
  sheet: ["side panel", "slide over", "drawer", "offcanvas"],
  sidebar: ["navigation", "nav", "layout", "app shell"],
  skeleton: ["placeholder", "loading", "shimmer"],
  slider: ["range", "track", "volume"],
  spinner: ["loader", "loading", "busy", "indicator"],
  switch: ["toggle", "on off", "boolean"],
  table: ["grid", "rows", "columns", "tabular"],
  tabs: ["tab", "segmented", "panels"],
  textarea: ["multiline", "text area", "comment", "message"],
  toast: ["notification", "snackbar", "sonner", "alert"],
  toggle: ["pressed", "toggle button", "switch"],
  "toggle-group": ["segmented control", "radio buttons", "toolbar"],
  tooltip: ["hint", "title", "hover"],
  tree: ["file tree", "explorer", "hierarchy", "nested"],
  "video-player": ["video", "media", "player", "controls"],
  "use-autosize": ["textarea", "auto resize", "grow"],
  "use-button-feedback": ["async", "loading", "success", "error"],
  "use-composed-ref": ["ref", "forward ref"],
  "use-delayed-loading": ["loading", "spinner", "flicker", "delay"],
  "use-held-keys": ["keyboard", "pressed keys", "modifiers"],
  "use-invalid-shake": ["shake", "error", "validation", "form"],
  "use-merged-ref": ["ref", "merge refs", "callback ref"],
  "use-pagination": ["pages", "ellipsis", "pager"],
  "use-today": ["date", "midnight", "now"],
  hairline: ["border", "1px", "device pixel", "retina"],
  hotkey: ["keyboard shortcut", "shortcut", "keybinding", "mod"],
  motion: ["animation", "easing", "duration", "reduced motion", "spring"],
  "scroll-fade": ["mask", "gradient", "fade", "edge"],
  shimmer: ["loading text", "shine", "skeleton"],
  installation: ["install", "setup", "cli", "theme", "getting started"],
  mcp: [
    "model context protocol",
    "ai",
    "assistant",
    "agent",
    "claude",
    "cursor",
    "llm",
  ],
  api: [
    "openapi",
    "swagger",
    "rest",
    "http",
    "endpoints",
    "auth",
    "token",
    "developer",
    "sdk",
  ],
  "": ["introduction", "about", "overview", "getting started"],
}

const docsTitles: Record<string, string> = {
  attachment: "File Attachment component for React & shadcn/ui",
  bubble: "Chat Bubble component for React & shadcn/ui",
  chart: "Chart components for React & shadcn/ui with Recharts",
  combobox: "Combobox & Multi-Select for React & shadcn/ui",
  command: "Command Palette component for React & shadcn/ui",
  "data-table": "Data Table for React & shadcn/ui with TanStack Table",
  "date-picker": "Date Picker & Date Range Picker for React & shadcn/ui",
  empty: "Empty State component for React & shadcn/ui",
  field: "Form Field component for React & shadcn/ui",
  "input-otp": "OTP Input component for React & shadcn/ui",
  kbd: "Kbd: keyboard shortcut keys for React & shadcn/ui",
  marker: "Chat Date Divider & Event Marker for React & shadcn/ui",
  message: "AI Chat Message component for React & shadcn/ui",
  "message-scroller": "Chat Scroll Area that sticks to the bottom for React",
  "number-flow": "Animated Number (Number Flow) for React & shadcn/ui",
  questionnaire: "Multi-Step Form (Questionnaire) for React & shadcn/ui",
  toast: "Toast Notifications for React & shadcn/ui",
  tree: "Tree View component for React & shadcn/ui",
  "use-autosize": "useAutosize: auto-resizing textarea hook for React",
  "use-button-feedback":
    "useButtonFeedback: async button states hook for React",
  "use-composed-ref": "useComposedRef: keep and forward a ref in React",
  "use-delayed-loading":
    "useDelayedLoading: flicker-free loading hook for React",
  "use-held-keys": "useHeldKeys: track pressed keys in React",
  "use-invalid-shake": "useInvalidShake: shake invalid form fields in React",
  "use-merged-ref": "useMergedRef: merge refs in React 19",
  "use-pagination": "usePagination: page range hook with ellipses for React",
  "use-today": "useToday: a React date hook that rolls over at midnight",
  hairline: "Hairline: one-device-pixel borders for Tailwind CSS",
  hotkey: "Hotkey: parse and match keyboard shortcuts in React",
  motion: "Motion: easing, durations and reduced motion for React",
  "scroll-fade": "Scroll Fade: CSS-only scroll edge fades for Tailwind",
  shimmer: "Shimmer: loading text effect for Tailwind CSS",
}

const docsEntries = [...docsComponents, ...docsHooks, ...docsUtilities]

const docsNav: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "MCP server", href: "/docs/mcp" },
      { title: "API", href: "/docs/api" },
    ],
  },
  {
    title: "Components",
    items: docsComponents.map((component) => ({
      title: component.name,
      href: `/docs/${component.slug}`,
    })),
  },
  {
    title: "Hooks",
    items: docsHooks.map((hook) => ({
      title: hook.name,
      href: `/docs/${hook.slug}`,
    })),
  },
  {
    title: "Utilities",
    items: docsUtilities.map((utility) => ({
      title: utility.name,
      href: `/docs/${utility.slug}`,
    })),
  },
]

function getDocsPager(
  href: string,
  items: DocsNavItem[] = docsNav.flatMap((section) => section.items)
) {
  const index = items.findIndex((item) => item.href === href)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return { previous: items[index - 1], next: items[index + 1] }
}

function getDocsComponent(slug: string) {
  const component = docsEntries.find((item) => item.slug === slug)

  if (!component) {
    throw new Error(`Unknown docs component: ${slug}`)
  }

  return component
}

function titleCase(value: string) {
  return value.replace(
    /(^|\s)(\p{Ll})/gu,
    (_, space, letter) => `${space}${letter.toUpperCase()}`
  )
}

function getDocsTitle(slug: string) {
  const component = getDocsComponent(slug)
  return (
    docsTitles[slug] ??
    `${titleCase(component.name)} component for React & shadcn/ui`
  )
}

function getDocsComponentMetadata(slug: string): Metadata {
  const component = getDocsComponent(slug)

  return pageMetadata({
    title: getDocsTitle(slug),
    description: component.description,
    path: `/docs/${component.slug}`,
    markdown: `/docs/${component.slug}.md`,
    image: ogImagePath("docs", component.slug),
    type: "article",
  })
}

function getDocsExampleHref(file: string) {
  const [dir, id] = file.split("/")
  return `/docs/${dir}/examples/${id}`
}

function getDocsSlug(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-")
}

export {
  docsCategories,
  docsComponents,
  docsEntries,
  docsGuides,
  docsHooks,
  docsKeywords,
  docsUtilities,
  docsNav,
  docsTitles,
  getDocsComponent,
  getDocsComponentMetadata,
  getDocsExampleHref,
  getDocsPager,
  getDocsSlug,
  getDocsTitle,
  titleCase,
}
export type {
  DocsCategory,
  DocsComponent,
  DocsGuide,
  DocsNavItem,
  DocsNavSection,
  DocsTocItem,
}
