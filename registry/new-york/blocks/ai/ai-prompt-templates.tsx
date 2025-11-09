"use client";

import {
  BookOpen,
  Eye,
  Heart,
  Loader2,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  const [showPreview, setShowPreview] = useState(false);

  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    if (showFavoritesOnly) {
      filtered = filtered.filter((t) => t.isFavorite);
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
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return (b.usageCount || 0) - (a.usageCount || 0);
    });
  }, [templates, selectedCategory, searchQuery, showFavoritesOnly]);

  const handleSelect = (template: PromptTemplate) => {
    if (template.variables && template.variables.length > 0) {
      setSelectedTemplate(template);
      setTemplateVariables({});
    } else {
      onSelect?.(template);
    }
  };

  const handleUseTemplate = () => {
    if (!selectedTemplate) return;

    const variables = templateVariables;
    onSelect?.(selectedTemplate, variables);
    setSelectedTemplate(null);
    setTemplateVariables({});
    setShowPreview(false);
  };

  const handleFavorite = async (
    templateId: string,
    currentFavorite: boolean | undefined,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!onFavorite) return;

    setIsFavoriting(templateId);
    try {
      await onFavorite(templateId, !(currentFavorite ?? false));
    } finally {
      setIsFavoriting(null);
    }
  };

  const previewPrompt = selectedTemplate
    ? fillTemplatePrompt(selectedTemplate.prompt, templateVariables)
    : "";

  const canUseTemplate =
    !selectedTemplate?.variables ||
    selectedTemplate.variables.every(
      (v) => !v.required || templateVariables[v.name]
    );

  if (templates.length === 0) {
    return (
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Prompt Templates</CardTitle>
              <CardDescription>
                Browse and use pre-built prompt templates
              </CardDescription>
            </div>
            {onCreate && (
              <Button
                className="w-full sm:w-auto"
                onClick={onCreate}
                type="button"
              >
                <Plus className="size-4" />
                Create Template
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <BookOpen className="size-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No templates available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle>Prompt Templates</CardTitle>
                <CardDescription>
                  Browse and use pre-built prompt templates
                </CardDescription>
              </div>
              {onCreate && (
                <Button className="w-full" onClick={onCreate} type="button">
                  <Plus className="size-4" />
                  Create Template
                </Button>
              )}
            </div>
            {showSearch && (
              <InputGroup>
                <InputGroupAddon>
                  <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates…"
                  type="search"
                  value={searchQuery}
                />
                {searchQuery && (
                  <Button
                    aria-label="Clear search"
                    className="-translate-y-1/2 absolute top-1/2 right-2"
                    onClick={() => setSearchQuery("")}
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
              <div className="flex flex-wrap items-center gap-2">
                {showFavorites && (
                  <Button
                    className={cn(
                      "h-auto gap-2 px-3 py-1.5",
                      showFavoritesOnly
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    type="button"
                    variant="ghost"
                  >
                    <Heart className="size-3.5" />
                    <span className="text-xs">Favorites</span>
                  </Button>
                )}
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || Sparkles;
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
                      {category !== "All" && <Icon className="size-3.5" />}
                      <span className="text-xs">{category}</span>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <p className="text-muted-foreground text-sm">
                No templates match your filters
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTemplates.map((template) => {
                const Icon =
                  template.icon || categoryIcons[template.category] || Sparkles;
                const hasVariables =
                  template.variables && template.variables.length > 0;
                return (
                  <div
                    className="group flex flex-col gap-4 rounded-lg border bg-card p-5 transition-all hover:border-primary hover:shadow-sm"
                    key={template.id}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="wrap-break-word font-semibold text-base leading-tight">
                            {template.name}
                          </h3>
                          <div className="flex shrink-0 items-center gap-1.5">
                            {template.isPopular && (
                              <Badge className="text-xs" variant="default">
                                Popular
                              </Badge>
                            )}
                            {onFavorite && (
                              <button
                                aria-label={`${template.isFavorite ? "Remove from" : "Add to"} favorites`}
                                className="rounded-md p-1.5 transition-colors hover:bg-muted"
                                disabled={isFavoriting === template.id}
                                onClick={(e) =>
                                  handleFavorite(
                                    template.id,
                                    template.isFavorite,
                                    e
                                  )
                                }
                                type="button"
                              >
                                {isFavoriting === template.id ? (
                                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                                ) : (
                                  <Heart
                                    className={cn(
                                      "size-4 transition-colors",
                                      template.isFavorite
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
                            <Badge
                              className="text-xs"
                              key={tag}
                              variant="outline"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 2 && (
                            <span className="text-muted-foreground text-xs">
                              +{template.tags.length - 2}
                            </span>
                          )}
                        </>
                      )}
                      {template.usageCount !== undefined && (
                        <span className="text-muted-foreground text-xs">
                          {template.usageCount} uses
                        </span>
                      )}
                      {hasVariables && (
                        <Badge className="text-xs" variant="secondary">
                          {template.variables!.length} variable
                          {template.variables!.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        aria-label={`Use template: ${template.name}`}
                        className="flex-1"
                        onClick={() => handleSelect(template)}
                        type="button"
                      >
                        {hasVariables ? "Configure & Use" : "Use Template"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTemplate(null);
            setTemplateVariables({});
            setShowPreview(false);
          }
        }}
        open={!!selectedTemplate}
      >
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 sm:max-w-2xl">
          <DialogHeader className="shrink-0">
            <div className="flex items-start gap-3">
              {selectedTemplate &&
                (() => {
                  const Icon =
                    selectedTemplate.icon ||
                    categoryIcons[selectedTemplate.category] ||
                    Sparkles;
                  return (
                    <>
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <DialogTitle className="wrap-break-word">
                          {selectedTemplate.name}
                        </DialogTitle>
                        <DialogDescription className="wrap-break-word">
                          {selectedTemplate.description}
                        </DialogDescription>
                      </div>
                    </>
                  );
                })()}
            </div>
          </DialogHeader>

          {selectedTemplate && (
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
              {selectedTemplate.variables &&
              selectedTemplate.variables.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium text-sm">Fill in the details</h3>
                  <div className="flex flex-col gap-4">
                    {selectedTemplate.variables.map((variable) => (
                      <Field key={variable.name}>
                        <FieldLabel
                          htmlFor={`${selectedTemplate.id}-${variable.name}`}
                        >
                          {variable.label}
                          {variable.required && (
                            <span className="text-destructive"> *</span>
                          )}
                        </FieldLabel>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              id={`${selectedTemplate.id}-${variable.name}`}
                              onChange={(e) => {
                                setTemplateVariables((prev) => ({
                                  ...prev,
                                  [variable.name]: e.target.value,
                                }));
                              }}
                              placeholder={
                                variable.placeholder ||
                                `Enter ${variable.label.toLowerCase()}`
                              }
                              type="text"
                              value={templateVariables[variable.name] || ""}
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
                    className="h-auto gap-2 px-2 py-1"
                    onClick={() => setShowPreview(!showPreview)}
                    type="button"
                    variant="ghost"
                  >
                    <Eye className="size-4" />
                    <span className="text-xs">
                      {showPreview ? "Hide" : "Show"} Preview
                    </span>
                  </Button>
                </div>
                {showPreview && (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="wrap-break-word whitespace-pre-wrap text-sm">
                      {previewPrompt || selectedTemplate.prompt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="shrink-0 border-t p-6">
            <Button
              onClick={() => {
                setSelectedTemplate(null);
                setTemplateVariables({});
                setShowPreview(false);
              }}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={!canUseTemplate}
              onClick={handleUseTemplate}
              type="button"
            >
              Use Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
