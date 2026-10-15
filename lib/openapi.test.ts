import fs from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { apiErrors } from "@/lib/api-error"
import { getOpenApiDocument } from "@/lib/openapi"

const document = getOpenApiDocument()
const methods = ["get", "post", "put", "patch", "delete"] as const

type Operation = {
  operationId?: string
  description?: string
  summary?: string
  responses?: Record<string, unknown>
  parameters?: { schema?: unknown; description?: string }[]
}

const operations = Object.entries(document.paths).flatMap(([route, item]) =>
  methods.flatMap((method) => {
    const operation = (item as Record<string, Operation | undefined>)[method]
    return operation ? [{ route, method, operation }] : []
  })
)

function collectRefs(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(collectRefs)
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      key === "$ref" && typeof child === "string" ? [child] : collectRefs(child)
    )
  }
  return []
}

function functionRoutes(dir: string, prefix = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return functionRoutes(
        path.join(dir, entry.name),
        `${prefix}/${entry.name}`
      )
    }
    if (!entry.name.endsWith(".ts")) return []
    const name = entry.name.replace(/\.ts$/, "")
    if (name.startsWith("_")) return []
    return [`${prefix}/${name}`]
  })
}

describe("OpenAPI document", () => {
  it("is OpenAPI 3.1 with a server and contact", () => {
    expect(document.openapi).toBe("3.1.0")
    expect(document.servers[0].url).toBe("https://hextaui.com")
    expect(document.info.contact.email).toMatch(/@/)
  })

  it("gives every operation a unique id, description and responses", () => {
    const ids = operations.map(({ operation }) => operation.operationId)
    expect(ids.every((id) => id && /^[a-z][A-Za-z]+$/.test(id))).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
    for (const { operation } of operations) {
      expect(operation.summary).toBeTruthy()
      expect(operation.description!.length).toBeGreaterThan(40)
      expect(Object.keys(operation.responses ?? {}).length).toBeGreaterThan(0)
      for (const parameter of operation.parameters ?? []) {
        expect(parameter.schema).toBeTruthy()
        expect(parameter.description).toBeTruthy()
      }
    }
  })

  it("resolves every $ref", () => {
    for (const ref of collectRefs(document)) {
      const [, section, name] = ref.match(/^#\/components\/(\w+)\/(\w+)$/) ?? []
      const components = document.components as Record<
        string,
        Record<string, unknown>
      >
      expect(components[section]?.[name], ref).toBeTruthy()
    }
  })

  it("documents every error code", () => {
    expect(document.components.schemas.Problem.properties.code.enum).toEqual(
      Object.keys(apiErrors)
    )
  })

  it("documents every public Pages Function", () => {
    const documented = Object.keys(document.paths).map((route) =>
      route
        .replace("{name}.json", "[name]")
        .replace("{id}", "[id]")
        .replace("{name}", "[name]")
    )
    const internal = [
      "/api/webhooks/dodo",
      "/api/auth/[[path]]",
      "/api/admin/broadcast",
      "/api/admin/email-preview",
      "/api/email/unsubscribe",
    ]
    const routes = functionRoutes(path.join(process.cwd(), "functions"))
      .map((route) => route.replace(/\/index$/, ""))
      .filter((route) => !internal.includes(route))
    for (const route of routes) {
      expect(documented, route).toContain(route)
    }
  })
})
