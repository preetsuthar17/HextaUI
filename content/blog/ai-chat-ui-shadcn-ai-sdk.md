The demo takes an afternoon. `useChat` from the AI SDK, a list of messages, a textarea, and tokens stream onto the screen. Everyone on the team is impressed.

Then a real person uses it. They hit Enter while composing Japanese and send half a word. They stop a reply and the UI shows nothing. A tool call wants approval mid-stream and there is no UI for that. They scroll up to re-read something and the view yanks them back to the bottom with every token.

I have built this screen more times than I would like, most recently as the blocks behind [HextaUI](https://hextaui.com). This is the checklist of what a chat UI has to handle before it is done, with the shadcn/ui and AI SDK specifics for each.

## Start from message parts, not strings

The AI SDK's `useChat` returns messages made of parts: text, reasoning, tool calls with their state, sources, files. Render the parts, not a concatenated string. Every feature below depends on it.

```tsx
import { isToolUIPart } from "ai"

{message.parts.map((part, i) => {
  if (isToolUIPart(part)) return <ToolCall key={i} part={part} />
  switch (part.type) {
    case "text":
      return <Markdown key={i} text={part.text} />
    case "reasoning":
      return <Thinking key={i} text={part.text} />
    case "source-url":
      return <Source key={i} url={part.url} />
    default:
      return null
  }
})}
```

Tool parts are typed `tool-<name>`, so `isToolUIPart` is the reliable check.

Keep your blocks free of the SDK import. Take parts as props. Then the same components work with a LangGraph backend or your own server once you map its output to the same shape.

## The composer

The textarea is where most of the bugs live.

**Enter sends, Shift+Enter breaks a line.** Everyone does this. Almost nobody handles composition. When someone types Japanese, Chinese or Korean, the IME is open and Enter confirms the candidate, not the message. Check `event.nativeEvent.isComposing` and bail:

```tsx
function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (event.key !== "Enter" || event.shiftKey) return
  if (event.nativeEvent.isComposing) return
  event.preventDefault()
  submit()
}
```

**Grow with the text, within limits.** One line to start, up to about eight rows, then scroll. Animate the height change, and never through React state on every keystroke. Measure `scrollHeight` in a layout effect and set the height on the DOM node. Any setState in a native input listener will eventually drop or delay keys under load.

**Drafts survive a reload.** Save the draft to `localStorage` keyed by chat id, debounced. People lose long prompts to accidental refreshes and never forgive you.

**Queue messages typed during a reply.** If the model is still writing and the user sends another message, either disable sending or queue it and send when the stream ends. Silently dropping it is the worst option and it is the default.

**Attachments show progress and retry.** Uploads fail. Show the failure on the attachment card with a retry, not as a toast that disappears.

## Streaming that reads well

Models emit tokens in bursts. If you render exactly what arrives, text stutters: nothing, then twelve words, then nothing. Smooth it. Reveal characters at a steady pace that speeds up when the buffer grows, so you never fall far behind the stream but never stutter either.

Markdown during streaming has its own trap: half-typed syntax. The model has written `**bold` and not yet closed it, so your renderer shows literal asterisks for a frame, then bold text. Hold back incomplete inline syntax until it closes, or until the stream ends.

Code blocks need the same care. Highlight incrementally and never re-highlight the whole block on every token.

## Stop, retry, edit and versions

**Stop** should leave the partial reply on screen, with a visible "Stopped" marker so the user knows it is incomplete. Do not delete it.

**Retry** on a failed reply is a button on the message, not a hidden gesture. Connect it to `regenerate()`.

**Edit** an earlier message creates a branch. Both the old and new reply exist. Show a small `1 / 2` switcher on the message so the user can flip between versions. This is where a lot of homegrown chat UIs give up, and it is the feature people miss most from ChatGPT and Claude.

**Failed** replies get a reason and a retry. "Something went wrong" with no action is a dead end.

## Scrolling

Follow new tokens when the user is at the bottom. The moment they scroll up, stop following, and show a "jump to latest" button with a count of what they missed. When they jump, follow again.

Loading older history at the top must not move the view. Measure the scroll height before and after you prepend, and adjust `scrollTop` by the difference in the same frame.

If the user sends a message, scroll so their message pins to the top of the viewport and the reply streams below it. That is how the two big chat apps behave now and users expect it.

## Tool calls and approvals

The AI SDK gives each tool part a state: `input-streaming`, `input-available`, `output-available`, `output-error`, and with human-in-the-loop, `approval-requested`, `approval-responded` and `output-denied`. Every state needs a look.

Reads and searches can fold into a one-line summary. Edits, commands and errors should stay expanded. Approvals block the stream and need a clear Allow and Deny, plus a way to say "do this instead" that sends text back to the model as the denial reason.

Show the result when it is useful. A file edit opens into a diff. A command opens into a terminal with the output. A search opens into results. A tool call that only says "Done" teaches users to ignore tool calls.

## Thinking and sources

Reasoning parts should be collapsible and collapsed by default once the answer starts. While the model is still thinking, a live label that follows each step ("Searching docs", "Reading three files") is far more reassuring than a spinner.

Citations belong next to the claims they support, inline, not in a list at the bottom nobody reads.

## Accessibility you cannot skip

- New messages announce through a `role="log"` region, so screen reader users hear replies.
- The stop button is reachable by keyboard and has a label.
- Streaming text should not fire a hundred live-region announcements. Announce when the message completes, or at sentence boundaries.
- Every icon-only button has `aria-label`.

## Putting it together

If you want the pieces, shadcn/ui shipped AI Elements in October 2026: 21 patterns you copy into your project and compose yourself, including Chat, Prompt Input, Reasoning and Tool. Vercel's earlier AI Elements library is being deprecated at the end of November 2026 in favor of them.

If you want the screens already assembled with the states above worked out, that is what the [HextaUI blocks](https://hextaui.com/blocks) are: a Chat Thread with stop, retry and versions, Tool Calls with every AI SDK state and approvals, Streaming and Markdown that never show half-typed syntax, and a Prompt Input that handles CJK input, uploads, queues and drafts. Prompt Input is free. The rest is a one-time purchase. All of it reads AI SDK message parts and none of it imports the SDK, so it works with any backend you can map.

You can try the whole thing assembled as a chat app at [hextaui.com/blocks/hexta-ai](https://hextaui.com/blocks/hexta-ai) before installing anything.

## FAQ

**Do I need the Vercel AI SDK to use these patterns?** No. The message-parts shape is the useful part. Any backend works once you map its output to parts.

**How do I handle Enter with an IME?** Check `event.nativeEvent.isComposing` in your keydown handler and return early.

**Should streaming text update a live region on every token?** No. Announce at completion or at sentence boundaries, or screen readers become unusable.

**What happens to a stopped reply?** Keep the partial text and mark it as stopped. Never delete what the user has already read.
