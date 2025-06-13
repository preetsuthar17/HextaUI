export interface Component {
  name: string;
  description: string;
  files: ComponentFile[];
  dependencies?: string[];
  requiredComponents?: string[]; // Other HextaUI components this component requires
}

export interface ComponentFile {
  path: string;
  url: string;
  type: "file" | "folder";
}

export const COMPONENTS: Component[] = [
  // Simple Components (single files)
  {
    name: "Button",
    description: "A customizable button component with variants",
    files: [
      {
        path: "button.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/button.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
  },
  {
    name: "Card",
    description: "A flexible card component for content containers",
    files: [
      {
        path: "card.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/card.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Input",
    description: "A styled input component for forms",
    files: [
      {
        path: "input.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/input.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Label",
    description: "A form label component with accessibility",
    files: [
      {
        path: "label.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/label.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-label"],
  },
  {
    name: "Avatar",
    description: "User profile avatar with fallback support",
    files: [
      {
        path: "avatar.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/avatar.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-avatar"],
    requiredComponents: ["Tooltip"],
  },
  {
    name: "Breadcrumb",
    description: "Navigation breadcrumbs for page hierarchy",
    files: [
      {
        path: "breadcrumb.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/breadcrumb.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-slot", "lucide-react"],
  },
  {
    name: "Kbd",
    description: "Keyboard key display component",
    files: [
      {
        path: "kbd.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/kbd.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Separator",
    description: "A visual separator component",
    files: [
      {
        path: "separator.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/separator.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-separator"],
  },
  {
    name: "Tooltip",
    description: "Hover tooltips for additional information",
    files: [
      {
        path: "tooltip.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/tooltip.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-tooltip"],
  },
  {
    name: "File Upload",
    description: "File upload component with drag & drop",
    files: [
      {
        path: "file-upload.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/file-upload.tsx",
        type: "file",
      },
    ],
  },

  // Complex Components (folders)
  {
    name: "Accordion",
    description: "Collapsible content sections",
    files: [
      {
        path: "accordion.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/accordion.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-accordion", "motion"],
  },
  {
    name: "Alert",
    description: "Alert messages and notifications",
    files: [
      {
        path: "alert.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/alert.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Badge",
    description: "Small status and label indicators",
    files: [
      {
        path: "badge.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/badge.tsx",
        type: "file",
      },
    ],
    dependencies: ["class-variance-authority"],
  },
  {
    name: "Calendar",
    description: "Date selection calendar component",
    files: [
      {
        path: "calendar.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/Calendar/calendar.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Checkbox",
    description: "Checkbox input with custom styling",
    files: [
      {
        path: "checkbox.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/checkbox.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-checkbox"],
  },
  {
    name: "Chip",
    description: "Interactive chips for tags and selections",
    files: [
      {
        path: "chip.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/chip.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "ColorPicker",
    description: "Color selection component",
    files: [
      {
        path: "color-picker.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/color-picker.tsx",
        type: "file",
      },
    ],
    dependencies: ["react-aria-components"],
    requiredComponents: ["Button", "Input"], // ColorPicker uses buttons and inputs
  },
  {
    name: "CommandMenu",
    description: "Command palette for quick actions",
    files: [
      {
        path: "command-menu.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/command-menu.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-visually-hidden"],
  },
  {
    name: "DatePicker",
    description: "Date picker with calendar popup",
    files: [
      {
        path: "date-picker.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/datepicker.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Drawer",
    description: "Slide-out drawer component",
    files: [
      {
        path: "drawer.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/drawer.tsx",
        type: "file",
      },
    ],
    dependencies: ["vaul"],
  },
  {
    name: "DropdownMenu",
    description: "Dropdown menu for actions and options",
    files: [
      {
        path: "dropdown-menu.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/dropdown-menu.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-dropdown-menu"],
  },
  {
    name: "InputOTP",
    description: "One-time password input component",
    files: [
      {
        path: "input-otp.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/input-otp.tsx",
        type: "file",
      },
    ],
    dependencies: ["input-otp"],
  },
  {
    name: "Loader",
    description: "Loading spinners and indicators",
    files: [
      {
        path: "loader.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/loader.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "MenuBar",
    description: "Application menu bar component",
    files: [
      {
        path: "menu-bar.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/menubar.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-menubar"],
  },
  {
    name: "Modal",
    description: "Modal dialog component",
    files: [
      {
        path: "modal.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/modal.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-dialog"],
    requiredComponents: ["Button"], // Modals typically need buttons for actions
  },
  {
    name: "Pagination",
    description: "Pagination navigation component",
    files: [
      {
        path: "pagination.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/pagination.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Progress",
    description: "Progress bar indicator",
    files: [
      {
        path: "progress.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/progress.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-progress"],
  },
  {
    name: "Radio",
    description: "Radio button group component",
    files: [
      {
        path: "radio.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/radio.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-radio-group"],
  },
  {
    name: "Resizable",
    description: "Resizable panels component",
    files: [
      {
        path: "resizable.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/resizable.tsx",
        type: "file",
      },
    ],
    dependencies: ["react-resizable-panels"],
  },
  {
    name: "ScrollArea",
    description: "Custom scrollable area component",
    files: [
      {
        path: "scroll-area.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/scroll-area.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-scroll-area"],
  },
  {
    name: "Select",
    description: "Select dropdown component",
    files: [
      {
        path: "select.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/select.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-select"],
  },
  {
    name: "Skeleton",
    description: "Loading skeleton placeholders",
    files: [
      {
        path: "skeleton.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/skeleton.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Slider",
    description: "Range slider input component",
    files: [
      {
        path: "slider.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/slider.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-slider"],
  },
  {
    name: "Switch",
    description: "Toggle switch component",
    files: [
      {
        path: "switch.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/switch.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-switch"],
  },
  {
    name: "Table",
    description: "Data table component",
    files: [
      {
        path: "table.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/table.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Tabs",
    description: "Tabbed content component",
    files: [
      {
        path: "tabs.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/tabs.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-tabs"],
  },
  {
    name: "Textarea",
    description: "Multi-line text input component",
    files: [
      {
        path: "textarea.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/textarea.tsx",
        type: "file",
      },
    ],
  },
  {
    name: "Toast",
    description: "Toast notification component",
    files: [
      {
        path: "toast.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/toast.tsx",
        type: "file",
      },
    ],
    dependencies: ["sonner"],
  },
  {
    name: "Toggle",
    description: "Toggle button component",
    files: [
      {
        path: "toggle.tsx",
        url: "https://raw.githubusercontent.com/preetsuthar17/HextaUI/refs/heads/2.0/src/components/ui/toggle.tsx",
        type: "file",
      },
    ],
    dependencies: ["@radix-ui/react-toggle"],
  },
];
