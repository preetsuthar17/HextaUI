"use client";

import {
  Code,
  FileText,
  Lightbulb,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york/ui/badge";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface SuggestedPrompt {
  id: string;
  title: string;
  prompt: string;
  category: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  isRecent?: boolean;
  isPopular?: boolean;
  usageCount?: number;
}

export interface AISuggestedPromptsProps {
  prompts?: SuggestedPrompt[];
  categories?: string[];
  onSelect?: (prompt: SuggestedPrompt) => void;
  onSearch?: (query: string) => void;
  className?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  maxDisplay?: number;
  isLoading?: boolean;
}

const defaultCategories = [
  "All",
  "Writing",
  "Code",
  "Analysis",
  "Creative",
  "Research",
];

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Writing: FileText,
  Code,
  Analysis: TrendingUp,
  Creative: Sparkles,
  Research: Lightbulb,
};

interface ComponentHeaderProps {
  title: string;
  description: string;
}

function ComponentHeader({ title, description }: ComponentHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </div>
  );
}

interface PromptSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

function PromptSearch({
  value,
  onChange,
  placeholder = "Search prompts…",
  resultCount,
}: PromptSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k" &&
        !e.shiftKey &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className="relative">
      <InputGroup>
        <InputGroupAddon>
          <Search aria-hidden="true" className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search prompts"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClear();
            }
          }}
          placeholder={placeholder}
          ref={inputRef}
          type="search"
          value={value}
        />
      </InputGroup>
      {resultCount !== undefined && value && (
        <div aria-live="polite" className="sr-only" role="status">
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </div>
      )}
    </div>
  );
}

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div
      aria-label="Filter prompts by category"
      className="flex flex-wrap gap-2"
      role="tablist"
    >
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const isSelected = selectedCategory === category;
        return (
          <Button
            aria-label={`Filter by ${category}`}
            aria-pressed={isSelected}
            aria-selected={isSelected}
            className={cn(
              "min-h-[32px] gap-2 px-3 py-1.5 sm:h-auto sm:min-h-[10px]",
              isSelected
                ? "border border-border bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            key={category}
            onClick={() => onSelect(category)}
            role="tab"
            type="button"
            variant="ghost"
          >
            {Icon && <Icon aria-hidden="true" className="size-3.5" />}
            <span className="text-xs">{category}</span>
          </Button>
        );
      })}
    </div>
  );
}

interface EmptyStateProps {
  type: "no-prompts" | "no-results";
  searchQuery?: string;
}

function EmptyState({ type, searchQuery }: EmptyStateProps) {
  if (type === "no-prompts") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Lightbulb
            aria-hidden="true"
            className="size-6 text-muted-foreground"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm">No prompts available</p>
          <p className="text-muted-foreground text-sm">
            Prompts will appear here when they become available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Search aria-hidden="true" className="size-6 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium text-sm">No prompts match your search</p>
        <p className="text-muted-foreground text-sm">
          Try adjusting your search terms or browse different categories
        </p>
        {searchQuery && (
          <p className="text-muted-foreground text-xs">
            Searched for: &quot;{searchQuery}&quot;
          </p>
        )}
      </div>
    </div>
  );
}

interface PromptItemProps {
  prompt: SuggestedPrompt;
  isFocused: boolean;
  index: number;
  onSelect: (prompt: SuggestedPrompt) => void;
  itemRef: (node: HTMLButtonElement | null) => void;
}

function PromptItem({
  prompt,
  isFocused,
  index,
  onSelect,
  itemRef,
}: PromptItemProps) {
  const Icon = prompt.icon || categoryIcons[prompt.category] || Lightbulb;

  const handleSelect = useCallback(() => {
    onSelect(prompt);
  }, [onSelect, prompt]);

  return (
    <button
      aria-label={`Use prompt: ${prompt.title}`}
      className={cn(
        "group flex min-h-[44px] flex-col gap-2 rounded-lg border bg-card p-4 text-left transition-colors",
        "hover:border-primary hover:bg-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isFocused && "border-primary bg-primary/5"
      )}
      data-prompt-index={index}
      onClick={handleSelect}
      ref={itemRef}
      type="button"
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
        >
          <Icon className="size-4" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-medium text-sm">{prompt.title}</h3>
            <div className="flex shrink-0 gap-1">
              {prompt.isPopular && (
                <Badge className="text-xs" variant="default">
                  Popular
                </Badge>
              )}
              {prompt.isRecent && (
                <Badge className="text-xs" variant="secondary">
                  Recent
                </Badge>
              )}
            </div>
          </div>
          {prompt.description && (
            <p className="line-clamp-2 text-muted-foreground text-xs">
              {prompt.description}
            </p>
          )}
          {prompt.usageCount !== undefined && (
            <p className="text-muted-foreground text-xs">
              Used {prompt.usageCount} time{prompt.usageCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
      {prompt.prompt && (
        <>
          <Separator className="my-1" />
          <p className="line-clamp-2 text-muted-foreground text-xs italic">
            &quot;{prompt.prompt}&quot;
          </p>
        </>
      )}
    </button>
  );
}

interface PromptListProps {
  prompts: SuggestedPrompt[];
  focusedIndex: number | null;
  onSelect: (prompt: SuggestedPrompt) => void;
  setFocusedIndex: (index: number | null) => void;
}

function PromptList({
  prompts,
  focusedIndex,
  onSelect,
  setFocusedIndex,
}: PromptListProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const setItemRef = useCallback(
    (index: number) => (node: HTMLButtonElement | null) => {
      itemRefs.current[index] = node;
    },
    []
  );

  useEffect(() => {
    if (focusedIndex !== null && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement
      ) {
        if (target.type === "button" && target.closest('[role="tablist"]')) {
          return;
        }
        if (target.type === "search" || target.type === "text") {
          return;
        }
      }

      if (prompts.length === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex =
            focusedIndex === null
              ? 0
              : focusedIndex < prompts.length - 1
                ? focusedIndex + 1
                : 0;
          setFocusedIndex(nextIndex);
          itemRefs.current[nextIndex]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prevIndex =
            focusedIndex === null
              ? prompts.length - 1
              : focusedIndex > 0
                ? focusedIndex - 1
                : prompts.length - 1;
          setFocusedIndex(prevIndex);
          itemRefs.current[prevIndex]?.focus();
          break;
        }
        case "Home": {
          e.preventDefault();
          setFocusedIndex(0);
          itemRefs.current[0]?.focus();
          break;
        }
        case "End": {
          e.preventDefault();
          const lastIndex = prompts.length - 1;
          setFocusedIndex(lastIndex);
          itemRefs.current[lastIndex]?.focus();
          break;
        }
        case "Escape": {
          if (focusedIndex !== null) {
            e.preventDefault();
            setFocusedIndex(null);
            containerRef.current?.focus();
          }
          break;
        }
        case "Enter": {
          if (focusedIndex !== null && itemRefs.current[focusedIndex]) {
            e.preventDefault();
            onSelect(prompts[focusedIndex]);
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prompts, focusedIndex, setFocusedIndex, onSelect]);

  return (
    <div
      aria-label="Suggested prompts list"
      className="grid gap-3"
      ref={containerRef}
      role="list"
      tabIndex={-1}
    >
      {prompts.map((prompt, index) => (
        <PromptItem
          index={index}
          isFocused={focusedIndex === index}
          itemRef={setItemRef(index)}
          key={prompt.id}
          onSelect={onSelect}
          prompt={prompt}
        />
      ))}
    </div>
  );
}

export default function AISuggestedPrompts({
  prompts = [],
  categories = defaultCategories,
  onSelect,
  onSearch,
  className,
  showSearch = true,
  showCategories = true,
  maxDisplay,
  isLoading = false,
}: AISuggestedPromptsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.prompt.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      if (a.isRecent && !b.isRecent) return -1;
      if (!a.isRecent && b.isRecent) return 1;
      return 0;
    });

    return maxDisplay ? sorted.slice(0, maxDisplay) : sorted;
  }, [prompts, selectedCategory, searchQuery, maxDisplay]);

  const handleSelect = useCallback(
    (prompt: SuggestedPrompt) => {
      onSelect?.(prompt);
      setFocusedIndex(null);
    },
    [onSelect]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      onSearch?.(value);
      setFocusedIndex(null);
    },
    [onSearch]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setFocusedIndex(null);
  }, []);

  if (prompts.length === 0 && !isLoading) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <ComponentHeader
            description="Get started with these helpful prompts"
            title="Suggested Prompts"
          />
        </CardHeader>
        <CardContent>
          <EmptyState type="no-prompts" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <ComponentHeader
            description="Get started with these helpful prompts"
            title="Suggested Prompts"
          />
          {showSearch && (
            <PromptSearch
              onChange={handleSearchChange}
              placeholder="Search prompts…"
              resultCount={filteredPrompts.length}
              value={searchQuery}
            />
          )}
          {showCategories && (
            <CategoryFilter
              categories={categories}
              onSelect={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Lightbulb
                aria-hidden="true"
                className="size-6 animate-pulse text-muted-foreground"
              />
            </div>
            <p className="text-muted-foreground text-sm">Loading prompts…</p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <EmptyState searchQuery={searchQuery} type="no-results" />
        ) : (
          <PromptList
            focusedIndex={focusedIndex}
            onSelect={handleSelect}
            prompts={filteredPrompts}
            setFocusedIndex={setFocusedIndex}
          />
        )}
      </CardContent>
    </Card>
  );
}
