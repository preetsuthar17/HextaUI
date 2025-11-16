// Edge-safe metadata-only file for OG image generation
// No React components imported here

export type ComponentMetadata = {
  id: string;
  title: string;
  description?: string;
};

const componentsList: ComponentMetadata[] = [
  {
    id: "accordion",
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description:
      "A modal dialog that appears in front of current content to display messages, ask for confirmations, or make critical adjustments to the user interface.",
  },
  {
    id: "alert",
    title: "Alert",
    description:
      "A simple message displayed to notify the user about a status or action.",
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    description:
      "A component that maintains a fixed aspect ratio for its children.",
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "A visual representation of a user or object.",
  },
  {
    id: "badge",
    title: "Badge",
    description: "A small count or label for UI elements.",
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    description:
      "A navigation aid that indicates the page's location within the site hierarchy.",
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "A group of related buttons displayed together.",
  },
  {
    id: "button",
    title: "Button",
    description: "A clickable element used to trigger an action.",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "A component to display dates and pick days.",
  },
  {
    id: "date-picker",
    title: "Date Picker",
    description: "A component for selecting a date from a calendar popup.",
  },
  {
    id: "card",
    title: "Card",
    description: "A container with header, content, and footer sections.",
  },
  {
    id: "carousel",
    title: "Carousel",
    description: "A rotating set of images or content blocks.",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description:
      "A control that allows the user to select one or more options.",
  },
  {
    id: "collapsible",
    title: "Collapsible",
    description: "A panel that can expand or collapse to show or hide content.",
  },
  {
    id: "context-menu",
    title: "Context Menu",
    description:
      "A menu that appears on user interaction, such as right-click.",
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "A modal dialog for short-term interactions or forms.",
  },
  {
    id: "dropdown-menu",
    title: "Dropdown Menu",
    description: "A menu that displays a list of actions or options.",
  },
  {
    id: "empty",
    title: "Empty",
    description: "A placeholder for empty states or when no data is available.",
  },
  { id: "input", title: "Input", description: "A basic text input field." },
  {
    id: "input-group",
    title: "Input Group",
    description: "Groups related input fields and add-ons together.",
  },
  {
    id: "input-otp",
    title: "Input OTP",
    description: "A group of inputs for entering a one-time password code.",
  },
  {
    id: "kbd",
    title: "Kbd",
    description: "Displays keyboard keys or shortcuts.",
  },
  { id: "label", title: "Label", description: "Text label for form elements." },
  {
    id: "native-select",
    title: "Native Select",
    description: "A native HTML select dropdown.",
  },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    description:
      "A collection of links for navigating websites with dropdown menus.",
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "A control for navigating between pages of content.",
  },
  {
    id: "progress",
    title: "Progress",
    description: "Displays a progress bar to indicate completion status.",
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description: "A set of radio buttons for selecting a single option.",
  },
  {
    id: "resizable",
    title: "Resizable",
    description: "A container or element that can be resized by the user.",
  },
  {
    id: "scroll-area",
    title: "Scroll Area",
    description: "A scrollable region for overflow content.",
  },
  {
    id: "sidebar",
    title: "Sidebar",
    description:
      "A collapsible sidebar component for navigation with mobile support.",
  },
  {
    id: "select",
    title: "Select",
    description:
      "An enhanced select element for choosing one option from a list.",
  },
  {
    id: "separator",
    title: "Separator",
    description: "A visual divider for separating content.",
  },
  {
    id: "sheet",
    title: "Sheet",
    description: "A panel that slides in from the edge of the screen.",
  },
  {
    id: "skeleton",
    title: "Skeleton",
    description: "A placeholder loading indicator mimicking content layout.",
  },
  {
    id: "slider",
    title: "Slider",
    description: "A control for selecting a value or range along a track.",
  },
  {
    id: "sonner",
    title: "Sonner",
    description:
      "A toast notification component for displaying brief messages.",
  },
  {
    id: "spinner",
    title: "Spinner",
    description: "A loading indicator to show ongoing activity.",
  },
  {
    id: "switch",
    title: "Switch",
    description: "A toggle switch for turning a setting on or off.",
  },
  {
    id: "table",
    title: "Table",
    description: "Displays data in a grid of rows and columns.",
  },
  {
    id: "tabs",
    title: "Tabs",
    description:
      "A set of buttons that switches between different content views.",
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "A multi-line text input.",
  },
  {
    id: "toggle",
    title: "Toggle",
    description: "A toggle button that can be active or inactive.",
  },
  {
    id: "toggle-group",
    title: "Toggle Group",
    description: "A group of toggle buttons.",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "A popup showing additional information on hover or focus.",
  },
  {
    id: "command-menu",
    title: "Command Menu",
    description:
      "A fast, keyboard-driven menu for executing commands or navigating.",
  },
  {
    id: "tree",
    title: "Tree",
    description: "A flexible tree view with collapsible nodes and selection.",
  },
  {
    id: "video-player",
    title: "Video Player",
    description:
      "A modern, accessible video player with full controls and shortcuts.",
  },
];

export function getComponentMetadata(
  id: string
): ComponentMetadata | undefined {
  return componentsList.find((c) => c.id === id);
}
