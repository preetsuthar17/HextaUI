import { describe, expect, it, vi } from "vitest"

import {
  createFavoritesStore,
  favoriteBlocksStorageKey,
  parseFavorites,
} from "@/lib/block-favorites"

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value)
    },
    data,
  } as unknown as Storage & { data: Map<string, string> }
}

describe("parseFavorites", () => {
  it("keeps only unique non-empty strings", () => {
    expect(parseFavorites('["a","b","a",1,"",null]')).toEqual(["a", "b"])
  })

  it("returns nothing for missing or broken values", () => {
    expect(parseFavorites(null)).toEqual([])
    expect(parseFavorites("not json")).toEqual([])
    expect(parseFavorites('{"a":1}')).toEqual([])
  })
})

describe("createFavoritesStore", () => {
  it("reads what is stored and toggles names in and out", () => {
    const storage = memoryStorage({
      [favoriteBlocksStorageKey]: '["streaming"]',
    })
    const store = createFavoritesStore(() => storage)
    const listener = vi.fn()
    store.subscribe(listener)

    expect(store.read()).toEqual(["streaming"])
    expect(store.toggle("thinking")).toEqual(["streaming", "thinking"])
    expect(store.toggle("streaming")).toEqual(["thinking"])
    expect(store.has("thinking")).toBe(true)
    expect(storage.data.get(favoriteBlocksStorageKey)).toBe('["thinking"]')
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it("returns the same reference until something changes", () => {
    const store = createFavoritesStore(() => memoryStorage())
    const first = store.read()
    expect(store.read()).toBe(first)
    store.toggle("billing")
    expect(store.read()).not.toBe(first)
  })

  it("keeps working when storage throws or is missing", () => {
    const broken = {
      getItem: () => {
        throw new Error("blocked")
      },
      setItem: () => {
        throw new Error("blocked")
      },
    } as unknown as Storage
    const store = createFavoritesStore(() => broken)
    expect(store.read()).toEqual([])
    expect(store.toggle("models")).toEqual(["models"])
    expect(store.has("models")).toBe(true)

    const absent = createFavoritesStore(() => undefined)
    expect(absent.read()).toEqual([])
    expect(absent.toggle("models")).toEqual(["models"])
  })

  it("stops notifying after unsubscribe", () => {
    const store = createFavoritesStore(() => memoryStorage())
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)
    store.toggle("team")
    unsubscribe()
    store.toggle("team")
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
