"use client";

import {
  Check,
  ChevronDown,
  Gauge,
  Image as ImageIcon,
  Rocket,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import {
  CommandMenu,
  CommandMenuContent,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
  CommandMenuTrigger,
  useCommandMenu,
  useCommandMenuShortcut,
} from "@/registry/new-york/ui/command-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

export type AIProvider = "openai" | "anthropic" | "google" | "meta" | "mistral";

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  description?: string;
  features?: ModelFeature[];
  isNew?: boolean;
  isPreview?: boolean;
}

export type ModelFeature =
  | "fast"
  | "turbo"
  | "reasoning"
  | "multimodal"
  | "long-context";

interface ProviderConfig {
  name: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const PROVIDER_CONFIGS: Record<AIProvider, ProviderConfig> = {
  openai: {
    name: "OpenAI",
    ariaLabel: "OpenAI provider",
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M196.4 185.8v-48.6c0-4.1 1.5-7.2 5.1-9.2l97.8-56.3c13.3-7.7 29.2-11.3 45.6-11.3c61.4 0 100.4 47.6 100.4 98.3c0 3.6 0 7.7-.5 11.8l-101.5-59.4c-6.1-3.6-12.3-3.6-18.4 0zm228.3 189.4V259c0-7.2-3.1-12.3-9.2-15.9L287 168.4l42-24.1c3.6-2 6.7-2 10.2 0l97.8 56.4c28.2 16.4 47.1 51.2 47.1 85c0 38.9-23 74.8-59.4 89.6zM166.2 272.8l-42-24.6c-3.6-2-5.1-5.1-5.1-9.2V126.4c0-54.8 42-96.3 98.8-96.3c21.5 0 41.5 7.2 58.4 20l-100.9 58.4c-6.1 3.6-9.2 8.7-9.2 15.9v148.5zm90.4 52.2l-60.2-33.8v-71.7l60.2-33.8l60.2 33.8v71.7zm38.7 155.7c-21.5 0-41.5-7.2-58.4-20l100.9-58.4c6.1-3.6 9.2-8.7 9.2-15.9V237.9l42.5 24.6c3.6 2 5.1 5.1 5.1 9.2v112.6c0 54.8-42.5 96.3-99.3 96.3zM173.8 366.5l-97.7-56.3C47.9 293.8 29 259 29 225.2c0-39.4 23.6-74.8 59.9-89.6v116.7c0 7.2 3.1 12.3 9.2 15.9l128 74.2l-42 24.1c-3.6 2-6.7 2-10.2 0zm-5.6 84c-57.9 0-100.4-43.5-100.4-97.3c0-4.1.5-8.2 1-12.3l100.9 58.4c6.1 3.6 12.3 3.6 18.4 0l128.5-74.2v48.6c0 4.1-1.5 7.2-5.1 9.2l-97.8 56.3c-13.3 7.7-29.2 11.3-45.6 11.3zm127 60.9c62 0 113.7-44 125.4-102.4c57.3-14.9 94.2-68.6 94.2-123.4c0-35.8-15.4-70.7-43-95.7c2.6-10.8 4.1-21.5 4.1-32.3c0-73.2-59.4-128-128-128c-13.8 0-27.1 2-40.4 6.7c-23-22.5-54.8-36.9-89.6-36.9c-62 0-113.7 44-125.4 102.4c-57.3 14.8-94.2 68.6-94.2 123.4c0 35.8 15.4 70.7 43 95.7c-2.6 10.8-4.1 21.5-4.1 32.3c0 73.2 59.4 128 128 128c13.8 0 27.1-2 40.4-6.7c23 22.5 54.8 36.9 89.6 36.9"
          fill="currentColor"
        />
      </svg>
    ),
  },
  anthropic: {
    name: "Anthropic",
    ariaLabel: "Anthropic provider",
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.765 5h-3.308l5.923 15h3.23zM7.226 5L1.38 20h3.308l1.307-3.154h6.154l1.23 3.077h3.309L10.688 5zm-.308 9.077l2-5.308l2.077 5.308z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  google: {
    name: "Google",
    ariaLabel: "Google provider",
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1-1.265.06a6 6 0 1 0 2.103 6.836l.001-.004h-3.66a1 1 0 0 1-.992-.883L13 13v-2a1 1 0 0 1 1-1h6.945a1 1 0 0 1 .994.89q.06.55.061 1.11c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
          fill="currentColor"
        />
      </svg>
    ),
  },
  meta: {
    name: "Meta",
    ariaLabel: "Meta provider",
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 10.174Q14.649 5.999 16.648 6c2 0 3.263 2.213 4 5.217c.704 2.869.5 6.783-2 6.783c-1.114 0-2.648-1.565-4.148-3.652a27.6 27.6 0 0 1-2.5-4.174m0 0Q9.351 5.999 7.352 6c-2 0-3.263 2.213-4 5.217c-.704 2.869-.5 6.783 2 6.783C6.466 18 8 16.435 9.5 14.348q1.5-2.087 2.5-4.174"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  mistral: {
    name: "Mistral",
    ariaLabel: "Mistral provider",
    icon: (
      <svg
        aria-hidden="true"
        className="size-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.143 3.429v3.428h-3.429v3.429h-3.428V6.857H6.857V3.43H3.43v13.714H0v3.428h10.286v-3.428H6.857v-3.429h3.429v3.429h3.429v-3.429h3.428v3.429h-3.428v3.428H24v-3.428h-3.43V3.429z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};

const FEATURE_ICONS: Record<ModelFeature, React.ReactNode> = {
  fast: <Zap aria-hidden="true" className="size-3" />,
  turbo: <Rocket aria-hidden="true" className="size-3" />,
  reasoning: <Sparkles aria-hidden="true" className="size-3" />,
  multimodal: <ImageIcon aria-hidden="true" className="size-3" />,
  "long-context": <Gauge aria-hidden="true" className="size-3" />,
};

const FEATURE_LABELS: Record<ModelFeature, string> = {
  fast: "Fast",
  turbo: "Turbo",
  reasoning: "Reasoning",
  multimodal: "Multimodal",
  "long-context": "Long context",
};

const DEFAULT_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Most capable model",
    features: ["fast", "multimodal", "long-context"],
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    description: "Fast and affordable",
    features: ["fast"],
  },
  {
    id: "gpt-4o-2024-11-20",
    name: "GPT-4o (2024-11-20)",
    provider: "openai",
    description: "Latest GPT-4o snapshot",
    features: ["fast", "multimodal", "long-context"],
  },
  {
    id: "o1",
    name: "o1",
    provider: "openai",
    description: "Advanced reasoning",
    features: ["reasoning"],
  },
  {
    id: "o1-preview",
    name: "o1 Preview",
    provider: "openai",
    description: "Advanced reasoning preview",
    features: ["reasoning"],
    isPreview: true,
  },
  {
    id: "o1-mini",
    name: "o1 Mini",
    provider: "openai",
    description: "Fast reasoning",
    features: ["fast", "reasoning"],
  },
  {
    id: "o1-mini-preview",
    name: "o1 Mini Preview",
    provider: "openai",
    description: "Fast reasoning preview",
    features: ["fast", "reasoning"],
    isPreview: true,
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    description: "High performance model",
    features: ["turbo", "multimodal", "long-context"],
  },
  {
    id: "gpt-4-turbo-preview",
    name: "GPT-4 Turbo Preview",
    provider: "openai",
    description: "Latest GPT-4 Turbo",
    features: ["turbo", "multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "openai",
    description: "Original GPT-4 model",
    features: ["multimodal", "long-context"],
  },
  {
    id: "gpt-4-32k",
    name: "GPT-4 32K",
    provider: "openai",
    description: "GPT-4 with extended context",
    features: ["long-context"],
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and efficient",
    features: ["turbo"],
  },
  {
    id: "gpt-3.5-turbo-16k",
    name: "GPT-3.5 Turbo 16K",
    provider: "openai",
    description: "GPT-3.5 with extended context",
    features: ["turbo", "long-context"],
  },
  {
    id: "claude-4-opus",
    name: "Claude 4 Opus",
    provider: "anthropic",
    description: "Most capable model",
    features: ["reasoning", "multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "claude-4-sonnet",
    name: "Claude 4 Sonnet",
    provider: "anthropic",
    description: "Balanced performance",
    features: ["fast", "multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Fast and intelligent",
    features: ["fast", "multimodal"],
  },
  {
    id: "claude-3.5-sonnet-20241022",
    name: "Claude 3.5 Sonnet (2024-10-22)",
    provider: "anthropic",
    description: "Latest Claude 3.5 Sonnet",
    features: ["fast", "multimodal"],
  },
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    description: "Fastest Claude model",
    features: ["fast", "multimodal"],
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    description: "Most powerful model",
    features: ["reasoning", "multimodal", "long-context"],
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    description: "Balanced Claude 3",
    features: ["multimodal", "long-context"],
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    description: "Fast and cost-effective",
    features: ["fast", "multimodal"],
  },
  {
    id: "claude-3-5-sonnet-20240620",
    name: "Claude 3.5 Sonnet (2024-06-20)",
    provider: "anthropic",
    description: "Claude 3.5 Sonnet snapshot",
    features: ["fast", "multimodal"],
  },
  {
    id: "gemini-2.0-pro",
    name: "Gemini 2.0 Pro",
    provider: "google",
    description: "Advanced capabilities",
    features: ["multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    provider: "google",
    description: "Fast Gemini 2.0",
    features: ["fast", "multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google",
    description: "Multimodal model",
    features: ["multimodal", "long-context"],
  },
  {
    id: "gemini-1.5-pro-latest",
    name: "Gemini 1.5 Pro Latest",
    provider: "google",
    description: "Latest Gemini 1.5 Pro",
    features: ["multimodal", "long-context"],
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "google",
    description: "Fast and efficient",
    features: ["fast", "multimodal", "long-context"],
  },
  {
    id: "gemini-1.5-flash-8b",
    name: "Gemini 1.5 Flash 8B",
    provider: "google",
    description: "Lightweight Flash model",
    features: ["fast", "multimodal"],
  },
  {
    id: "gemini-1.0-pro",
    name: "Gemini 1.0 Pro",
    provider: "google",
    description: "Original Gemini Pro",
    features: ["multimodal"],
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    provider: "google",
    description: "Most capable model",
    features: ["reasoning", "multimodal", "long-context"],
    isPreview: true,
  },
  {
    id: "llama-3.1-405b",
    name: "Llama 3.1 405B",
    provider: "meta",
    description: "Open source model",
    features: ["long-context"],
  },
  {
    id: "llama-3.1-70b",
    name: "Llama 3.1 70B",
    provider: "meta",
    description: "Balanced performance",
    features: ["fast", "long-context"],
  },
  {
    id: "llama-3.1-8b",
    name: "Llama 3.1 8B",
    provider: "meta",
    description: "Lightweight model",
    features: ["fast"],
  },
  {
    id: "llama-3.2",
    name: "Llama 3.2",
    provider: "meta",
    description: "Latest open source",
    features: ["fast"],
    isNew: true,
  },
  {
    id: "llama-3.2-3b",
    name: "Llama 3.2 3B",
    provider: "meta",
    description: "Ultra-lightweight",
    features: ["fast"],
    isNew: true,
  },
  {
    id: "llama-3.2-1b",
    name: "Llama 3.2 1B",
    provider: "meta",
    description: "Smallest Llama model",
    features: ["fast"],
    isNew: true,
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "meta",
    description: "Llama 3 base model",
    features: ["fast"],
  },
  {
    id: "llama-3-8b",
    name: "Llama 3 8B",
    provider: "meta",
    description: "Llama 3 lightweight",
    features: ["fast"],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    description: "High performance",
    features: ["fast", "long-context"],
  },
  {
    id: "mistral-large-2407",
    name: "Mistral Large 2407",
    provider: "mistral",
    description: "Mistral Large snapshot",
    features: ["fast", "long-context"],
  },
  {
    id: "mistral-large-2402",
    name: "Mistral Large 2402",
    provider: "mistral",
    description: "Mistral Large snapshot",
    features: ["fast", "long-context"],
  },
  {
    id: "mistral-medium",
    name: "Mistral Medium",
    provider: "mistral",
    description: "Balanced capabilities",
    features: ["fast"],
  },
  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "mistral",
    description: "Fast and efficient",
    features: ["fast"],
  },
  {
    id: "mistral-small-2402",
    name: "Mistral Small 2402",
    provider: "mistral",
    description: "Mistral Small snapshot",
    features: ["fast"],
  },
  {
    id: "mistral-tiny",
    name: "Mistral Tiny",
    provider: "mistral",
    description: "Ultra-fast model",
    features: ["fast"],
  },
  {
    id: "pixtral-large",
    name: "Pixtral Large",
    provider: "mistral",
    description: "Multimodal vision model",
    features: ["multimodal", "long-context"],
    isNew: true,
  },
  {
    id: "pixtral-12b",
    name: "Pixtral 12B",
    provider: "mistral",
    description: "Efficient vision model",
    features: ["fast", "multimodal"],
    isNew: true,
  },
];

export interface AIModelSelectorProps {
  models?: AIModel[];
  selectedModelId?: string;
  onModelSelect?: (model: AIModel) => void;
  trigger?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

interface ModelFeatureBadgeProps {
  feature: ModelFeature;
}

function ModelFeatureBadge({ feature }: ModelFeatureBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          aria-label={FEATURE_LABELS[feature]}
          className="flex min-h-[32px] min-w-[32px] cursor-help items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          role="button"
          tabIndex={0}
        >
          {FEATURE_ICONS[feature]}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{FEATURE_LABELS[feature]}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface ModelBadgeProps {
  label: string;
  variant: "new" | "preview";
}

function ModelBadge({ label, variant }: ModelBadgeProps) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-1.5 py-0.5 font-medium text-xs tabular-nums",
        variant === "new" &&
          "bg-primary/10 text-primary ring-1 ring-primary/20",
        variant === "preview" && "bg-muted text-muted-foreground"
      )}
    >
      {label}
    </span>
  );
}

interface ModelItemProps {
  model: AIModel;
  isSelected: boolean;
  index: number;
  onSelect: () => void;
}

function ModelItem({ model, isSelected, index, onSelect }: ModelItemProps) {
  return (
    <CommandMenuItem index={index} onSelect={onSelect}>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm tabular-nums">
              {model.name}
            </span>
            {model.isNew && <ModelBadge label="New" variant="new" />}
            {model.isPreview && (
              <ModelBadge label="Preview" variant="preview" />
            )}
          </div>
          {model.description && (
            <span className="text-muted-foreground text-xs">
              {model.description}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {model.features?.map((feature) => (
            <ModelFeatureBadge feature={feature} key={feature} />
          ))}
          {isSelected && (
            <Check
              aria-label="Selected"
              className="size-4 text-primary"
              role="status"
            />
          )}
        </div>
      </div>
    </CommandMenuItem>
  );
}

interface ProviderGroupHeaderProps {
  provider: AIProvider;
}

function ProviderGroupHeader({ provider }: ProviderGroupHeaderProps) {
  const config = PROVIDER_CONFIGS[provider];
  return (
    <div
      aria-label={`${config.name} models`}
      className="flex items-center gap-2 px-2 py-1.5"
      role="group"
    >
      <div
        aria-hidden="true"
        className="flex size-4 items-center justify-center text-muted-foreground"
      >
        {config.icon}
      </div>
      <span className="font-semibold text-muted-foreground text-xs uppercase tabular-nums tracking-tight">
        {config.name}
      </span>
    </div>
  );
}

interface EmptyStateProps {
  searchQuery: string;
}

function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search aria-hidden="true" className="size-6" />
        </EmptyMedia>
        <EmptyTitle>
          {searchQuery ? "No models found" : "No models available"}
        </EmptyTitle>
        <EmptyDescription>
          {searchQuery
            ? `No models match "${searchQuery}". Try a different search term.`
            : "There are no AI models available at this time."}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface ModelListProps {
  models: AIModel[];
  selectedModelId?: string;
  onSelect: (model: AIModel) => void;
  isLoading: boolean;
}

function ModelList({
  models,
  selectedModelId,
  onSelect,
  isLoading,
}: ModelListProps) {
  const { value: searchValue } = useCommandMenu();

  const filteredModels = useMemo(() => {
    if (!searchValue.trim()) return models;

    const query = searchValue.toLowerCase().trim();
    return models.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.description?.toLowerCase().includes(query) ||
        PROVIDER_CONFIGS[model.provider].name.toLowerCase().includes(query) ||
        model.features?.some((feature) =>
          FEATURE_LABELS[feature].toLowerCase().includes(query)
        )
    );
  }, [models, searchValue]);

  const groupedModels = useMemo(() => {
    const groups: Record<AIProvider, AIModel[]> = {
      openai: [],
      anthropic: [],
      google: [],
      meta: [],
      mistral: [],
    };

    filteredModels.forEach((model) => {
      if (groups[model.provider]) {
        groups[model.provider].push(model);
      }
    });

    return Object.entries(groups).filter(
      ([, providerModels]) => providerModels.length > 0
    ) as [AIProvider, AIModel[]][];
  }, [filteredModels]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground text-sm">
        <span>Loading models…</span>
      </div>
    );
  }

  if (groupedModels.length === 0) {
    return <EmptyState searchQuery={searchValue} />;
  }

  return (
    <>
      {groupedModels.map(([provider, providerModels], groupIndex) => {
        const globalStartIndex = filteredModels.findIndex(
          (m) => m.provider === provider
        );
        return (
          <div key={provider} role="list">
            {groupIndex > 0 && <CommandMenuSeparator />}
            <ProviderGroupHeader provider={provider} />
            {providerModels.map((model, modelIndex) => {
              const globalIndex = globalStartIndex + modelIndex;
              return (
                <ModelItem
                  index={globalIndex}
                  isSelected={model.id === selectedModelId}
                  key={model.id}
                  model={model}
                  onSelect={() => onSelect(model)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

interface DefaultTriggerProps {
  selectedModel: AIModel | undefined;
  className?: string;
  onClick?: () => void;
}

function DefaultTrigger({
  selectedModel,
  className,
  onClick,
}: DefaultTriggerProps) {
  return (
    <Button
      aria-label={
        selectedModel
          ? `Selected model: ${selectedModel.name}. Click to change model.`
          : "Select AI model"
      }
      className={cn("min-h-[32px] gap-2", className)}
      onClick={onClick}
      type="button"
      variant="outline"
    >
      {selectedModel ? (
        <>
          <div
            aria-hidden="true"
            className="flex size-4 items-center justify-center text-muted-foreground"
          >
            {PROVIDER_CONFIGS[selectedModel.provider].icon}
          </div>
          <span className="tabular-nums">{selectedModel.name}</span>
        </>
      ) : (
        <span>Select model</span>
      )}
      <ChevronDown
        aria-hidden="true"
        className="size-4 text-muted-foreground"
      />
    </Button>
  );
}

export default function AIModelSelector({
  models = DEFAULT_MODELS,
  selectedModelId,
  onModelSelect,
  trigger,
  className,
  isLoading = false,
}: AIModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useCommandMenuShortcut(
    useCallback(() => {
      setOpen((prev) => !prev);
    }, [])
  );

  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const selectedModel = useMemo(
    () => models.find((m) => m.id === selectedModelId),
    [models, selectedModelId]
  );

  const handleSelect = useCallback(
    (model: AIModel) => {
      onModelSelect?.(model);
      setOpen(false);
    },
    [onModelSelect]
  );

  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
  }, []);

  const handleTriggerClick = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <TooltipProvider>
      <CommandMenu onOpenChange={handleOpenChange} open={open}>
        {trigger ? (
          <CommandMenuTrigger asChild>{trigger}</CommandMenuTrigger>
        ) : (
          <CommandMenuTrigger asChild>
            <DefaultTrigger
              className={className}
              onClick={handleTriggerClick}
              selectedModel={selectedModel}
            />
          </CommandMenuTrigger>
        )}

        <CommandMenuContent
          aria-label="AI model selector"
          className="max-w-2xl"
          showShortcut={false}
        >
          <CommandMenuInput
            aria-label="Search AI models"
            disabled={isLoading}
            placeholder="Search models…"
            ref={searchInputRef}
          />
          <CommandMenuList maxHeight="400px">
            <ModelList
              isLoading={isLoading}
              models={models}
              onSelect={handleSelect}
              selectedModelId={selectedModelId}
            />
          </CommandMenuList>
        </CommandMenuContent>
      </CommandMenu>
    </TooltipProvider>
  );
}
