"use client";

import {
  ChevronDown,
  ExternalLink,
  FileText,
  Globe,
  Quote,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york/ui/collapsible";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york/ui/empty";

export interface CitationSource {
  id: string;
  title: string;
  url: string;
  domain?: string;
  snippet?: string;
  author?: string;
  publishedAt?: Date;
  type?: "web" | "document" | "paper" | "other";
}

export interface Citation {
  id: string;
  number: number;
  sources: CitationSource[];
  text?: string;
}

export interface AICitationsProps {
  citations: Citation[];
  className?: string;
  defaultExpanded?: boolean;
  showInlineNumbers?: boolean;
  onSourceClick?: (source: CitationSource) => void;
}

const SOURCE_ICONS: Record<
  NonNullable<CitationSource["type"]>,
  React.ComponentType<{ className?: string }>
> = {
  document: FileText,
  paper: FileText,
  web: Globe,
  other: Globe,
};

function formatDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

interface CitationNumberProps {
  number: number;
  onClick?: () => void;
  className?: string;
  asButton?: boolean;
  "aria-label"?: string;
}

function CitationNumber({
  number,
  onClick,
  className,
  asButton = true,
  "aria-label": ariaLabel,
}: CitationNumberProps) {
  const baseClassName = cn(
    "inline-flex items-center justify-center rounded-full border bg-primary/10 font-mono font-semibold text-primary text-xs transition-colors",
    "size-6 min-h-6 min-w-6 md:size-[24px] md:min-h-[24px] md:min-w-[24px]",
    asButton &&
      onClick &&
      "cursor-pointer [-webkit-tap-highlight-color:transparent] hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:bg-primary/30",
    !asButton && "pointer-events-none",
    className
  );

  const label = ariaLabel || `Citation ${number}`;

  if (asButton && onClick) {
    return (
      <button
        aria-label={label}
        className={baseClassName}
        onClick={onClick}
        type="button"
      >
        <span className="tabular-nums">{number}</span>
      </button>
    );
  }

  return (
    <span aria-label={label} className={baseClassName}>
      <span className="tabular-nums">{number}</span>
    </span>
  );
}

interface SourceIconProps {
  type?: CitationSource["type"];
  className?: string;
}

function SourceIcon({ type, className }: SourceIconProps) {
  const IconComponent = SOURCE_ICONS[type || "other"] || SOURCE_ICONS.web;
  return <IconComponent className={cn("size-4 text-primary", className)} />;
}

interface SourceMetadataProps {
  source: CitationSource;
}

function SourceMetadata({ source }: SourceMetadataProps) {
  const domain = source.domain || formatDomain(source.url);

  return (
    <div
      aria-label="Source metadata"
      className="flex flex-wrap items-center gap-1 text-muted-foreground text-xs"
      role="group"
    >
      <span className="truncate tabular-nums">{domain}</span>
      {source.author && (
        <>
          <span aria-hidden="true" className="tabular-nums">
            •
          </span>
          <span className="tabular-nums">{source.author}</span>
        </>
      )}
      {source.publishedAt && (
        <>
          <span aria-hidden="true" className="tabular-nums">
            •
          </span>
          <time
            className="tabular-nums"
            dateTime={source.publishedAt.toISOString()}
          >
            {formatDate(source.publishedAt)}
          </time>
        </>
      )}
    </div>
  );
}

interface SourceSnippetProps {
  snippet: string;
}

function SourceSnippet({ snippet }: SourceSnippetProps) {
  return (
    <div aria-label="Source excerpt" className="flex gap-2 pl-10" role="group">
      <Quote
        aria-hidden="true"
        className="size-3 shrink-0 translate-y-0.5 text-muted-foreground"
      />
      <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
        {snippet}
      </p>
    </div>
  );
}

interface SourcePreviewProps {
  source: CitationSource;
  citationNumber: number;
  onSourceClick?: (source: CitationSource) => void;
}

function SourcePreview({
  source,
  citationNumber,
  onSourceClick,
}: SourcePreviewProps) {
  const [isSnippetOpen, setIsSnippetOpen] = useState(false);
  const handleClick = useCallback(() => {
    onSourceClick?.(source);
  }, [onSourceClick, source]);

  return (
    <Collapsible onOpenChange={setIsSnippetOpen} open={isSnippetOpen}>
      <article
        aria-labelledby={`source-title-${source.id}`}
        className={cn(
          "group flex flex-col gap-2 rounded-md bg-muted/30 p-3 pl-4 transition-colors",
          "focus-within:bg-muted/50 hover:bg-muted/50",
          "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "touch-manipulation [-webkit-tap-highlight-color:transparent]"
        )}
        onClick={handleClick}
        role="article"
      >
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background"
            >
              <SourceIcon type={source.type} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start gap-2">
                <h4
                  className="line-clamp-2 font-medium text-sm leading-snug"
                  id={`source-title-${source.id}`}
                >
                  {source.title}
                </h4>
              </div>
              <SourceMetadata source={source} />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {source.snippet && (
              <CollapsibleTrigger
                aria-label={isSnippetOpen ? "Hide snippet" : "Show snippet"}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors",
                  "min-h-[44px] min-w-[44px] sm:min-h-[24px] sm:min-w-[24px]",
                  "hover:bg-background hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  "[-webkit-tap-highlight-color:transparent] active:bg-background/80"
                )}
                onClick={(e) => e.stopPropagation()}
                type="button"
              >
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-3.5 transition-transform motion-safe:duration-200",
                    isSnippetOpen && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
            )}
            <a
              aria-label={`Open ${source.title} in new tab`}
              className={cn(
                "flex shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors",
                "min-h-[44px] min-w-[44px] sm:min-h-[24px] sm:min-w-[24px]",
                "hover:bg-background hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                "[-webkit-tap-highlight-color:transparent] active:bg-background/80"
              )}
              href={source.url}
              onClick={(e) => e.stopPropagation()}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
        {source.snippet && (
          <CollapsibleContent className="overflow-hidden transition-all motion-safe:duration-200 motion-reduce:transition-none">
            <SourceSnippet snippet={source.snippet} />
          </CollapsibleContent>
        )}
      </article>
    </Collapsible>
  );
}

interface CitationItemHeaderProps {
  citation: Citation;
  isOpen: boolean;
  onToggle: () => void;
}

function CitationItemHeader({
  citation,
  isOpen,
  onToggle,
}: CitationItemHeaderProps) {
  const hasMultipleSources = citation.sources.length > 1;
  const sourceCount = citation.sources.length;

  if (hasMultipleSources) {
    return (
      <CollapsibleTrigger
        aria-controls={`citation-content-${citation.id}`}
        aria-expanded={isOpen}
        className={cn(
          "flex min-h-[44px] items-center justify-between rounded-lg bg-card px-2 text-left transition-colors",
          "hover:bg-accent/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "touch-manipulation [-webkit-tap-highlight-color:transparent] active:bg-accent/70 sm:min-h-[24px]"
        )}
        type="button"
      >
        <div className="flex items-center gap-3">
          <CitationNumber
            aria-label={`Citation ${citation.number}`}
            asButton={false}
            number={citation.number}
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm tabular-nums">
              {sourceCount} {sourceCount === 1 ? "source" : "sources"}
            </span>
            {citation.text && (
              <span className="text-muted-foreground text-xs leading-tight">
                {citation.text}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform motion-safe:duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
    );
  }

  return (
    <div
      aria-label={`Citation ${citation.number}`}
      className="flex items-center gap-3 rounded-lg bg-card px-2"
      role="group"
    >
      <CitationNumber
        aria-label={`Citation ${citation.number}`}
        asButton={false}
        number={citation.number}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-sm">Source</span>
        {citation.text && (
          <span className="text-muted-foreground text-xs leading-tight">
            {citation.text}
          </span>
        )}
      </div>
    </div>
  );
}

interface CitationItemProps {
  citation: Citation;
  onSourceClick?: (source: CitationSource) => void;
  defaultExpanded?: boolean;
}

function CitationItem({
  citation,
  onSourceClick,
  defaultExpanded = false,
}: CitationItemProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const hasMultipleSources = citation.sources.length > 1;

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  if (citation.sources.length === 0) {
    return null;
  }

  return (
    <Collapsible onOpenChange={setIsOpen} open={isOpen}>
      <div className="flex flex-col gap-3">
        <CitationItemHeader
          citation={citation}
          isOpen={isOpen}
          onToggle={handleToggle}
        />

        {hasMultipleSources ? (
          <CollapsibleContent
            className="overflow-hidden transition-all motion-safe:duration-200 motion-reduce:transition-none"
            id={`citation-content-${citation.id}`}
          >
            <ul
              aria-label={`Sources for citation ${citation.number}`}
              className="ml-6 flex flex-col gap-2 border-l pl-6"
              role="list"
            >
              {citation.sources.map((source) => (
                <li key={source.id} role="listitem">
                  <SourcePreview
                    citationNumber={citation.number}
                    onSourceClick={onSourceClick}
                    source={source}
                  />
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        ) : (
          <div className="ml-6 border-l pl-6">
            <SourcePreview
              citationNumber={citation.number}
              onSourceClick={onSourceClick}
              source={citation.sources[0]}
            />
          </div>
        )}
      </div>
    </Collapsible>
  );
}

interface CitationsHeaderProps {
  count: number;
}

function CitationsHeader({ count }: CitationsHeaderProps) {
  return (
    <header className="flex items-center gap-2">
      <div
        aria-hidden="true"
        className="flex size-6 items-center justify-center rounded-lg bg-primary/10"
      >
        <Quote className="size-3.5 text-primary" />
      </div>
      <h2 className="font-semibold text-sm">Sources & Citations</h2>
      <span className="text-muted-foreground text-xs tabular-nums">
        ({count})
      </span>
    </header>
  );
}

interface CitationsListProps {
  citations: Citation[];
  onSourceClick?: (source: CitationSource) => void;
  defaultExpanded?: boolean;
}

function CitationsList({
  citations,
  onSourceClick,
  defaultExpanded = false,
}: CitationsListProps) {
  const validCitations = useMemo(
    () => citations.filter((c) => c.sources.length > 0),
    [citations]
  );

  if (validCitations.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Citations list" className="flex flex-col gap-3" role="list">
      {validCitations.map((citation) => (
        <li key={citation.id} role="listitem">
          <CitationItem
            citation={citation}
            defaultExpanded={defaultExpanded}
            onSourceClick={onSourceClick}
          />
        </li>
      ))}
    </ul>
  );
}

interface CitationsEmptyStateProps {
  className?: string;
}

function CitationsEmptyState({ className }: CitationsEmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Quote aria-hidden="true" className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No citations available</EmptyTitle>
        <EmptyDescription>
          Citations will appear here when sources are referenced in the
          conversation.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default function AICitations({
  citations,
  className,
  defaultExpanded = false,
  onSourceClick,
}: AICitationsProps) {
  const validCitations = useMemo(
    () => citations?.filter((c) => c.sources && c.sources.length > 0) || [],
    [citations]
  );

  const handleSourceClick = useCallback(
    (source: CitationSource) => {
      onSourceClick?.(source);
    },
    [onSourceClick]
  );

  if (!citations || validCitations.length === 0) {
    return <CitationsEmptyState className={className} />;
  }

  return (
    <section
      aria-label="Sources and citations"
      className={cn("flex w-full flex-col gap-3", className)}
    >
      <CitationsHeader count={validCitations.length} />
      <CitationsList
        citations={validCitations}
        defaultExpanded={defaultExpanded}
        onSourceClick={handleSourceClick}
      />
    </section>
  );
}

interface InlineCitationProps {
  number: number;
  onClick?: () => void;
}

function InlineCitation({ number, onClick }: InlineCitationProps) {
  return (
    <CitationNumber
      aria-label={`View citation ${number}`}
      className="-top-0.5 relative mx-0.5"
      number={number}
      onClick={onClick}
    />
  );
}

export { InlineCitation, CitationNumber };
