type FilterableBlock = {
  name: string
  title: string
  description: string
  category: string
}

type BlockFilter = {
  query?: string
  category?: string | null
  favorites?: readonly string[] | null
}

function normalize(text: string) {
  return text.normalize("NFKD").toLowerCase()
}

function queryTerms(query: string) {
  return normalize(query).split(/\s+/).filter(Boolean)
}

function matchesQuery(block: FilterableBlock, query: string) {
  const terms = queryTerms(query)
  if (terms.length === 0) return true
  const haystack = normalize(
    `${block.title} ${block.description} ${block.name.replaceAll("-", " ")}`
  )
  return terms.every((term) => haystack.includes(term))
}

function filterBlocks<Block extends FilterableBlock>(
  blocks: readonly Block[],
  { query = "", category = null, favorites = null }: BlockFilter = {}
) {
  const saved = favorites === null ? null : new Set(favorites)
  return blocks.filter(
    (block) =>
      (category === null || block.category === category) &&
      (saved === null || saved.has(block.name)) &&
      matchesQuery(block, query)
  )
}

export { filterBlocks, matchesQuery, type BlockFilter, type FilterableBlock }
