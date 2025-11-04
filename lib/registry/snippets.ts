export const componentSnippets = {
  accordion: {
    demoCode: `"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      className="mx-auto w-full max-w-md"
      collapsible
      defaultValue="item-1"
      type="single"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
        <AccordionContent>
          Shadcn UI is a set of beautiful, accessible React components built
          with Radix UI and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes, all components use Radix UI primitives which follow WAI-ARIA
          guidelines, supporting keyboard navigation, focus management, and
          screen readers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I customize the styles?</AccordionTrigger>
        <AccordionContent>
          Absolutely! Components are built with utility classes and are fully
          customizable with Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    usageImports: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`,
    usageCode: `<Accordion type="single" collapsible className="w-full" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Product Information</AccordionTrigger>
    <AccordionContent>
      Our flagship product combines cutting-edge technology with sleek design.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  "command-menu": {
    demoCode: `"use client";

import * as React from "react";
import {
  CommandMenu,
  CommandMenuTrigger,
  CommandMenuContent,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
  CommandMenuEmpty,
  useCommandMenuShortcut,
} from "@/components/ui/command-menu";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Settings,
  Plus,
  Upload,
  Download,
  Command as CommandIcon,
  Home,
} from "lucide-react";

const menuItems = [
  {
    group: "General",
    items: [
      { icon: <Home />, label: "Home" },
      { icon: <Calendar />, label: "Calendar" },
      { icon: <User />, label: "Users" },
      { icon: <Settings />, label: "Settings" },
    ],
  },
  {
    group: "Actions",
    items: [
      { icon: <Plus />, label: "Create New", shortcut: "cmd+n" },
      { icon: <Upload />, label: "Upload File", shortcut: "cmd+u" },
      { icon: <Download />, label: "Download", shortcut: "cmd+d" },
    ],
  },
];

export const CommandMenuDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  useCommandMenuShortcut(() => setOpen(true));

  const filteredGroups = menuItems
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const flatItems: { group: string; item: any }[] = [];
  filteredGroups.forEach((group) => {
    group.items.forEach((item) => {
      flatItems.push({ group: group.group, item });
    });
  });

  return (
    <CommandMenu open={open} onOpenChange={setOpen}>
      <CommandMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CommandIcon size={16} />
          Command Menu
        </Button>
      </CommandMenuTrigger>
      <CommandMenuContent>
        <CommandMenuInput
          placeholder="Type a command or search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <CommandMenuList>
          {flatItems.length === 0 ? (
            <CommandMenuEmpty>
              No results found{search && \` for "\${search}"\`}
            </CommandMenuEmpty>
          ) : (
            (() => {
              let currIndex = 0;
              return filteredGroups.map((group, groupIndex) => (
                <React.Fragment key={group.group}>
                  {groupIndex > 0 && <CommandMenuSeparator />}
                  <CommandMenuGroup heading={group.group}>
                    {group.items.map((item) => {
                      const rendered = (
                        <CommandMenuItem
                          key={item.label}
                          icon={item.icon}
                          index={currIndex}
                          onSelect={() => setOpen(false)}
                        >
                          {item.label}
                        </CommandMenuItem>
                      );
                      currIndex++;
                      return rendered;
                    })}
                  </CommandMenuGroup>
                </React.Fragment>
              ));
            })()
          )}
        </CommandMenuList>
      </CommandMenuContent>
    </CommandMenu>
  );
};

export default CommandMenuDemo;
`,
    usageImports: `import {
  CommandMenu,
  CommandMenuTrigger,
  CommandMenuContent,
  CommandMenuInput,
  CommandMenuList,
  CommandMenuGroup,
  CommandMenuItem,
  CommandMenuSeparator,
  useCommandMenuShortcut,
} from "@/components/ui/command-menu"
import { Button } from "@/components/ui/button"`,
    usageCode: `const [open, setOpen] = React.useState(false)

return (
  <CommandMenu open={open} onOpenChange={setOpen}>
    <CommandMenuTrigger asChild>
      <Button variant="outline">Open Command Menu</Button>
    </CommandMenuTrigger>
    <CommandMenuContent>
      <CommandMenuInput placeholder="Type a command or search..." />
      <CommandMenuList>
        <CommandMenuGroup heading="Suggestions">
          <CommandMenuItem index={0}>Search</CommandMenuItem>
          <CommandMenuItem index={1}>Settings</CommandMenuItem>
        </CommandMenuGroup>
      </CommandMenuList>
    </CommandMenuContent>
  </CommandMenu>
)`,
  },
  tree: {
    demoCode: `"use client";

import { Folder, File, FileText, Image } from "lucide-react";
import { TreeProvider, Tree, TreeItem } from "@/components/ui/tree";

export function TreeDemo() {
  return (
    <TreeProvider className="w-full max-w-sm">
      <Tree>
        <TreeItem nodeId="documents" label="Documents" icon={<Folder />} hasChildren>
          <TreeItem nodeId="projects" label="Projects" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="project1" label="Project 1" icon={<Folder />} level={2} hasChildren>
              <TreeItem nodeId="readme" label="README.md" icon={<FileText />} level={3} />
              <TreeItem nodeId="index" label="index.tsx" icon={<FileText />} level={3} />
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="images" label="Images" icon={<Folder />} level={1} hasChildren>
            <TreeItem nodeId="logo" label="logo.png" icon={<Image />} level={2} />
            <TreeItem nodeId="banner" label="banner.jpg" icon={<Image />} level={2} />
          </TreeItem>
        </TreeItem>
      </Tree>
    </TreeProvider>
  );
}
`,
    usageImports: `import { TreeProvider, Tree, TreeItem } from "@/components/ui/tree"`,
    usageCode: `<TreeProvider>
  <Tree>
    <TreeItem nodeId="1" label="Item 1" hasChildren>
      <TreeItem nodeId="2" label="Item 2" level={1} />
    </TreeItem>
  </Tree>
</TreeProvider>`,
  },
  "video-player": {
    demoCode: `"use client";

import { VideoPlayer } from "@/components/ui/video-player";

export function VideoPlayerDemo() {
  return (
    <VideoPlayer
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
      size="default"
      className="aspect-video"
    />
  );
}
`,
    usageImports: `import { VideoPlayer } from "@/components/ui/video-player"`,
    usageCode: `<VideoPlayer src="/path/to/video.mp4" poster="/path/to/poster.jpg" />`,
  },
  "alert-dialog": {
    demoCode: `"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function AlertDialogDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            aria-label="Open delete confirmation dialog"
            variant="outline"
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent
          aria-describedby="alert-dialog-description"
          aria-labelledby="alert-dialog-title"
          aria-modal="true"
          role="alertdialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              aria-label="Confirm account deletion"
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
`,
    usageImports: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`,
    usageCode: `<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },
  alert: {
    demoCode: `"use client";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <Alert className="mx-auto w-full max-w-md" role="alert" tabIndex={-1}>
      <Terminal aria-hidden="true" className="size-5 text-muted-foreground" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}
`,
    usageImports: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"`,
    usageCode: `<Alert variant="default | destructive">
  <Terminal />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>`,
  },
  "aspect-ratio": {
    demoCode: `"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <AspectRatio
      className="h-full w-full overflow-hidden rounded-lg bg-muted"
      ratio={16 / 9}
    >
      <img
        alt="A beautiful landscape"
        className="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
      />
    </AspectRatio>
  );
}
`,
    usageImports: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    usageCode: `<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>`,
  },
  avatar: {
    demoCode: `"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 py-10">
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-1">
          <Avatar>
            <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Avatar className="rounded-md">
            <AvatarImage
              alt="User"
              className="rounded-md"
              src="https://github.com/preetsuthar17.png"
            />
            <AvatarFallback className="rounded-md">PS</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="-space-x-3 flex">
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Anna"
                src="https://randomuser.me/api/portraits/women/44.jpg"
              />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Ben"
                src="https://randomuser.me/api/portraits/men/45.jpg"
              />
              <AvatarFallback>BN</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-background">
              <AvatarImage
                alt="Cara"
                src="https://randomuser.me/api/portraits/women/47.jpg"
              />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    usageImports: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    usageCode: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  badge: {
    demoCode: `"use client";

import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BadgeDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-10">
      <div className="flex flex-wrap gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge
          aria-label="Verified"
          className="flex items-center gap-1 bg-blue-600 text-white"
        >
          <CheckCircle2 aria-hidden="true" className="size-4 text-white" />
          Verified
        </Badge>
        <Badge variant="destructive">3</Badge>
      </div>
    </div>
  );
}
`,
    usageImports: `import { Badge } from "@/components/ui/badge"`,
    usageCode: `<Badge variant="default | outline | secondary | destructive">Badge</Badge>`,
  },
  breadcrumb: {
    demoCode: `"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 py-10">
      <div className="w-full">
        <Breadcrumb aria-label="Simple breadcrumb example">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/library">Library</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink aria-current="page" href="/library/data">
                Data
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full">
        <Breadcrumb aria-label="Breadcrumb with ellipsis">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/documents">Documents</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/documents/2024">2024</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                aria-current="page"
                href="/documents/2024/reports"
              >
                Reports
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
`,
    usageImports: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`,
    usageCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  "button-group": {
    demoCode: `"use client";

import {
    DownloadIcon,
    MoreVerticalIcon,
    PencilIcon,
    SaveIcon,
    Share2Icon,
    Trash2Icon,
    UploadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ButtonGroupDemo() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8 py-10">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full items-center justify-center gap-4">
          <ButtonGroup aria-label="User management actions">
            <Button aria-label="View user" variant="outline">
              View
            </Button>
            <Button aria-label="Edit user" variant="outline">
              <PencilIcon aria-hidden="true" className="size-4" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="More user actions"
                  size="icon"
                  variant="outline"
                >
                  <MoreVerticalIcon aria-hidden="true" className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Share2Icon aria-hidden="true" className="size-4" />
                  <span>Share Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SaveIcon aria-hidden="true" className="size-4" />
                  <span>Export Data</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon aria-hidden="true" className="size-4" />
                  <span>Delete User</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ButtonGroup aria-label="File actions">
            <Button aria-label="Upload file" variant="outline">
              <UploadIcon aria-hidden="true" className="size-4" />
              Upload
            </Button>
            <Button aria-label="Download file" variant="outline">
              <DownloadIcon aria-hidden="true" className="size-4" />
              Download
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
`,
    usageImports: `import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"`,
    usageCode: `<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>`,
  },
  button: {
    demoCode: `import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button aria-label="Submit" size="icon" variant="outline">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
`,
    usageImports: `import { Button } from "@/components/ui/button"`,
    usageCode: `<Button variant="outline">Button</Button>`,
  },
  calendar: {
    demoCode: `"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      captionLayout="dropdown"
      className="rounded-lg border shadow-xs"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  );
}
`,
    usageImports: `import { Calendar } from "@/components/ui/calendar"`,
    usageCode: `const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)`,
  },
  "date-picker": {
    demoCode: `"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
`,
    usageImports: `import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"`,
    usageCode: `const [date, setDate] = React.useState<Date | undefined>()

return (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="w-[280px] justify-start text-left font-normal" data-empty={!date}>
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </PopoverContent>
  </Popover>
)`,
  },
  carousel: {
    demoCode: `"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="font-semibold text-4xl">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
`,
    usageImports: `import {
                Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`,
    usageCode: `<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  checkbox: {
    demoCode: `"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="pl-2">Accept terms and conditions</Label>
      </div>

        <div className="flex items-center opacity-50">
        <Checkbox
          id="newsletter"
          disabled
          className="cursor-not-allowed"
        />
        <Label htmlFor="newsletter" className="pl-2">Subscribe to newsletter (disabled)</Label>
      </div>

      <Label className="flex items-start rounded-lg border p-3 hover:bg-accent/50 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
        <Checkbox
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
          defaultChecked
          id="toggle-2"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="font-medium text-sm leading-none">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>

    
    </div>
  );
}
`,
    usageImports: `import { Checkbox } from "@/components/ui/checkbox"`,
    usageCode: "<Checkbox />",
  },
  collapsible: {
    demoCode: `"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      className="flex w-[350px] flex-col gap-2"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="font-semibold text-sm">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button className="size-8" size="icon" variant="ghost">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
`,
    usageImports: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"`,
    usageCode: `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>`,
  },
  "context-menu": {
    demoCode: `"use client";

import * as React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

export function ContextMenuDemo() {
  const [showHidden, setShowHidden] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="flex h-[160px] w-[330px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-dashboard/40 bg-transparent text-center text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          tabIndex={0}
        >
          <span className="font-semibold text-base">Project Files</span>
          <span className="mt-1 text-xs text-muted-foreground">
            Right-click to manage your project files
          </span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          Open
          <ContextMenuShortcut>⏎</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Open With…
        </ContextMenuItem>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>⇧F6</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Send to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>External Drive</ContextMenuItem>
            <ContextMenuItem>Cloud Storage</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showHidden}
          onCheckedChange={setShowHidden}
        >
          Show Hidden Files
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          value={viewMode}
          onValueChange={v => setViewMode(v as "list" | "grid")}
        >
          <ContextMenuLabel inset>View Mode</ContextMenuLabel>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
`,
    usageImports: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`,
    usageCode: `<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
  },
  dialog: {
    demoCode: `"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, AtSign } from "lucide-react";
import * as React from "react";

export function DialogDemo() {
  const [formValues, setFormValues] = React.useState({
    name: "Pedro Duarte",
    username: "peduarte",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    // Add custom submit logic here
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="size-5" />
          Edit Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <DialogHeader className="bg-accent/50 px-6 py-5 border-b">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-accent-foreground/80" />
              Update Profile
            </DialogTitle>
            <DialogDescription>
              Update your information below.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Label htmlFor="name-1" className="w-28 text-right">
                Full Name
              </Label>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  id="name-1"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  autoComplete="name"
                  required
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="username-1" className="w-28 text-right">
                Username
              </Label>
              <div className="flex-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-9 rounded-md border bg-muted text-muted-foreground">
                  <AtSign className="size-4" />
                </span>
                <Input
                  id="username-1"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  placeholder="username"
                  autoComplete="username"
                  required
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-end gap-2 bg-muted/40 px-6 py-4 border-t">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
`,
    usageImports: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`,
    usageCode: `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
  },
  "dropdown-menu": {
    demoCode: `"use client";

import * as React from "react";
import { User, Settings, Users, LogOut, UserPlus, Mail, MessageSquare, MoreHorizontal, CreditCard, Keyboard, Github, LifeBuoy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-haspopup="menu"
          aria-expanded={open}
          className="gap-2"
        >
          <User className="size-4" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64"
        sideOffset={4}
        collisionPadding={8}
      >
        <DropdownMenuLabel className="font-semibold">Signed in as<br /><span className="text-xs font-normal text-muted-foreground">annie@vercel.com</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="size-4" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="size-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="size-4" />
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="size-4" />
            Team
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="size-4" />
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem>
                  <Mail className="size-4" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="size-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MoreHorizontal className="size-4" />
                  More…
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Users className="size-4" />
            New Team
            <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Github className="size-4" />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="size-4" />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Shield className="size-4" />
            API
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault();
            // Implement logout action here
          }}
        >
          <LogOut className="size-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
`,
    usageImports: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
    usageCode: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  empty: {
    demoCode: `"use client";

import { IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconMail size={32} aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>No Messages</EmptyTitle>
        <EmptyDescription>
          You have not received any messages yet. Send your first message or check back later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-row gap-2 items-center justify-center w-fit flex-wrap">
          <Button>Send Message</Button>
          <Button variant="outline">Refresh</Button>
      </EmptyContent>
    </Empty>
  );
}
`,
    usageImports: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"`,
    usageCode: `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>`,
  },
  input: {
    demoCode: `import { Input } from "@/components/ui/input";

export function InputDemo() {
  return <Input placeholder="Email" type="email" className="max-w-sm w-full" />;
}
`,
    usageImports: `import { Input } from "@/components/ui/input"`,
    usageCode: `<Input placeholder="Email" type="email"i/>`,
  },
  "input-group": {
    demoCode: `import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react";
import { ArrowUpIcon, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput className="pl-1!" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <IconInfoCircle />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            className="rounded-full"
            size="icon-xs"
            variant="outline"
          >
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="[--radius:0.95rem]"
              side="top"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator className="h-4!" orientation="vertical" />
          <InputGroupButton
            className="rounded-full"
            disabled
            size="icon-xs"
            variant="default"
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconCheck className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
`,
    usageImports: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"`,
    usageCode: `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
  },
  "input-otp": {
    demoCode: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
`,
    usageImports: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"`,
    usageCode: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  kbd: {
    demoCode: `import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
`,
    usageImports: `import { Kbd } from "@/components/ui/kbd"`,
    usageCode: "<Kbd>Ctrl</Kbd>",
  },
  label: {
    demoCode: `import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
`,
    usageImports: `import { Label } from "@/components/ui/label"`,
    usageCode: `<Label htmlFor="email">Your email address</Label>`,
  },
  "native-select": {
    demoCode: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

export function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="todo">Todo</NativeSelectOption>
      <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption value="done">Done</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
    </NativeSelect>
  );
}
`,
    usageImports: `import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"`,
    usageCode: `<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="grapes" disabled>
    Grapes
  </NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>`,
  },
  pagination: {
    demoCode: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
`,
    usageImports: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`,
    usageCode: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  },
  progress: {
    demoCode: `"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress className="w-[60%]" value={progress} />;
}
`,
    usageImports: `import { Progress } from "@/components/ui/progress"`,
    usageCode: "<Progress value={33} />",
  },
  "radio-group": {
    demoCode: `import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r1" value="default" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r2" value="comfortable" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem id="r3" value="compact" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}
`,
    usageImports: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    usageCode: `<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`,
  },
  resizable: {
    demoCode: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      className="max-w-md rounded-lg border md:min-w-[450px]"
      direction="horizontal"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
`,
    usageImports: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"`,
    usageCode: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
  },
  "scroll-area": {
    demoCode: `import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const users = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Williams",
  "Dana Lee",
  "Eddie Chen",
  "Fatima Patel",
  "Grace Kim",
  "Henry Li",
  "Ivy Nguyen",
  "Jack Brown",
  "Karen Davis",
  "Leo Taylor",
  "Mia Wilson",
  "Noah Martinez",
  "Olivia Clark",
  "Paul Walker",
];

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-64 rounded-md border bg-background">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Active Users</h4>
        <ul>
          {users.map((user, i) => (
            <React.Fragment key={user}>
              <li className="text-sm">{user}</li>
              {i !== users.length - 1 && <Separator className="my-1.5" />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
`,
    usageImports: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    usageCode: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving
  jokes all over the place: under the king's pillow, in his soup, even in the
  royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
  then, one day, the people of the kingdom discovered that the jokes left by
  Jokester were so funny that they couldn't help but laugh. And once they
  started laughing, they couldn't stop.
</ScrollArea>`,
  },
  select: {
    demoCode: `import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
`,
    usageImports: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`,
    usageCode: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>`,
  },
  separator: {
    demoCode: `import { Separator } from "@/components/ui/separator";

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="font-medium text-sm leading-none">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
`,
    usageImports: `import { Separator } from "@/components/ui/separator"`,
    usageCode: "<Separator />",
  },
  sheet: {
    demoCode: `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input defaultValue="Pedro Duarte" id="sheet-demo-name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input defaultValue="@peduarte" id="sheet-demo-username" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
`,
    usageImports: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"`,
    usageCode: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  skeleton: {
    demoCode: `import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
`,
    usageImports: `import { Skeleton } from "@/components/ui/skeleton"`,
    usageCode: `<Skeleton className="h-[20px] w-[100px] rounded-full" />`,
  },
  slider: {
    demoCode: `import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      className={cn("w-[60%]", className)}
      defaultValue={[50]}
      max={100}
      step={1}
      {...props}
    />
  );
}
`,
    usageImports: `import { Slider } from "@/components/ui/slider"`,
    usageCode: "<Slider defaultValue={[33]} max={100} step={1} />",
  },
  sonner: {
    demoCode: `"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function SonnerDemo() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
      variant="outline"
    >
      Show Toast
    </Button>
  );
}
`,
    usageImports: `import { toast } from "sonner"`,
    usageCode: `toast("Event has been created.")`,
  },
  spinner: {
    demoCode: `import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  );
}
`,
    usageImports: `import { Spinner } from "@/components/ui/spinner"`,
    usageCode: "<Spinner />",
  },
  switch: {
    demoCode: `import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
`,
    usageImports: `import { Switch } from "@/components/ui/switch"`,
    usageCode: "<Switch />",
  },
  table: {
    demoCode: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
`,
    usageImports: `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"`,
    usageCode: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },
  tabs: {
    demoCode: `import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input defaultValue="Pedro Duarte" id="tabs-demo-name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input defaultValue="@peduarte" id="tabs-demo-username" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
`,
    usageImports: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    usageCode: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`,
  },
  textarea: {
    demoCode: `import { Textarea } from "@/components/ui/textarea";

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />;
}
`,
    usageImports: `import { Textarea } from "@/components/ui/textarea"<Textarea />`,
  },
  toggle: {
    demoCode: `import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
      size="sm"
      variant="outline"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  );
}
`,
    usageImports: `import { Toggle } from "@/components/ui/toggle"`,
    usageCode: "<Toggle>Toggle</Toggle>",
  },
  "toggle-group": {
    demoCode: `"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
});

const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & { spacing?: number }
>(function ToggleGroup(
  { className, variant, size, spacing = 0, children, ...props },
  ref
) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        "group/toggle-group flex w-fit touch-manipulation items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      ref={ref}
      style={{ "--gap": spacing } as React.CSSProperties}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
});

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(function ToggleGroupItem(
  { className, children, variant, size, ...props },
  ref
) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      aria-disabled={(props as any).disabled ? true : undefined}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 touch-manipulation px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:first:rounded-l-md",
        className
      )}
      data-size={context.size || size}
      data-slot="toggle-group-item"
      data-spacing={context.spacing}
      data-variant={context.variant || variant}
      ref={ref}
      type="button"
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

export { ToggleGroup, ToggleGroupItem };
`,
    usageImports: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    usageCode: `<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>`,
  },
  tooltip: {
    demoCode: `import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
`,
    usageImports: `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"`,
    usageCode: `<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`,
  },
} as const;

export type ComponentSnippets = typeof componentSnippets;
