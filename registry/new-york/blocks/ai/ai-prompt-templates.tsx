"use client";

import {
  BookOpen,
  Eye,
  Heart,
  Loader2,
  Plus,
  Search,
  Sparkles,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/registry/new-york/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/new-york/ui/input-group";
import { Separator } from "@/registry/new-york/ui/separator";

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  variables?: Array<{
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  }>;
  isFavorite?: boolean;
  isPopular?: boolean;
  usageCount?: number;
  author?: string;
  tags?: string[];
  icon?: React.ComponentType<{ className?: string }>;
}

export interface AIPromptTemplatesProps {
  templates?: PromptTemplate[];
  categories?: string[];
  onSelect?: (
    template: PromptTemplate,
    filledVariables?: Record<string, string>
  ) => void;
  onFavorite?: (templateId: string, isFavorite: boolean) => Promise<void>;
  onCreate?: () => void;
  className?: string;
  showSearch?: boolean;
  showCategories?: boolean;
  showFavorites?: boolean;
}

const defaultCategories = [
  "All",
  "Writing",
  "Code",
  "Analysis",
  "Creative",
  "Research",
  "Business",
];

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Writing: BookOpen,
  Code: Sparkles,
  Analysis: Sparkles,
  Creative: Sparkles,
  Research: BookOpen,
  Business: Sparkles,
};

function fillTemplatePrompt(
  prompt: string,
  variables: Record<string, string>
): string {
  let filled = prompt;
  Object.entries(variables).forEach(([key, value]) => {
    filled = filled.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  });
  return filled;
}

interface TemplateHeaderProps {
  onCreate?: () => void;
}

function TemplateHeader({ onCreate }: TemplateHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <CardTitle>Prompt Templates</CardTitle>
        <CardDescription>
          Browse and use pre-built prompt templates
        </CardDescription>
      </div>
      {onCreate && (
        <Button
          className="min-h-[44px] w-full min-w-[32px] sm:min-h-[32px] sm:w-auto"
          onClick={onCreate}
          type="button"
        >
          <Plus className="size-4" />
          Create Template
        </Button>
      )}
    </div>
  );
}

interface TemplateSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

function TemplateSearch({ value, onChange, resultCount }: TemplateSearchProps) {
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        onChange("");
        inputRef.current?.blur();
      }
    },
    [onChange]
  );

  return (
    <div className="relative">
      <InputGroup>
        <InputGroupAddon>
          <Search aria-hidden="true" className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Search templates"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search templates…"
          ref={inputRef}
          type="search"
          value={value}
        />
      </InputGroup>
      {value && resultCount !== undefined && (
        <p className="mt-2 text-muted-foreground text-xs" role="status">
          {resultCount} {resultCount === 1 ? "result" : "results"} found
        </p>
      )}
    </div>
  );
}

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFavorites: boolean;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
}

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  showFavorites,
  showFavoritesOnly,
  onToggleFavorites,
}: CategoryFilterProps) {
  return (
    <div
      aria-label="Filter templates by category"
      className="flex flex-wrap items-center gap-2"
      role="tablist"
    >
      {showFavorites && (
        <Button
          aria-label={
            showFavoritesOnly ? "Show all templates" : "Show favorites only"
          }
          aria-pressed={showFavoritesOnly}
          className={cn(
            "min-h-[32px] gap-2 px-3 py-1.5 sm:h-auto sm:min-h-[10px]",
            showFavoritesOnly
              ? "border border-border bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
          onClick={onToggleFavorites}
          role="tab"
          type="button"
          variant="ghost"
        >
          <Heart aria-hidden="true" className="size-3.5" />
          <span className="text-xs">Favorites</span>
        </Button>
      )}
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Sparkles;
        const isSelected = selectedCategory === category;
        return (
          <Button
            aria-label={`Filter by ${category} category`}
            aria-pressed={isSelected}
            className={cn(
              "min-h-[32px] gap-2 px-3 py-1.5 sm:h-auto sm:min-h-[10px]",
              isSelected
                ? "border border-border bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            key={category}
            onClick={() => onCategoryChange(category)}
            role="tab"
            type="button"
            variant="ghost"
          >
            {category !== "All" && (
              <Icon aria-hidden="true" className="size-3.5" />
            )}
            <span className="text-xs">{category}</span>
          </Button>
        );
      })}
    </div>
  );
}

interface EmptyStateProps {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}

function EmptyState({
  message,
  icon: Icon = BookOpen,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon aria-hidden="true" className="size-6 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground text-sm">{message}</p>
      {action}
    </div>
  );
}

interface TemplateCardProps {
  template: PromptTemplate;
  onSelect: (template: PromptTemplate) => void;
  onFavorite?: (templateId: string, isFavorite: boolean) => Promise<void>;
  isFavoriting: boolean;
  optimisticFavorite?: boolean;
  index: number;
  isFocused: boolean;
  onFocus: () => void;
}

function TemplateCard({
  template,
  onSelect,
  onFavorite,
  isFavoriting,
  optimisticFavorite,
  index,
  isFocused,
  onFocus,
}: TemplateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = template.icon || categoryIcons[template.category] || Sparkles;
  const hasVariables = template.variables && template.variables.length > 0;
  const isFavorite = optimisticFavorite ?? template.isFavorite ?? false;

  useEffect(() => {
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isFocused]);

  const handleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onFavorite) return;
      await onFavorite(template.id, !isFavorite);
    },
    [onFavorite, template.id, isFavorite]
  );

  const handleSelect = useCallback(() => {
    onSelect(template);
  }, [onSelect, template]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      }
    },
    [handleSelect]
  );

  return (
    <article
      aria-label={`Template: ${template.name}`}
      className={cn(
        "group flex flex-col gap-4 rounded-lg border bg-card p-5 transition-all focus-within:border-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:border-border hover:shadow-sm",
        isFocused && "border-border ring-2 ring-ring ring-offset-2"
      )}
      onKeyDown={handleKeyDown}
      ref={cardRef}
      role="listitem"
      tabIndex={0}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-muted/80">
          <Icon aria-hidden="true" className="size-5" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="wrap-break-word font-semibold text-base leading-tight">
              {template.name}
            </h3>
            <div className="flex shrink-0 items-center gap-1.5">
              {template.isPopular && (
                <Badge
                  aria-label="Popular template"
                  className="text-xs"
                  variant="secondary"
                >
                  Popular
                </Badge>
              )}
              {onFavorite && (
                <button
                  aria-label={`${isFavorite ? "Remove from" : "Add to"} favorites`}
                  className="min-h-[44px] min-w-[32px] rounded-md p-1.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[32px]"
                  disabled={isFavoriting}
                  onClick={handleFavorite}
                  type="button"
                >
                  {isFavoriting ? (
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin text-muted-foreground"
                    />
                  ) : (
                    <Heart
                      aria-hidden="true"
                      className={cn(
                        "size-4 transition-colors",
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
          <p className="wrap-break-word line-clamp-2 text-muted-foreground text-sm">
            {template.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {template.tags && template.tags.length > 0 && (
          <>
            {template.tags.slice(0, 2).map((tag) => (
              <Badge className="text-xs" key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 2 && (
              <span
                aria-label={`${template.tags.length - 2} more tags`}
                className="text-muted-foreground text-xs"
              >
                +{template.tags.length - 2}
              </span>
            )}
          </>
        )}
        {template.usageCount !== undefined && (
          <span className="font-tabular-nums text-muted-foreground text-xs">
            {template.usageCount} {template.usageCount === 1 ? "use" : "uses"}
          </span>
        )}
        {hasVariables && (
          <Badge className="text-xs" variant="secondary">
            {template.variables!.length} variable
            {template.variables!.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          aria-label={`Use template: ${template.name}`}
          className="min-h-[44px] flex-1 sm:min-h-[32px]"
          onClick={handleSelect}
          type="button"
          variant="outline"
        >
          {hasVariables ? "Configure & Use" : "Use Template"}
        </Button>
      </div>
    </article>
  );
}

interface TemplateDialogProps {
  template: PromptTemplate | null;
  variables: Record<string, string>;
  onVariablesChange: (variables: Record<string, string>) => void;
  onClose: () => void;
  onUse: () => void;
  canUse: boolean;
}

function TemplateDialog({
  template,
  variables,
  onVariablesChange,
  onClose,
  onUse,
  canUse,
}: TemplateDialogProps) {
  const [showPreview, setShowPreview] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (template && template.variables && template.variables.length > 0) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [template]);

  if (!template) return null;

  const Icon = template.icon || categoryIcons[template.category] || Sparkles;
  const previewPrompt = fillTemplatePrompt(template.prompt, variables);

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={!!template}>
      <DialogContent
        className="flex flex-col gap-4 p-4 sm:max-w-2xl sm:gap-6 sm:p-6"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="shrink-0">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Icon aria-hidden="true" className="size-5" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2 text-left">
              <DialogTitle className="wrap-break-word">
                {template.name}
              </DialogTitle>
              <DialogDescription className="wrap-break-word">
                {template.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
          {template.variables && template.variables.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-sm">Fill in the details</h3>
              <div className="flex flex-col gap-4">
                {template.variables.map((variable, index) => (
                  <Field key={variable.name}>
                    <FieldLabel htmlFor={`${template.id}-${variable.name}`}>
                      {variable.label}
                      {variable.required && (
                        <span
                          aria-label="required"
                          className="text-destructive"
                        >
                          {" "}
                          *
                        </span>
                      )}
                    </FieldLabel>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput
                          id={`${template.id}-${variable.name}`}
                          onChange={(e) => {
                            onVariablesChange({
                              ...variables,
                              [variable.name]: e.target.value,
                            });
                          }}
                          placeholder={
                            variable.placeholder ||
                            `Enter ${variable.label.toLowerCase()}…`
                          }
                          ref={index === 0 ? firstInputRef : undefined}
                          type="text"
                          value={variables[variable.name] || ""}
                        />
                      </InputGroup>
                    </FieldContent>
                  </Field>
                ))}
              </div>
            </div>
          ) : null}

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Preview</h3>
              <Button
                aria-expanded={showPreview}
                aria-label={showPreview ? "Hide preview" : "Show preview"}
                className="h-auto min-h-[44px] gap-2 px-2 py-1 sm:min-h-[32px]"
                onClick={() => setShowPreview(!showPreview)}
                type="button"
                variant="ghost"
              >
                <Eye aria-hidden="true" className="size-4" />
                <span className="text-xs">
                  {showPreview ? "Hide" : "Show"} Preview
                </span>
              </Button>
            </div>
            {showPreview && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="wrap-break-word whitespace-pre-wrap text-sm">
                  {previewPrompt || template.prompt}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="shrink-0">
          <Button
            className="min-h-[44px] sm:min-h-[32px]"
            onClick={onClose}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            className="min-h-[44px] sm:min-h-[32px]"
            disabled={!canUse}
            onClick={onUse}
            type="button"
          >
            Use Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AIPromptTemplates({
  templates = [],
  categories = defaultCategories,
  onSelect,
  onFavorite,
  onCreate,
  className,
  showSearch = true,
  showCategories = true,
  showFavorites = true,
}: AIPromptTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PromptTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<
    Record<string, string>
  >({});
  const [isFavoriting, setIsFavoriting] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [optimisticFavorites, setOptimisticFavorites] = useState<
    Record<string, boolean>
  >({});

  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    if (showFavoritesOnly) {
      filtered = filtered.filter((t) => {
        const isFavorite = optimisticFavorites[t.id] ?? t.isFavorite ?? false;
        return isFavorite;
      });
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.prompt.toLowerCase().includes(query) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered.sort((a, b) => {
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      const aFavorite = optimisticFavorites[a.id] ?? a.isFavorite ?? false;
      const bFavorite = optimisticFavorites[b.id] ?? b.isFavorite ?? false;
      if (aFavorite && !bFavorite) return -1;
      if (!aFavorite && bFavorite) return 1;
      return (b.usageCount || 0) - (a.usageCount || 0);
    });
  }, [
    templates,
    selectedCategory,
    searchQuery,
    showFavoritesOnly,
    optimisticFavorites,
  ]);

  useEffect(() => {
    if (focusedIndex >= filteredTemplates.length) {
      setFocusedIndex(-1);
    }
  }, [focusedIndex, filteredTemplates.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredTemplates.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTemplates.length - 1
        );
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        const template = filteredTemplates[focusedIndex];
        if (template) {
          handleSelect(template);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredTemplates, focusedIndex]);

  const handleSelect = useCallback(
    (template: PromptTemplate) => {
      if (template.variables && template.variables.length > 0) {
        setSelectedTemplate(template);
        setTemplateVariables({});
      } else {
        onSelect?.(template);
      }
    },
    [onSelect]
  );

  const handleUseTemplate = useCallback(() => {
    if (!selectedTemplate) return;
    onSelect?.(selectedTemplate, templateVariables);
    setSelectedTemplate(null);
    setTemplateVariables({});
  }, [selectedTemplate, templateVariables, onSelect]);

  const handleFavorite = useCallback(
    async (templateId: string, isFavorite: boolean) => {
      if (!onFavorite) return;

      setOptimisticFavorites((prev) => ({
        ...prev,
        [templateId]: isFavorite,
      }));

      setIsFavoriting(templateId);
      try {
        await onFavorite(templateId, isFavorite);
      } catch (error) {
        setOptimisticFavorites((prev) => {
          const next = { ...prev };
          delete next[templateId];
          return next;
        });
      } finally {
        setIsFavoriting(null);
      }
    },
    [onFavorite]
  );

  const canUseTemplate =
    !selectedTemplate?.variables ||
    selectedTemplate.variables.every(
      (v) => !v.required || templateVariables[v.name]
    );

  if (templates.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <TemplateHeader onCreate={onCreate} />
        </CardHeader>
        <CardContent>
          <EmptyState
            action={
              onCreate ? (
                <Button
                  className="min-h-[44px] sm:min-h-[32px]"
                  onClick={onCreate}
                  type="button"
                >
                  <Plus className="size-4" />
                  Create Template
                </Button>
              ) : undefined
            }
            message="No templates available"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <TemplateHeader onCreate={onCreate} />
            {showSearch && (
              <TemplateSearch
                onChange={setSearchQuery}
                resultCount={filteredTemplates.length}
                value={searchQuery}
              />
            )}
            {showCategories && (
              <CategoryFilter
                categories={categories}
                onCategoryChange={setSelectedCategory}
                onToggleFavorites={() =>
                  setShowFavoritesOnly(!showFavoritesOnly)
                }
                selectedCategory={selectedCategory}
                showFavorites={showFavorites}
                showFavoritesOnly={showFavoritesOnly}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <EmptyState
              message={
                searchQuery.trim()
                  ? "No templates match your search"
                  : showFavoritesOnly
                    ? "No favorite templates"
                    : "No templates match your filters"
              }
            />
          ) : (
            <ul
              aria-label="Prompt templates"
              className="grid gap-4"
              role="list"
            >
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  index={index}
                  isFavoriting={isFavoriting === template.id}
                  isFocused={focusedIndex === index}
                  key={template.id}
                  onFavorite={onFavorite ? handleFavorite : undefined}
                  onFocus={() => setFocusedIndex(index)}
                  onSelect={handleSelect}
                  optimisticFavorite={optimisticFavorites[template.id]}
                  template={template}
                />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <TemplateDialog
        canUse={canUseTemplate}
        onClose={() => {
          setSelectedTemplate(null);
          setTemplateVariables({});
        }}
        onUse={handleUseTemplate}
        onVariablesChange={setTemplateVariables}
        template={selectedTemplate}
        variables={templateVariables}
      />
    </>
  );
}
