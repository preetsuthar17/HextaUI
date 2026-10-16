"use client"

import * as React from "react"
import { IconHeart, IconSearch } from "@tabler/icons-react"
import { cn } from "cn"

import { BlockCard } from "@/components/site/block-card"
import { CatalogGrid, CatalogList } from "@/components/site/catalog-card"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupClear,
  InputGroupInput,
} from "@/components/ui/input-group"
import { favoriteBlocks, useFavoriteBlocks } from "@/lib/block-favorites"
import { useChrome } from "@/lib/i18n/chrome"
import { filterBlocks, type FilterableBlock } from "@/lib/pro/filter"
import { track } from "@/lib/track"

type CatalogBlock = FilterableBlock & { free?: boolean }

type CatalogSection = {
  category: string
  title: string
  blocks: CatalogBlock[]
}

function Chip({
  pressed,
  onPressedChange,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick"> & {
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted-foreground inset-ring-(length:--hairline) inset-ring-border transition-colors duration-200 ease-out-quint outline-none select-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-focus-ring focus-visible:inset-ring-ring focus-visible:outline-hidden aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:inset-ring-transparent motion-reduce:transition-none forced-colors:border [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function BlocksCatalog({ sections }: { sections: CatalogSection[] }) {
  const c = useChrome()
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string | null>(null)
  const [favoritesOnly, setFavoritesOnly] = React.useState(false)
  const favorites = useFavoriteBlocks()
  const deferredQuery = React.useDeferredValue(query)
  const searchId = React.useId()

  const filtered = sections
    .map((section) => ({
      ...section,
      blocks: filterBlocks(section.blocks, {
        query: deferredQuery,
        category,
        favorites: favoritesOnly ? favorites : null,
      }),
    }))
    .filter((section) => section.blocks.length > 0)
  const filtering =
    deferredQuery.trim() !== "" || category !== null || favoritesOnly

  const clear = () => {
    setQuery("")
    setCategory(null)
    setFavoritesOnly(false)
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup size="sm" className="sm:w-64">
          <InputGroupInput
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={c("Search blocks")}
            aria-label={c("Search blocks")}
            autoComplete="off"
            spellCheck={false}
          />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupClear />
          </InputGroupAddon>
        </InputGroup>
        <div
          role="group"
          aria-label={c("Filter blocks")}
          className="flex flex-wrap items-center gap-1.5"
        >
          <Chip
            pressed={category === null}
            onPressedChange={() => setCategory(null)}
          >
            {c("All")}
          </Chip>
          {sections.map((section) => (
            <Chip
              key={section.category}
              pressed={category === section.category}
              onPressedChange={(pressed) => {
                setCategory(pressed ? section.category : null)
                if (pressed)
                  track("Filter blocks", { category: section.category })
              }}
            >
              {section.title}
            </Chip>
          ))}
          <Chip
            pressed={favoritesOnly}
            onPressedChange={(pressed) => {
              setFavoritesOnly(pressed)
              if (pressed) track("Filter blocks", { category: "favorites" })
            }}
            className="sm:ms-1"
          >
            <IconHeart />
            {c("Favorites")}
            {favorites.length > 0 ? (
              <span className="text-xs tabular-nums opacity-70">
                {favorites.length}
              </span>
            ) : null}
          </Chip>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div
          role="status"
          className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-4 py-12 text-center text-sm text-muted-foreground"
        >
          <p className="max-w-xs text-pretty">
            {favoritesOnly && favorites.length === 0
              ? c("No favorites yet. Tap the heart on a block to save it here.")
              : c("No blocks match your search.")}
          </p>
          {filtering ? (
            <Button variant="outline" size="sm" onClick={clear}>
              {c("Clear filters")}
            </Button>
          ) : null}
        </div>
      ) : (
        filtered.map((section) => (
          <section key={section.category} className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              {section.title}
            </h2>
            <CatalogGrid>
              {section.blocks.map((block) => (
                <BlockCard
                  key={block.name}
                  name={block.name}
                  title={block.title}
                  favorite={favorites.includes(block.name)}
                  onFavoriteChange={(favorite) => {
                    favoriteBlocks.toggle(block.name)
                    if (favorite) track("Favorite block", { block: block.name })
                  }}
                />
              ))}
            </CatalogGrid>
            <CatalogList
              items={section.blocks.map((block) => ({
                href: `/blocks/${block.name}`,
                title: block.title,
              }))}
            />
          </section>
        ))
      )}
    </>
  )
}

export { BlocksCatalog, type CatalogBlock, type CatalogSection }
