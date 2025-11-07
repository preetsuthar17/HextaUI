"use client";

import {
  Check,
  Globe,
  Lightbulb,
  Mic,
  MoreHorizontal,
  Paperclip,
  Plus,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockUsers = [
  {
    id: "shadcn",
    name: "shadcn",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "preetsuthar17",
    name: "preetsuthar17",
    avatar: "https://github.com/preetsuthar17.png",
  },
  {
    id: "evilrabbit",
    name: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
  },
];

const mockPages = [
  { id: "analytics-report", name: "Analytics Report", icon: "📊" },
  { id: "technical-specs", name: "Technical Specs", icon: "📑" },
  { id: "user-guide", name: "User Guide", icon: "💡" },
  { id: "team-directory", name: "Team Directory", icon: "👥" },
  { id: "attachments", name: "Attachments", icon: "📎" },
  { id: "new-feature", name: "New Feature Plan", icon: "✨" },
];

const models = [
  { value: "claude-sonnet-4-preview", label: "Claude Sonnet 4 (Preview)" },
  { value: "claude-sonnet-3.7", label: "Claude Sonnet 3.7" },
  { value: "claude-sonnet-3.5", label: "Claude Sonnet 3.5" },
  { value: "gemini-2.5-pro-preview", label: "Gemini 2.5 pro (Preview)" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-o4-mini", label: "o4-mini (Preview)" },
];

const agentModes = [
  { value: "auto", label: "Auto" },
  { value: "agent", label: "Agent" },
  { value: "plan", label: "Plan" },
];

const hideScrollbar = {
  msOverflowStyle: "none",
  scrollbarWidth: "none" as const,
} as React.CSSProperties;

interface ContextBadgeProps {
  label: string;
  icon?: string;
  avatar?: string;
  onRemove: () => void;
}

function ContextBadge({ label, icon, avatar, onRemove }: ContextBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-md border border-muted-foreground bg-secondary px-2 py-0.5 font-medium text-muted-foreground text-xs"
      style={{ whiteSpace: "nowrap", flex: "0 0 auto" }}
    >
      {icon && <span>{icon}</span>}
      {avatar && (
        <span className="relative inline-block h-4 w-4">
          <Image
            alt={label}
            className="rounded-full"
            fill
            priority
            sizes="16px"
            src={avatar}
            style={{ objectFit: "cover" }}
          />
        </span>
      )}
      {label}
      <button
        aria-label={`Remove ${label}`}
        className="rounded p-0.5 hover:bg-muted-foreground/10 focus:outline-none focus:ring-1 focus:ring-muted-foreground"
        onClick={onRemove}
        tabIndex={0}
        type="button"
      >
        <X className="h-3 w-3 text-muted-foreground/60" />
      </button>
    </span>
  );
}

interface ContextPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUsers: string[];
  selectedPages: string[];
  onUserToggle: (userId: string) => void;
  onPageToggle: (pageId: string) => void;
}

function ContextPopover({
  open,
  onOpenChange,
  selectedUsers,
  selectedPages,
  onUserToggle,
  onPageToggle,
}: ContextPopoverProps) {
  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-label="Add context"
          className="inline-flex items-center gap-1 rounded-md border border-muted-foreground bg-secondary px-2 py-0.5 font-medium text-muted-foreground text-xs transition hover:bg-accent"
          style={{
            whiteSpace: "nowrap",
            flex: "0 0 auto",
            height: "auto",
            appearance: "none",
            background: "none",
          }}
          type="button"
        >
          <Plus className="h-3 w-3 text-muted-foreground" />
          <span>Add context</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-30 w-52 p-2">
        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-1 px-1 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Pages
            </div>
            <div className="flex flex-col gap-1">
              {mockPages.map((page) => {
                const isSelected = selectedPages.includes(page.id);
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`inline-flex items-center justify-start gap-1 rounded-md border px-2 py-0.5 font-medium text-xs transition ${
                      isSelected
                        ? "border-muted-foreground bg-secondary text-muted-foreground"
                        : "border-transparent bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    key={page.id}
                    onClick={() => onPageToggle(page.id)}
                    style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                    type="button"
                  >
                    {page.icon} {page.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="mb-1 px-1 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Users
            </div>
            <div className="flex flex-col gap-1">
              {mockUsers.map((user) => {
                const isSelected = selectedUsers.includes(user.id);
                return (
                  <button
                    aria-pressed={isSelected}
                    className={`inline-flex items-center justify-start gap-1 rounded-md border px-2 py-0.5 font-medium text-xs transition ${
                      isSelected
                        ? "border-muted-foreground bg-secondary text-muted-foreground"
                        : "border-transparent bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    key={user.id}
                    onClick={() => onUserToggle(user.id)}
                    style={{ fontWeight: 400, whiteSpace: "nowrap" }}
                    type="button"
                  >
                    <Image
                      alt={user.name}
                      className="h-4 w-4 rounded-full"
                      height={16}
                      src={user.avatar}
                      style={{ display: "inline-block" }}
                      width={16}
                    />
                    {user.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ContextSelectorProps {
  selectedUsers: string[];
  selectedPages: string[];
  onUserToggle: (userId: string) => void;
  onPageToggle: (pageId: string) => void;
  onRemoveUser: (userId: string) => void;
  onRemovePage: (pageId: string) => void;
}

function ContextSelector({
  selectedUsers,
  selectedPages,
  onUserToggle,
  onPageToggle,
  onRemoveUser,
  onRemovePage,
}: ContextSelectorProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const hasSelectedContext =
    selectedPages.length > 0 || selectedUsers.length > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center gap-1">
        <ContextPopover
          onOpenChange={setPopoverOpen}
          onPageToggle={onPageToggle}
          onUserToggle={onUserToggle}
          open={popoverOpen}
          selectedPages={selectedPages}
          selectedUsers={selectedUsers}
        />
        <div
          aria-label="Selected context"
          className="scroll-hide hidden flex-1 gap-1 overflow-x-auto sm:flex"
          style={{
            ...hideScrollbar,
            WebkitOverflowScrolling: "touch",
            minWidth: 0,
          }}
          tabIndex={0}
        >
          <style>
            {`.scroll-hide::-webkit-scrollbar {
              display: none !important;
              height: 0 !important;
              width: 0 !important;
              background: transparent !important;
            }`}
          </style>
          {selectedPages.map((id) => {
            const page = mockPages.find((p) => p.id === id);
            if (!page) return null;
            return (
              <ContextBadge
                icon={page.icon}
                key={`page-${id}`}
                label={page.name}
                onRemove={() => onRemovePage(id)}
              />
            );
          })}
          {selectedUsers.map((id) => {
            const user = mockUsers.find((u) => u.id === id);
            if (!user) return null;
            return (
              <ContextBadge
                avatar={user.avatar}
                key={`user-${id}`}
                label={user.name}
                onRemove={() => onRemoveUser(id)}
              />
            );
          })}
        </div>
      </div>
      {hasSelectedContext && (
        <div
          aria-label="Selected context (mobile)"
          className="scroll-hide flex w-[18rem] gap-1 overflow-x-auto sm:hidden sm:w-full"
          style={{
            ...hideScrollbar,
            WebkitOverflowScrolling: "touch",
            minWidth: 0,
          }}
          tabIndex={0}
        >
          {selectedPages.map((id) => {
            const page = mockPages.find((p) => p.id === id);
            if (!page) return null;
            return (
              <ContextBadge
                icon={page.icon}
                key={`page-${id}`}
                label={page.name}
                onRemove={() => onRemovePage(id)}
              />
            );
          })}
          {selectedUsers.map((id) => {
            const user = mockUsers.find((u) => u.id === id);
            if (!user) return null;
            return (
              <ContextBadge
                avatar={user.avatar}
                key={`user-${id}`}
                label={user.name}
                onRemove={() => onRemoveUser(id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ModelSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

function ModelSelect({ value, onValueChange }: ModelSelectProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="font-medium" size="default">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent className="text-sm">
        {models.map((model) => (
          <SelectItem key={model.value} value={model.value}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface AgentModeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

function AgentModeSelect({ value, onValueChange }: AgentModeSelectProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger aria-label="Agent mode" className="font-medium">
        <SelectValue placeholder="Agent" />
      </SelectTrigger>
      <SelectContent className="text-sm">
        {agentModes.map((mode) => (
          <SelectItem key={mode.value} value={mode.value}>
            {mode.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface LeftActionButtonsProps {
  webSearchEnabled: boolean;
  thinkingEnabled: boolean;
  onWebSearchToggle: (enabled: boolean) => void;
  onThinkingToggle: (enabled: boolean) => void;
}

function LeftActionButtons({
  webSearchEnabled,
  thinkingEnabled,
  onWebSearchToggle,
  onThinkingToggle,
}: LeftActionButtonsProps) {
  return (
    <>
      <div className="hidden items-center justify-center gap-1 sm:flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label="Attach file"
              size="icon"
              type="button"
              variant="ghost"
            >
              <Paperclip />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Attach file</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Enable Thinking"
              onPressedChange={onThinkingToggle}
              pressed={thinkingEnabled}
              size="default"
              variant={thinkingEnabled ? "outline" : "default"}
            >
              <Lightbulb />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent side="top">
            {thinkingEnabled ? "Disable Thinking" : "Enable Thinking"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Enable web search"
              className="relative flex w-9 min-w-9 items-center justify-center overflow-hidden p-0"
              onPressedChange={onWebSearchToggle}
              pressed={webSearchEnabled}
              size="default"
              variant={webSearchEnabled ? "outline" : "default"}
            >
              <span className="flex h-full w-full items-center justify-center opacity-100 transition-opacity duration-200">
                <Globe />
              </span>
              <span
                className={`absolute left-8 whitespace-nowrap font-medium text-sm transition-all duration-200 ${
                  webSearchEnabled
                    ? "visible left-9 ml-2 opacity-100"
                    : "invisible left-4 opacity-0"
                }`}
                style={{
                  width: webSearchEnabled ? "auto" : 0,
                  pointerEvents: webSearchEnabled ? "auto" : "none",
                }}
              >
                Search
              </span>
            </Toggle>
          </TooltipTrigger>
          <TooltipContent side="top">
            {webSearchEnabled ? "Disable web search" : "Enable web search"}
          </TooltipContent>
        </Tooltip>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="More options"
            className="sm:hidden"
            size="icon"
            type="button"
            variant="ghost"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              // Handle attach - you can add actual functionality here
            }}
          >
            <Paperclip className="size-4" />
            <span>Attach file</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onThinkingToggle(!thinkingEnabled)}>
            <Lightbulb className="size-4" />
            <span>Thinking</span>
            {thinkingEnabled && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onWebSearchToggle(!webSearchEnabled)}
          >
            <Globe className="size-4" />
            <span>Web search</span>
            {webSearchEnabled && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

interface RightActionButtonsProps {
  input: string;
}

function RightActionButtons({ input }: RightActionButtonsProps) {
  const hasInput = input.trim().length > 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={hasInput ? "Send message" : "Start voice input"}
          size="icon"
          type={hasInput ? "submit" : "button"}
        >
          {hasInput ? <Send /> : <Mic />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        {hasInput ? "Send message" : "Start voice input"}
      </TooltipContent>
    </Tooltip>
  );
}

export default function AIPromptInput() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [agentMode, setAgentMode] = useState("auto");
  const [contextOptions, setContextOptions] = useState<string[]>([]);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [thinkingEnabled, setThinkingEnabled] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
    if (!contextOptions.includes("users")) {
      setContextOptions((prev) => [...prev, "users"]);
    }
  };

  const handlePageToggle = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
    if (!contextOptions.includes("pages")) {
      setContextOptions((prev) => [...prev, "pages"]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const handleRemovePage = (pageId: string) => {
    setSelectedPages((prev) => prev.filter((id) => id !== pageId));
  };

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim()) return;
      console.log("Submitted:", {
        input,
        model,
        agentMode,
        contextOptions,
        webSearchEnabled,
        thinkingEnabled,
        selectedUsers,
        selectedPages,
      });
      setInput("");
    },
    [
      input,
      model,
      agentMode,
      contextOptions,
      webSearchEnabled,
      thinkingEnabled,
      selectedUsers,
      selectedPages,
    ]
  );

  return (
    <TooltipProvider>
      <div className="flex w-full max-w-2xl flex-col items-center gap-2">
        <Card className="w-full rounded-none p-0">
          <CardContent className="p-0">
            <form
              aria-label="AI chat input"
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full items-start justify-between p-4 pb-0">
                <ContextSelector
                  onPageToggle={handlePageToggle}
                  onRemovePage={handleRemovePage}
                  onRemoveUser={handleRemoveUser}
                  onUserToggle={handleUserToggle}
                  selectedPages={selectedPages}
                  selectedUsers={selectedUsers}
                />
              </div>

              <Textarea
                className="resize-none border-none p-4 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder="Type your message…"
                rows={4}
                value={input}
              />

              <div className="flex w-full items-center justify-between gap-2 p-4">
                <div className="flex items-center justify-center gap-1">
                  <LeftActionButtons
                    onThinkingToggle={setThinkingEnabled}
                    onWebSearchToggle={setWebSearchEnabled}
                    thinkingEnabled={thinkingEnabled}
                    webSearchEnabled={webSearchEnabled}
                  />
                  <div className="hidden sm:block">
                    <AgentModeSelect
                      onValueChange={setAgentMode}
                      value={agentMode}
                    />
                  </div>
                </div>
                <RightActionButtons input={input} />
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex w-full items-center justify-between gap-2">
          <ModelSelect onValueChange={setModel} value={model} />
          <div className="sm:hidden">
            <AgentModeSelect onValueChange={setAgentMode} value={agentMode} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
