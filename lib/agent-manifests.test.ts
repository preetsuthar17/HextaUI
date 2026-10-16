import { describe, expect, it } from "vitest"

import {
  getBlocksLlms,
  getHomeMarkdown,
  getSkillMarkdown,
} from "@/lib/agent-content"
import {
  getAiCatalog,
  getApiCatalog,
  getArdManifest,
  getMcpServerCard,
  getProtectedResourceMetadata,
  protectedResourceMetadataUrl,
} from "@/lib/agent-manifests"
import { getDocsLlms } from "@/lib/docs-markdown"
import { getProProductJsonLd, getPricingMarkdown } from "@/lib/pricing-info"
import { isEarlyBird, proPlans } from "@/lib/pro/pricing"
import { accessError } from "@/lib/pro/access"

const frontmatterPattern = /^---\n(?:[\w-]+: "(?:[^"\\]|\\.)*"\n)+---\n/

describe("ARD catalog", () => {
  const { entries } = getArdManifest()

  it("gives every entry the required ARD terms", () => {
    for (const entry of entries) {
      expect(entry.identifier).toMatch(/^urn:air:hextaui\.com(:[a-z0-9._-]+)+$/)
      expect(entry.displayName).toBeTruthy()
      expect(entry.type).toMatch(/^[a-z]+\/[a-z0-9.+-]+$/)
      expect(entry.url).toMatch(/^https:\/\/hextaui\.com\//)
      expect("data" in entry).toBe(false)
      expect(entry.representativeQueries.length).toBeGreaterThanOrEqual(2)
      expect(entry.representativeQueries.length).toBeLessThanOrEqual(5)
      expect(new URL(entry.trustManifest.identity).hostname).toBe("hextaui.com")
    }
  })

  it("serves the same entries at the legacy ai-catalog path", () => {
    expect(getAiCatalog().entries).toEqual(entries)
  })
})

describe("discovery documents", () => {
  it("lists API catalog items", () => {
    const [catalog] = getApiCatalog().linkset
    expect(catalog.anchor).toBe("https://hextaui.com/.well-known/api-catalog")
    expect("item" in catalog && catalog.item.length).toBeGreaterThan(0)
  })

  it("brands the MCP server card", () => {
    const card = getMcpServerCard()
    expect(card.title).toBe("HextaUI")
    expect(card.icons[0].src).toMatch(/^https:\/\/hextaui\.com\//)
  })

  it("describes the bearer-token resource without claiming OAuth", () => {
    const metadata = getProtectedResourceMetadata()
    expect(metadata.resource).toBe("https://hextaui.com")
    expect(metadata.bearer_methods_supported).toEqual(["header"])
    expect("authorization_servers" in metadata).toBe(false)
  })

  it("points Pro 401s at the resource metadata", () => {
    expect(
      accessError({ status: "anonymous" })!.headers.get("www-authenticate")
    ).toBe(`Bearer resource_metadata="${protectedResourceMetadataUrl}"`)
  })
})

describe("Markdown for agents", () => {
  it.each([
    ["index.md", getHomeMarkdown()],
    ["pricing.md", getPricingMarkdown()],
    ["SKILL.md", getSkillMarkdown()],
  ])("opens %s with frontmatter", (_, markdown) => {
    expect(markdown).toMatch(frontmatterPattern)
  })

  it("takes prices from the pricing module", () => {
    const solo = isEarlyBird() ? proPlans.solo.earlyPrice : proPlans.solo.price
    const team = isEarlyBird() ? proPlans.team.earlyPrice : proPlans.team.price
    const unlimited = isEarlyBird()
      ? proPlans.unlimited.earlyPrice
      : proPlans.unlimited.price
    expect(getPricingMarkdown()).toContain(`Solo: $${solo} once`)
    expect(getProProductJsonLd().offers.map((offer) => offer.price)).toEqual([
      solo,
      team,
      unlimited,
    ])
  })

  it("scopes the section llms.txt files", () => {
    expect(getDocsLlms()).toMatch(/^# HextaUI docs\n/)
    expect(getDocsLlms()).toContain("https://hextaui.com/docs/button.md")
    expect(getBlocksLlms()).toMatch(/^# HextaUI Pro blocks\n/)
  })
})
