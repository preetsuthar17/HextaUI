"use client";

import {
  Code,
  FileText,
  Lightbulb,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
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

export default function AISuggestedPrompts({
  prompts = [],
  categories = defaultCategories,
  onSelect,
  onSearch,
  className,
  showSearch = true,
  showCategories = true,
  maxDisplay,
}: AISuggestedPromptsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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

  const handleSelect = (prompt: SuggestedPrompt) => {
    onSelect?.(prompt);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  if (prompts.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle>Suggested Prompts</CardTitle>
            <CardDescription>
              Get started with these helpful prompts
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Lightbulb className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No prompts available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-xs", className)}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle>Suggested Prompts</CardTitle>
            <CardDescription>
              Get started with these helpful prompts
            </CardDescription>
          </div>
          {showSearch && (
            <InputGroup>
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search prompts…"
                type="search"
                value={searchQuery}
              />
              {searchQuery && (
                <Button
                  aria-label="Clear search"
                  className="-translate-y-1/2 absolute top-1/2 right-2"
                  onClick={() => handleSearchChange("")}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X className="size-4" />
                </Button>
              )}
            </InputGroup>
          )}
          {showCategories && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <Button
                    className={cn(
                      "h-auto gap-2 px-3 py-1.5",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    type="button"
                    variant="ghost"
                  >
                    {Icon && <Icon className="size-3.5" />}
                    <span className="text-xs">{category}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filteredPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <p className="text-muted-foreground text-sm">
              No prompts match your search
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredPrompts.map((prompt, idx) => {
              const Icon =
                prompt.icon || categoryIcons[prompt.category] || Lightbulb;

              return (
                <button
                  aria-label={`Use prompt: ${prompt.title}`}
                  className="group flex flex-col gap-2 rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary hover:bg-primary/5"
                  key={prompt.id}
                  onClick={() => handleSelect(prompt)}
                  type="button"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="wrap-break-word font-medium text-sm">
                          {prompt.title}
                        </h3>
                        {prompt.isPopular && (
                          <Badge className="shrink-0 text-xs" variant="default">
                            Popular
                          </Badge>
                        )}
                        {prompt.isRecent && (
                          <Badge
                            className="shrink-0 text-xs"
                            variant="secondary"
                          >
                            Recent
                          </Badge>
                        )}
                      </div>
                      {prompt.description && (
                        <p className="wrap-break-word line-clamp-2 text-muted-foreground text-xs">
                          {prompt.description}
                        </p>
                      )}
                      {prompt.usageCount !== undefined && (
                        <p className="text-muted-foreground text-xs">
                          Used {prompt.usageCount} time
                          {prompt.usageCount !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  {prompt.prompt && (
                    <>
                      <Separator className="my-1" />
                      <p className="wrap-break-word line-clamp-2 text-muted-foreground text-xs italic">
                        &quot;{prompt.prompt}&quot;
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
