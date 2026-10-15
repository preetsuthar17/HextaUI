const freeBlocks: readonly string[] = ["prompt-input"]

const nextBlocks: Readonly<Record<string, readonly string[]>> = {
  "prompt-input": ["chat-thread", "streaming", "thinking", "tool-calls"],
}

function isFreeBlock(name: string) {
  return freeBlocks.includes(name)
}

function getNextBlocks(name: string) {
  return nextBlocks[name] ?? []
}

export { freeBlocks, getNextBlocks, isFreeBlock }
