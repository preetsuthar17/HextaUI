import { AccordionDemo } from "@/components/demo/accordion-demo";
import { AlertDemo } from "@/components/demo/alert-demo";
import { AlertDialogDemo } from "@/components/demo/alert-dialog-demo";
import { AspectRatioDemo } from "@/components/demo/aspect-ratio-demo";
import { AvatarDemo } from "@/components/demo/avatar-demo";
import { BadgeDemo } from "@/components/demo/badge-demo";
import { BreadcrumbDemo } from "@/components/demo/breadcrumb-demo";
import { ButtonDemo } from "@/components/demo/button-demo";
import { ButtonGroupDemo } from "@/components/demo/button-group-demo";
import { CalendarDemo } from "@/components/demo/calendar-demo";
import { CarouselDemo } from "@/components/demo/carousel-demo";
import { CheckboxDemo } from "@/components/demo/checkbox-demo";
import { CollapsibleDemo } from "@/components/demo/collapsible-demo";
import { CommandMenuDemo } from "@/components/demo/command-menu-demo";
import { ContextMenuDemo } from "@/components/demo/context-menu-demo";
import { DatePickerDemo } from "@/components/demo/date-picker-demo";
import { DialogDemo } from "@/components/demo/dialog-demo";
import { DropdownMenuDemo } from "@/components/demo/dropdown-menu-demo";
import { EmptyDemo } from "@/components/demo/empty-demo";
import { InputDemo } from "@/components/demo/input-demo";
import { InputGroupDemo } from "@/components/demo/input-group-demo";
import { InputOTPDemo } from "@/components/demo/input-otp-demo";
import { KbdDemo } from "@/components/demo/kbd-demo";
import { LabelDemo } from "@/components/demo/label-demo";
import { NativeSelectDemo } from "@/components/demo/native-select-demo";
import { PaginationDemo } from "@/components/demo/pagination-demo";
import { ProgressDemo } from "@/components/demo/progress-demo";
import { RadioGroupDemo } from "@/components/demo/radio-group-demo";
import { ResizableDemo } from "@/components/demo/resizable-demo";
import { ScrollAreaDemo } from "@/components/demo/scroll-area-demo";
import { SelectDemo } from "@/components/demo/select-demo";
import { SeparatorDemo } from "@/components/demo/separator-demo";
import { SheetDemo } from "@/components/demo/sheet-demo";
import { SkeletonDemo } from "@/components/demo/skeleton-demo";
import { SliderDemo } from "@/components/demo/slider-demo";
import { SonnerDemo } from "@/components/demo/sonner-demo";
import { SpinnerDemo } from "@/components/demo/spinner-demo";
import { SwitchDemo } from "@/components/demo/switch-demo";
import { TableDemo } from "@/components/demo/table-demo";
import { TabsDemo } from "@/components/demo/tabs-demo";
import { TextareaDemo } from "@/components/demo/textarea-demo";
import { ToggleDemo } from "@/components/demo/toggle-demo";
import { ToggleGroupSpacing } from "@/components/demo/toggle-group-demo";
import { TooltipDemo } from "@/components/demo/tooltip-demo";
import { TreeBasicDemo } from "@/components/demo/tree-demo";
import { VideoPlayerDemo } from "@/components/demo/video-player-demo";
import { componentSnippets } from "@/lib/registry/snippets";

const radixBaseDocs = "https://www.radix-ui.com/primitives/docs/components/";
const radixBaseApi = "https://www.radix-ui.com/docs/primitives/components/";

const docsApiLinks: Record<string, { docs_ref?: string; api_ref?: string }> = {
  accordion: {
    docs_ref: `${radixBaseDocs}accordion`,
    api_ref: `${radixBaseApi}accordion#api-reference`,
  },
  "alert-dialog": {
    docs_ref: `${radixBaseDocs}alert-dialog`,
    api_ref: `${radixBaseApi}alert-dialog#api-reference`,
  },
  alert: {
    docs_ref: `${radixBaseDocs}alert`,
    api_ref: `${radixBaseApi}alert#api-reference`,
  },
  "aspect-ratio": {
    docs_ref: `${radixBaseDocs}aspect-ratio`,
    api_ref: `${radixBaseApi}aspect-ratio#api-reference`,
  },
  avatar: {
    docs_ref: `${radixBaseDocs}avatar`,
    api_ref: `${radixBaseApi}avatar#api-reference`,
  },
  badge: {
    docs_ref: `${radixBaseDocs}badge`,
    api_ref: `${radixBaseApi}badge#api-reference`,
  },
  breadcrumb: {
    docs_ref: `${radixBaseDocs}breadcrumb`,
    api_ref: `${radixBaseApi}breadcrumb#api-reference`,
  },
  "button-group": {
    docs_ref: `${radixBaseDocs}button-group`,
    api_ref: `${radixBaseApi}button-group#api-reference`,
  },
  button: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  calendar: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "date-picker": {
    docs_ref: undefined,
    api_ref: undefined,
  },
  carousel: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  checkbox: {
    docs_ref: `${radixBaseDocs}checkbox`,
    api_ref: `${radixBaseApi}checkbox#api-reference`,
  },
  collapsible: {
    docs_ref: `${radixBaseDocs}collapsible`,
    api_ref: `${radixBaseApi}collapsible#api-reference`,
  },
  "context-menu": {
    docs_ref: `${radixBaseDocs}context-menu`,
    api_ref: `${radixBaseApi}context-menu#api-reference`,
  },
  dialog: {
    docs_ref: `${radixBaseDocs}dialog`,
    api_ref: `${radixBaseApi}dialog#api-reference`,
  },
  "dropdown-menu": {
    docs_ref: `${radixBaseDocs}dropdown-menu`,
    api_ref: `${radixBaseApi}dropdown-menu#api-reference`,
  },
  empty: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  input: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "input-group": {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "input-otp": {
    docs_ref: undefined,
    api_ref: undefined,
  },
  kbd: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  label: {
    docs_ref: `${radixBaseDocs}label`,
    api_ref: `${radixBaseApi}label#api-reference`,
  },
  "native-select": {
    docs_ref: undefined,
    api_ref: undefined,
  },
  pagination: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  progress: {
    docs_ref: `${radixBaseDocs}progress`,
    api_ref: `${radixBaseApi}progress#api-reference`,
  },
  "radio-group": {
    docs_ref: `${radixBaseDocs}radio-group`,
    api_ref: `${radixBaseApi}radio-group#api-reference`,
  },
  resizable: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "scroll-area": {
    docs_ref: `${radixBaseDocs}scroll-area`,
    api_ref: `${radixBaseApi}scroll-area#api-reference`,
  },
  select: {
    docs_ref: `${radixBaseDocs}select`,
    api_ref: `${radixBaseApi}select#api-reference`,
  },
  separator: {
    docs_ref: `${radixBaseDocs}separator`,
    api_ref: `${radixBaseApi}separator#api-reference`,
  },
  sheet: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  skeleton: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  slider: {
    docs_ref: `${radixBaseDocs}slider`,
    api_ref: `${radixBaseApi}slider#api-reference`,
  },
  sonner: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  spinner: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  switch: {
    docs_ref: `${radixBaseDocs}switch`,
    api_ref: `${radixBaseApi}switch#api-reference`,
  },
  table: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  tabs: {
    docs_ref: `${radixBaseDocs}tabs`,
    api_ref: `${radixBaseApi}tabs#api-reference`,
  },
  textarea: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  toggle: {
    docs_ref: `${radixBaseDocs}toggle`,
    api_ref: `${radixBaseApi}toggle#api-reference`,
  },
  "toggle-group": {
    docs_ref: `${radixBaseDocs}toggle-group`,
    api_ref: `${radixBaseApi}toggle-group#api-reference`,
  },
  tooltip: {
    docs_ref: `${radixBaseDocs}tooltip`,
    api_ref: `${radixBaseApi}tooltip#api-reference`,
  },
  "command-menu": {
    docs_ref: undefined,
    api_ref: undefined,
  },
  tree: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "video-player": {
    docs_ref: undefined,
    api_ref: undefined,
  },
};

export type ComponentMeta = {
  id: string;
  title: string;
  description?: string;
  Demo: React.ComponentType;
  api_ref?: string;
  docs_ref?: string;
  demoCode?: string;
  installCode?: string;
  usageImports?: string;
  usageCode?: string;
};

const demoComponents: Record<string, React.ComponentType> = {
  accordion: AccordionDemo,
  "alert-dialog": AlertDialogDemo,
  alert: AlertDemo,
  "aspect-ratio": AspectRatioDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  breadcrumb: BreadcrumbDemo,
  "button-group": ButtonGroupDemo,
  button: ButtonDemo,
  calendar: CalendarDemo,
  "date-picker": DatePickerDemo,
  carousel: CarouselDemo,
  checkbox: CheckboxDemo,
  collapsible: CollapsibleDemo,
  "context-menu": ContextMenuDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  empty: EmptyDemo,
  input: InputDemo,
  "input-group": InputGroupDemo,
  "input-otp": InputOTPDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  "native-select": NativeSelectDemo,
  pagination: PaginationDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  resizable: ResizableDemo,
  "scroll-area": ScrollAreaDemo,
  select: SelectDemo,
  separator: SeparatorDemo,
  sheet: SheetDemo,
  skeleton: SkeletonDemo,
  slider: SliderDemo,
  sonner: SonnerDemo,
  spinner: SpinnerDemo,
  switch: SwitchDemo,
  table: TableDemo,
  tabs: TabsDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupSpacing,
  tooltip: TooltipDemo,
  "command-menu": CommandMenuDemo,
  tree: TreeBasicDemo,
  "video-player": VideoPlayerDemo,
};

const snippets = componentSnippets as Record<
  string,
  Partial<Omit<ComponentMeta, "id" | "title" | "Demo">>
>;

const componentsList: { id: string; title: string; description?: string }[] = [
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
      "A navigation aid that indicates the page’s location within the site hierarchy.",
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

export const componentsRegistry: ComponentMeta[] = componentsList
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(({ id, title, description }) => ({
    id,
    title,
    description,
    Demo: demoComponents[id],
    docs_ref: docsApiLinks[id]?.docs_ref,
    api_ref: docsApiLinks[id]?.api_ref,
    ...(snippets[id] ?? {}),
  }));

export function getComponentMetaById(id: string) {
  return componentsRegistry.find((c) => c.id === id);
}
