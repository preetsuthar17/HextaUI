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
import { FieldDemo } from "@/components/demo/field-demo";
import { InputDemo } from "@/components/demo/input-demo";
import { InputGroupDemo } from "@/components/demo/input-group-demo";
import { InputOTPDemo } from "@/components/demo/input-otp-demo";
import { KbdDemo } from "@/components/demo/kbd-demo";
import { LabelDemo } from "@/components/demo/label-demo";
import { NativeSelectDemo } from "@/components/demo/native-select-demo";
import { NavigationMenuDemo } from "@/components/demo/navigation-menu-demo";
import { PaginationDemo } from "@/components/demo/pagination-demo";
import { ProgressDemo } from "@/components/demo/progress-demo";
import { RadioGroupDemo } from "@/components/demo/radio-group-demo";
import { ResizableDemo } from "@/components/demo/resizable-demo";
import { ScrollAreaDemo } from "@/components/demo/scroll-area-demo";
import { SelectDemo } from "@/components/demo/select-demo";
import { SeparatorDemo } from "@/components/demo/separator-demo";
import { SheetDemo } from "@/components/demo/sheet-demo";
import { SidebarDemo } from "@/components/demo/sidebar-demo";
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
  "navigation-menu": {
    docs_ref: `${radixBaseDocs}navigation-menu`,
    api_ref: `${radixBaseApi}navigation-menu#api-reference`,
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
  field: {
    docs_ref: undefined,
    api_ref: undefined,
  },
  "scroll-area": {
    docs_ref: `${radixBaseDocs}scroll-area`,
    api_ref: `${radixBaseApi}scroll-area#api-reference`,
  },
  sidebar: {
    docs_ref: undefined,
    api_ref: undefined,
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
  "navigation-menu": NavigationMenuDemo,
  pagination: PaginationDemo,
  progress: ProgressDemo,
  "radio-group": RadioGroupDemo,
  resizable: ResizableDemo,
  "scroll-area": ScrollAreaDemo,
  sidebar: SidebarDemo,
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
  field: FieldDemo,
};

const snippets = componentSnippets as Record<
  string,
  Partial<Omit<ComponentMeta, "id" | "title" | "Demo">>
>;

const componentsList: { id: string; title: string; description?: string }[] = [
  {
    id: "accordion",
    title: "Accordion",
    description: "Expands to show or hide content.",
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description: "Modal dialog for important actions or decisions.",
  },
  {
    id: "alert",
    title: "Alert",
    description: "Displays a status or message banner.",
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    description: "Maintains a fixed ratio for child content.",
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Shows an image or initials for a user/object.",
  },
  {
    id: "badge",
    title: "Badge",
    description: "Small badge for counts or indicators.",
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    description: "Displays navigation path as links.",
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "Groups multiple buttons in a row.",
  },
  {
    id: "button",
    title: "Button",
    description: "Clickable button for actions.",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Grid to display days and dates.",
  },
  {
    id: "date-picker",
    title: "Date Picker",
    description: "Field and calendar to pick dates.",
  },
  {
    id: "carousel",
    title: "Carousel",
    description: "Rotates or slides multiple items.",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Box for selecting true or false.",
  },
  {
    id: "collapsible",
    title: "Collapsible",
    description: "Panel that expands and collapses.",
  },
  {
    id: "context-menu",
    title: "Context Menu",
    description: "Menu that appears on right-click or action.",
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "Modal overlay for dialogs and forms.",
  },
  {
    id: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Menu that opens with a trigger control.",
  },
  {
    id: "empty",
    title: "Empty",
    description: "Graphic placeholder for empty states.",
  },
  {
    id: "field",
    title: "Field",
    description: "Field layout with label and help.",
  },
  { id: "input", title: "Input", description: "Single-line text input." },
  {
    id: "input-group",
    title: "Input Group",
    description: "Combines inputs and add-ons in a row.",
  },
  {
    id: "input-otp",
    title: "Input OTP",
    description: "Inputs for one-time code entry.",
  },
  {
    id: "kbd",
    title: "Kbd",
    description: "Renders keyboard key appearance.",
  },
  { id: "label", title: "Label", description: "Label for form input." },
  {
    id: "native-select",
    title: "Native Select",
    description: "Dropdown using the native select element.",
  },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Controls for paging through content.",
  },
  {
    id: "progress",
    title: "Progress",
    description: "Linear progress indicator.",
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description: "Group of choices where only one can be selected.",
  },
  {
    id: "resizable",
    title: "Resizable",
    description: "Container that users can resize.",
  },
  {
    id: "scroll-area",
    title: "Scroll Area",
    description: "Scrollable area for overflowing content.",
  },
  {
    id: "sidebar",
    title: "Sidebar",
    description: "A collapsible sidebar component for navigation.",
  },
  {
    id: "select",
    title: "Select",
    description: "Custom dropdown select input.",
  },
  {
    id: "separator",
    title: "Separator",
    description: "Horizontal or vertical dividing line.",
  },
  {
    id: "sheet",
    title: "Sheet",
    description: "Drawer panel that slides in from edge.",
  },
  {
    id: "skeleton",
    title: "Skeleton",
    description: "Shimmer effect placeholder preview.",
  },
  {
    id: "slider",
    title: "Slider",
    description: "Draggable control for selecting a value.",
  },
  {
    id: "sonner",
    title: "Sonner",
    description: "Displays toast notifications.",
  },
  {
    id: "spinner",
    title: "Spinner",
    description: "Circular activity indicator.",
  },
  {
    id: "switch",
    title: "Switch",
    description: "Toggle to switch between states.",
  },
  {
    id: "table",
    title: "Table",
    description: "Displays data in rows and columns.",
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Switches views using tabbed buttons.",
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "Multi-line text input.",
  },
  {
    id: "toggle",
    title: "Toggle",
    description: "Pressable toggle button.",
  },
  {
    id: "toggle-group",
    title: "Toggle Group",
    description: "Groups multiple toggle buttons.",
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "Shows info on hover or focus.",
  },
  {
    id: "command-menu",
    title: "Command Menu",
    description: "Popup menu for running commands.",
  },
  {
    id: "tree",
    title: "Tree",
    description: "Hierarchical collapsible structure.",
  },
  {
    id: "video-player",
    title: "Video Player",
    description: "Video playback with controls.",
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
