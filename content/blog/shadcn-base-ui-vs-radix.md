On 3 July 2026, `npx shadcn init` started picking Base UI instead of Radix. If you have read the headlines and nothing else, you probably think one of two things: that Radix is dead, or that nothing changed. Neither is true.

I maintain [HextaUI](https://hextaui.com), a shadcn/ui registry built on Base UI, so I have spent most of this year inside both primitive layers. This is the guide I wished existed in July: what changed, what did not, every API difference you will hit, and the order to migrate in if you decide to.

## What changed, in one paragraph

New shadcn/ui projects get Base UI primitives. Radix is still fully supported. The shadcn team said every update and new component ships for both libraries, unless a component only exists in Base UI. Existing projects are untouched. If you want Radix on a fresh project, you pass one flag:

```bash
npx shadcn@latest init -b radix
```

If you have CI or scripts that call `init` non-interactively and expect Radix, add that flag now, before a fresh checkout surprises you.

## Why the default moved

Two reasons were given. Base UI had reached a stable 1.6.0 with over six million weekly downloads, and projects created through `shadcn/create` were already choosing Base UI over Radix about two to one. The default followed what people were picking.

Base UI is built by the people behind Radix, Material UI and Floating UI, and the lineage shows. It covers primitives Radix never shipped, such as Combobox, Autocomplete, Number Field, Toast and Preview Card. As of September 2026 it sits at 1.8.0.

## Should you migrate an existing app?

Probably not this quarter, and not all at once.

Stay on Radix if the app is stable, you are not blocked on a missing primitive, and nobody on the team has a specific complaint. Nothing you depend on is going away.

Migrate if you need Combobox or Number Field without reaching for a second library, if you are already rewriting the components for Tailwind v4 anyway, or if you want to be on the layer that new shadcn/ui components target first.

Either way, read the next section before you decide, because the differences are not cosmetic.

## Every API difference you will actually hit

I grouped these by how they fail. The first group breaks your build. The second group compiles fine and changes behavior silently, which is worse.

### Build-breaking changes

**`asChild` becomes `render`.** This is the one everyone meets first.

```tsx
// Radix
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>

// Base UI
<DialogTrigger render={<Button />}>Open</DialogTrigger>
```

The `render` prop takes an element or a function. The function form gives you the state, which is useful for things like a trigger that changes its icon when open.

**Anchored popups gain a `Positioner`.** Menu, Select, Popover and Tooltip go from `Portal > Content` to `Portal > Positioner > Popup`. Dialog has no Positioner; it uses `Backdrop` and `Popup`.

**`Overlay` is now `Backdrop`.** Rename and move on.

**Select values are nullable.** A controlled Select holds `Value | null`, not `string`. Your `useState<string>("")` becomes `useState<string | null>(null)`, and every place that read the value as a string needs a guard.

**Accordion and Toggle Group values are always arrays.** Even in single mode, `value="a"` becomes `value={["a"]}`. Tabs keep a single value.

**`onOpenChange` has a second argument.** Radix lets you call `event.preventDefault()` to stop a close. Base UI passes `(open, details)` and you call `details.cancel()`. The `details.reason` field tells you whether it was the Escape key, an outside press or something else, which is handy for "unsaved changes" dialogs.

**Open-state selectors change.** `data-[state=open]:` variants become `data-open:`. This one hides in your `className` strings and in `cva` variants, so grep for `data-[state=` before you call the migration done.

### Silent behavior changes

**Tabs activate manually by default.** In Radix, arrow keys move focus and activate the tab. In Base UI, arrow keys move focus and you press Enter or Space to activate. If your tests or users expect the Radix behavior, set `activateOnFocus` on the list.

**Checkbox and radio menu items keep the menu open.** `closeOnClick` defaults to `false` for `CheckboxItem` and `RadioItem`. Plain items still close. This is arguably the better default, but it is a change your users will notice.

**Navigation menus open faster.** Base UI's hover `delay` defaults to 50ms. Radix's `delayDuration` defaulted to 200ms. Fast menus feel great until someone sweeps their mouse across the header and three panels fire in a row. Tune it.

## A migration order that does not hurt

Keep both libraries installed. Move one component per commit. Run your tests between each. In this order:

1. **Leaf components with no popup**: Switch, Checkbox, Slider, Toggle, Progress. Mostly rename work.
2. **Tabs and Accordion.** Fix the array values and decide on `activateOnFocus`.
3. **Dialog and Alert Dialog.** Learn the `Backdrop` and `Popup` structure and the `details.cancel()` pattern here, where there is no Positioner to confuse things.
4. **Popover and Tooltip.** Add the `Positioner`.
5. **Select, Combobox, Dropdown Menu, Context Menu.** Nullable values, `closeOnClick`, and the whole popup tree. Do these last, with the most tests.

Replacing a component with the Base UI version is one CLI command, and your source is in git, so review the diff rather than trusting it:

```bash
npx shadcn@latest add dialog --overwrite
```

Then `git diff components/ui/dialog.tsx` and read every line before you keep it.

## What I would not do

I would not run a codemod across the whole tree and hope. The build-breaking changes are easy to find. The silent ones are not, and a codemod cannot tell you that your settings page now needs two keystrokes to switch tabs.

I would also not switch primitive layers and redesign the components in the same PR. The point of shadcn/ui is that you own the code. Owning it means reading the diff.

## If you want the migration done for you

HextaUI is a registry you add to a shadcn/ui project. Every component is already written on Base UI, keeps the shadcn/ui names and props, and uses the same theme tokens, so `npx shadcn@latest add https://hextaui.com/r/dialog.json --overwrite` lands a Base UI Dialog in `components/ui` next to your other files. The components are MIT and free. The [HextaUI vs shadcn/ui](https://hextaui.com/compare/shadcn-ui) page lists what is different and when plain shadcn/ui is the better pick.

## FAQ

**Is Radix deprecated?** No. shadcn/ui ships every component for both libraries, and the team still runs Radix in production.

**Can I mix Radix and Base UI components in one project?** Yes. You carry both dependencies while you migrate. Many projects will stay mixed for a long time and that is fine.

**Do I need to change my theme tokens?** No. `--background`, `--primary`, `--radius` and the rest are unchanged. The primitive layer is independent of the Tailwind side.

**Does Base UI support React Server Components?** Base UI primitives are client components, the same as Radix. Keep the `"use client"` directive where shadcn/ui puts it.

**Where is the official change log?** The July 2026 entry is at [ui.shadcn.com/docs/changelog/2026-07-base-ui-default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default).
