import * as React from "react"

const favoriteBlocksStorageKey = "hextaui-favorite-blocks"

const none: readonly string[] = Object.freeze([])

type FavoritesStore = {
  read: () => readonly string[]
  has: (name: string) => boolean
  toggle: (name: string) => readonly string[]
  subscribe: (listener: () => void) => () => void
}

function parseFavorites(raw: string | null): readonly string[] {
  if (!raw) return none
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return none
    const names = value.filter(
      (item): item is string => typeof item === "string" && item.length > 0
    )
    return names.length > 0 ? Object.freeze([...new Set(names)]) : none
  } catch {
    return none
  }
}

function createFavoritesStore(
  getStorage: () => Storage | undefined,
  key = favoriteBlocksStorageKey
): FavoritesStore {
  const listeners = new Set<() => void>()
  let cache: readonly string[] | null = null

  const read = () => {
    if (cache) return cache
    try {
      cache = parseFavorites(getStorage()?.getItem(key) ?? null)
    } catch {
      cache = none
    }
    return cache
  }

  const notify = () => {
    listeners.forEach((listener) => listener())
  }

  const toggle = (name: string) => {
    const current = read()
    const next = current.includes(name)
      ? current.filter((item) => item !== name)
      : [...current, name]
    cache = next.length > 0 ? Object.freeze(next) : none
    try {
      getStorage()?.setItem(key, JSON.stringify(cache))
    } catch {}
    notify()
    return cache
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === key) {
        cache = null
        listener()
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage)
    }
    return () => {
      listeners.delete(listener)
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage)
      }
    }
  }

  return { read, has: (name) => read().includes(name), toggle, subscribe }
}

const favoriteBlocks = createFavoritesStore(() =>
  typeof localStorage === "undefined" ? undefined : localStorage
)

function useFavoriteBlocks() {
  return React.useSyncExternalStore(
    favoriteBlocks.subscribe,
    favoriteBlocks.read,
    () => none
  )
}

export {
  createFavoritesStore,
  favoriteBlocks,
  favoriteBlocksStorageKey,
  parseFavorites,
  useFavoriteBlocks,
  type FavoritesStore,
}
