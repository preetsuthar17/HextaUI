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
import { CardDemo } from "@/components/demo/card-demo";
import { CarouselDemo } from "@/components/demo/carousel-demo";
import { CheckboxDemo } from "@/components/demo/checkbox-demo";
import { CollapsibleDemo } from "@/components/demo/collapsible-demo";
import { CommandMenuDemo } from "@/components/demo/command-menu-demo";
import { ContextMenuDemo } from "@/components/demo/context-menu-demo";
import { DatePickerDemo } from "@/components/demo/date-picker-demo";
import { DialogDemo } from "@/components/demo/dialog-demo";
import { DrawerDemo } from "@/components/demo/drawer-demo";
import { DropdownMenuDemo } from "@/components/demo/dropdown-menu-demo";
import { EmptyDemo } from "@/components/demo/empty-demo";
import { FieldDemo } from "@/components/demo/field-demo";
import { HoverCardDemo } from "@/components/demo/hover-card-demo";
import { InputDemo } from "@/components/demo/input-demo";
import { InputGroupDemo } from "@/components/demo/input-group-demo";
import { InputOTPDemo } from "@/components/demo/input-otp-demo";
import { ItemDemo } from "@/components/demo/item-demo";
import { KbdDemo } from "@/components/demo/kbd-demo";
import { LabelDemo } from "@/components/demo/label-demo";
import { MenubarDemo } from "@/components/demo/menubar-demo";
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

const addUtmParams = (url: string): string => {
  if (!url) return url;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("shadcn.com")) {
      urlObj.searchParams.set("utm_source", "hextaui");
      urlObj.searchParams.set("utm_medium", "referral");
      urlObj.searchParams.set("utm_campaign", "component-docs");
      urlObj.searchParams.set("ref", "hextaui.com");
    }
    return urlObj.toString();
  } catch {
    return url;
  }
};

const radixDocs = (component: string) => `${radixBaseDocs}${component}`;
const radixApi = (component: string) =>
  `${radixBaseApi}${component}#api-reference`;

const shadcnDocs = (path: string) =>
  addUtmParams(`https://ui.shadcn.com/docs/components/${path}`);

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

type ComponentDefinition = {
  id: string;
  title: string;
  description: string;
  Demo: React.ComponentType;
  docs_ref?: string;
  api_ref?: string;
};

const componentDefinitions: ComponentDefinition[] = [
  {
    id: "accordion",
    title: "Accordion",
    description: "Expands to show or hide content.",
    Demo: AccordionDemo,
    docs_ref: radixDocs("accordion"),
    api_ref: radixApi("accordion"),
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description: "Modal dialog for important actions or decisions.",
    Demo: AlertDialogDemo,
    docs_ref: radixDocs("alert-dialog"),
    api_ref: radixApi("alert-dialog"),
  },
  {
    id: "alert",
    title: "Alert",
    description: "Displays a status or message banner.",
    Demo: AlertDemo,
  },
  {
    id: "aspect-ratio",
    title: "Aspect Ratio",
    description: "Maintains a fixed ratio for child content.",
    Demo: AspectRatioDemo,
    docs_ref: radixDocs("aspect-ratio"),
    api_ref: radixApi("aspect-ratio"),
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Shows an image or initials for a user/object.",
    Demo: AvatarDemo,
    docs_ref: radixDocs("avatar"),
    api_ref: radixApi("avatar"),
  },
  {
    id: "badge",
    title: "Badge",
    description: "Small badge for counts or indicators.",
    Demo: BadgeDemo,
    docs_ref: shadcnDocs("alert"),
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    description: "Displays navigation path as links.",
    Demo: BreadcrumbDemo,
    docs_ref: shadcnDocs("breadcrumb"),
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "Groups multiple buttons in a row.",
    Demo: ButtonGroupDemo,
    docs_ref: shadcnDocs("button-group"),
  },
  {
    id: "button",
    title: "Button",
    description: "Clickable button for actions.",
    Demo: ButtonDemo,
    docs_ref: shadcnDocs("button"),
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Grid to display days and dates.",
    Demo: CalendarDemo,
    docs_ref: "https://daypicker.dev/",
  },
  {
    id: "date-picker",
    title: "Date Picker",
    description: "Field and calendar to pick dates.",
    Demo: DatePickerDemo,
  },
  {
    id: "carousel",
    title: "Carousel",
    description: "Rotates or slides multiple items.",
    Demo: CarouselDemo,
    docs_ref: "https://www.embla-carousel.com/get-started/react",
    api_ref: "https://www.embla-carousel.com/api",
  },
  {
    id: "card",
    title: "Card",
    description: "Container with header, content, and footer sections.",
    Demo: CardDemo,
    docs_ref: shadcnDocs("card"),
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description: "Box for selecting true or false.",
    Demo: CheckboxDemo,
    docs_ref: radixDocs("checkbox"),
    api_ref: radixApi("checkbox"),
  },
  {
    id: "collapsible",
    title: "Collapsible",
    description: "Panel that expands and collapses.",
    Demo: CollapsibleDemo,
    docs_ref: radixDocs("collapsible"),
    api_ref: radixApi("collapsible"),
  },
  {
    id: "context-menu",
    title: "Context Menu",
    description: "Menu that appears on right-click or action.",
    Demo: ContextMenuDemo,
    docs_ref: radixDocs("context-menu"),
    api_ref: radixApi("context-menu"),
  },
  {
    id: "dialog",
    title: "Dialog",
    description: "Modal overlay for dialogs and forms.",
    Demo: DialogDemo,
    docs_ref: radixDocs("dialog"),
    api_ref: radixApi("dialog"),
  },
  {
    id: "drawer",
    title: "Drawer",
    description: "Slide-over panel that overlays the page.",
    Demo: DrawerDemo,
    docs_ref: "https://vaul.emilkowal.ski/getting-started",
    api_ref: undefined,
  },
  {
    id: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Menu that opens with a trigger control.",
    Demo: DropdownMenuDemo,
    docs_ref: radixDocs("dropdown-menu"),
    api_ref: radixApi("dropdown-menu"),
  },
  {
    id: "empty",
    title: "Empty",
    description: "Graphic placeholder for empty states.",
    Demo: EmptyDemo,
    docs_ref: shadcnDocs("empty"),
  },
  {
    id: "field",
    title: "Field",
    description: "Field layout with label and help.",
    Demo: FieldDemo,
    docs_ref: shadcnDocs("field"),
  },
  {
    id: "hover-card",
    title: "Hover Card",
    description: "Card that appears on hover.",
    Demo: HoverCardDemo,
    docs_ref: radixDocs("hover-card"),
    api_ref: radixApi("hover-card"),
  },
  {
    id: "input",
    title: "Input",
    description: "Single-line text input.",
    Demo: InputDemo,
    docs_ref: shadcnDocs("input"),
  },
  {
    id: "input-group",
    title: "Input Group",
    description: "Combines inputs and add-ons in a row.",
    Demo: InputGroupDemo,
    docs_ref: shadcnDocs("input-group"),
  },
  {
    id: "input-otp",
    title: "Input OTP",
    description: "Inputs for one-time code entry.",
    Demo: InputOTPDemo,
    docs_ref: "https://input-otp.rodz.dev/",
  },
  {
    id: "item",
    title: "Item",
    description: "List item component with actions.",
    Demo: ItemDemo,
    docs_ref: shadcnDocs("item"),
  },
  {
    id: "kbd",
    title: "Kbd",
    description: "Renders keyboard key appearance.",
    Demo: KbdDemo,
    docs_ref: shadcnDocs("kbd"),
  },
  {
    id: "label",
    title: "Label",
    description: "Label for form input.",
    Demo: LabelDemo,
    docs_ref: radixDocs("label"),
    api_ref: radixApi("label"),
  },
  {
    id: "menubar",
    title: "Menubar",
    description: "Horizontal menu bar for navigation.",
    Demo: MenubarDemo,
    docs_ref: radixDocs("menubar"),
    api_ref: radixApi("menubar"),
  },
  {
    id: "native-select",
    title: "Native Select",
    description: "Dropdown using the native select element.",
    Demo: NativeSelectDemo,
    docs_ref: shadcnDocs("native-select"),
  },
  {
    id: "navigation-menu",
    title: "Navigation Menu",
    description: "A collection of links for navigating websites.",
    Demo: NavigationMenuDemo,
    docs_ref: radixDocs("navigation-menu"),
    api_ref: radixApi("navigation-menu"),
  },
  {
    id: "pagination",
    title: "Pagination",
    description: "Controls for paging through content.",
    Demo: PaginationDemo,
    docs_ref: shadcnDocs("pagination"),
  },
  {
    id: "progress",
    title: "Progress",
    description: "Linear progress indicator.",
    Demo: ProgressDemo,
    docs_ref: radixDocs("progress"),
    api_ref: radixApi("progress"),
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description: "Group of choices where only one can be selected.",
    Demo: RadioGroupDemo,
    docs_ref: radixDocs("radio-group"),
    api_ref: radixApi("radio-group"),
  },
  {
    id: "resizable",
    title: "Resizable",
    description: "Container that users can resize.",
    Demo: ResizableDemo,
    docs_ref: "https://github.com/bvaughn/react-resizable-panels",
    api_ref:
      "https://github.com/bvaughn/react-resizable-panels/tree/main/packages/react-resizable-panels",
  },
  {
    id: "scroll-area",
    title: "Scroll Area",
    description: "Scrollable area for overflowing content.",
    Demo: ScrollAreaDemo,
    docs_ref: radixDocs("scroll-area"),
    api_ref: radixApi("scroll-area"),
  },
  {
    id: "sidebar",
    title: "Sidebar",
    description: "A collapsible sidebar component for navigation.",
    Demo: SidebarDemo,
    docs_ref: shadcnDocs("sidebar"),
  },
  {
    id: "select",
    title: "Select",
    description: "Custom dropdown select input.",
    Demo: SelectDemo,
    docs_ref: radixDocs("select"),
    api_ref: radixApi("select"),
  },
  {
    id: "separator",
    title: "Separator",
    description: "Horizontal or vertical dividing line.",
    Demo: SeparatorDemo,
    docs_ref: radixDocs("separator"),
    api_ref: radixApi("separator"),
  },
  {
    id: "sheet",
    title: "Sheet",
    description: "Drawer panel that slides in from edge.",
    Demo: SheetDemo,
    docs_ref: radixDocs("dialog"),
    api_ref: radixApi("dialog"),
  },
  {
    id: "skeleton",
    title: "Skeleton",
    description: "Shimmer effect placeholder preview.",
    Demo: SkeletonDemo,
    docs_ref: shadcnDocs("skeleton"),
  },
  {
    id: "slider",
    title: "Slider",
    description: "Draggable control for selecting a value.",
    Demo: SliderDemo,
    docs_ref: radixDocs("slider"),
    api_ref: radixApi("slider"),
  },
  {
    id: "sonner",
    title: "Sonner",
    description: "Displays toast notifications.",
    Demo: SonnerDemo,
    docs_ref: "https://sonner.emilkowal.ski/",
  },
  {
    id: "spinner",
    title: "Spinner",
    description: "Circular activity indicator.",
    Demo: SpinnerDemo,
    docs_ref: shadcnDocs("spinner"),
  },
  {
    id: "switch",
    title: "Switch",
    description: "Toggle to switch between states.",
    Demo: SwitchDemo,
    docs_ref: radixDocs("switch"),
    api_ref: radixApi("switch"),
  },
  {
    id: "table",
    title: "Table",
    description: "Displays data in rows and columns.",
    Demo: TableDemo,
    docs_ref: shadcnDocs("table"),
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Switches views using tabbed buttons.",
    Demo: TabsDemo,
    docs_ref: radixDocs("tabs"),
    api_ref: radixApi("tabs"),
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "Multi-line text input.",
    Demo: TextareaDemo,
    docs_ref: shadcnDocs("textarea"),
  },
  {
    id: "toggle",
    title: "Toggle",
    description: "Pressable toggle button.",
    Demo: ToggleDemo,
    docs_ref: radixDocs("toggle"),
    api_ref: radixApi("toggle"),
  },
  {
    id: "toggle-group",
    title: "Toggle Group",
    description: "Groups multiple toggle buttons.",
    Demo: ToggleGroupSpacing,
    docs_ref: radixDocs("toggle-group"),
    api_ref: radixApi("toggle-group"),
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "Shows info on hover or focus.",
    Demo: TooltipDemo,
    docs_ref: radixDocs("tooltip"),
    api_ref: radixApi("tooltip"),
  },
  {
    id: "command-menu",
    title: "Command Menu",
    description: "Popup menu for running commands.",
    Demo: CommandMenuDemo,
  },
  {
    id: "tree",
    title: "Tree",
    description: "Hierarchical collapsible structure.",
    Demo: TreeBasicDemo,
  },
  {
    id: "video-player",
    title: "Video Player",
    description: "Video playback with controls.",
    Demo: VideoPlayerDemo,
  },
];

const snippets = componentSnippets as Record<
  string,
  Partial<Omit<ComponentMeta, "id" | "title" | "Demo">>
>;

export const componentsRegistry: ComponentMeta[] = componentDefinitions
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((component) => ({
    ...component,
    ...(snippets[component.id] ?? {}),
  }));

export function getComponentMetaById(id: string) {
  return componentsRegistry.find((c) => c.id === id);
}
