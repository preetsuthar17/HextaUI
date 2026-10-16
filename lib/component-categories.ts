import { docsComponents, type DocsCategory } from "@/lib/docs"

type ComponentCategory = {
  slug: DocsCategory
  name: string
  title: string
  description: string
  intro: string[]
}

const minimumComponents = 3

const categoryCopy: ComponentCategory[] = [
  {
    slug: "forms",
    name: "Form components",
    title: "Form components for React & shadcn/ui",
    description:
      "Free React form components for shadcn/ui on Base UI: inputs, selects, comboboxes, date pickers, OTP fields and validation that shakes, counts and explains.",
    intro: [
      "Every control a form needs, from a plain text input to a searchable multi-select, a date range picker and a one-time code field. They share one field system for labels, descriptions and errors, so validation reads the same everywhere.",
      "Inputs stay at 16 pixels on touch screens so iOS never zooms, invalid fields can shake to draw the eye, and every control works with the keyboard alone.",
    ],
  },
  {
    slug: "overlays",
    name: "Overlay components",
    title: "Dialog, menu & overlay components for React & shadcn/ui",
    description:
      "Free React dialogs, sheets, drawers, popovers, menus, tooltips and a command palette for shadcn/ui, with focus handled and motion you can interrupt.",
    intro: [
      "Everything that floats above the page: dialogs and confirmations, side sheets and swipeable drawers, popovers, hover cards, tooltips, dropdown and context menus, a menubar and a ⌘K command palette.",
      "Focus moves in when they open and returns when they close, they stay on screen down to 320 pixels wide, and dialogs turn into swipeable bottom sheets on phones.",
    ],
  },
  {
    slug: "data-display",
    name: "Data display components",
    title: "Data display components for React & shadcn/ui",
    description:
      "Free React tables, data tables, charts, trees, cards, badges, avatars and animated numbers for shadcn/ui, built on Base UI and Tailwind CSS.",
    intro: [
      "Components for showing information: a data table with sorting, selection and pinned columns, Recharts charts that follow the theme, a tree view, cards, list items, badges, avatars, keyboard keys and numbers that roll to their new value.",
      "They handle the dense cases too, with sticky table headers, pinned columns and keyboard navigation through chart points.",
    ],
  },
  {
    slug: "layout",
    name: "Layout components",
    title: "Layout components for React & shadcn/ui",
    description:
      "Free React accordions, collapsibles, carousels, resizable panels, scroll areas and aspect ratio boxes for shadcn/ui, with height motion you can reverse.",
    intro: [
      "Components that arrange and reveal content: accordions and collapsibles with height motion you can reverse mid-way, a scroll-snap carousel, resizable split panels, scroll areas with edge fades, aspect ratio boxes and separators.",
      "Closed panels stay searchable with the browser’s find, and nothing jumps when content loads in.",
    ],
  },
  {
    slug: "feedback",
    name: "Feedback components",
    title: "Feedback & loading components for React & shadcn/ui",
    description:
      "Free React toasts, alerts, progress bars, spinners, skeletons and empty states for shadcn/ui, with loading that waits before it shows and announces changes.",
    intro: [
      "Components that tell people what is happening: toasts, inline alerts, progress bars and circles, spinners, skeletons and empty states.",
      "Spinners wait before they appear and then stay long enough to read, so fast work never flickers, and every change is announced to screen readers.",
    ],
  },
  {
    slug: "chat",
    name: "Chat UI components",
    title: "Chat UI components for React & shadcn/ui",
    description:
      "Free React chat UI components for shadcn/ui: messages, bubbles, a message scroller that follows streaming replies, attachments and date markers.",
    intro: [
      "The pieces of a chat or AI assistant interface: messages with avatars and actions, chat bubbles with grouped corners and reactions, a scroller that follows new messages but keeps your place while you read back, file and image attachments, and date and event markers.",
      "They are the free foundation of the HextaUI Pro AI blocks, which add the composer, streaming, tool calls and the rest of the conversation.",
    ],
  },
  {
    slug: "navigation",
    name: "Navigation components",
    title: "Navigation components for React & shadcn/ui",
    description:
      "Free React sidebars, tabs, breadcrumbs, pagination and navigation menus for shadcn/ui on Base UI, with keyboard support and right-to-left layouts.",
    intro: [
      "Components that move people around an app: a collapsible app sidebar, tabs, breadcrumbs that wrap and expand in place, pagination and a navigation menu with dropdowns.",
      "They mirror for right-to-left languages, and the sidebar becomes a swipeable sheet on phones.",
    ],
  },
  {
    slug: "actions",
    name: "Button and action components",
    title: "Button & toggle components for React & shadcn/ui",
    description:
      "Free React buttons, button groups, toggles and toggle groups for shadcn/ui, with loading, success and error states built into the button.",
    intro: [
      "Components people press: buttons in every variant and size, joined button groups, toggles and toggle groups.",
      "The button runs its own loading, success and error flow from the promise you return, skips the spinner for fast requests and keeps focus while it works.",
    ],
  },
]

const componentCategories = categoryCopy.filter(
  (category) =>
    docsComponents.filter((component) => component.category === category.slug)
      .length >= minimumComponents
)

function getComponentCategory(slug: string) {
  return componentCategories.find((category) => category.slug === slug)
}

function getCategoryComponents(slug: string) {
  return docsComponents.filter((component) => component.category === slug)
}

function getComponentCategoryHref(slug: string) {
  return `/components/${slug}`
}

export {
  componentCategories,
  getCategoryComponents,
  getComponentCategory,
  getComponentCategoryHref,
  type ComponentCategory,
}
