Search "shadcn button loading state" and you will find a hundred snippets that do the same thing: add an `isLoading` prop, swap the label for a spinner, disable the button. Ship that and your app will feel worse than before you added it.

That is not a knock on shadcn/ui. It gives you a clean starting point and leaves the states to you, on purpose. But "the states" are where most of the feel of an interface lives, and almost nobody budgets time for them. This is the list of states I handle in every component I ship, and the specific timings that separate "finished" from "works".

## 1. Loading that does not flicker

The naive loading button shows a spinner the instant you click. Most requests finish in under 200ms, so what the user sees is a flash of spinner and then the result. It reads as jitter.

Two rules fix it:

- **Wait before you show the spinner.** If the request finishes within about 150ms, never show it at all.
- **Once shown, keep it up for a minimum time.** Around 400ms. A spinner that appears for 30ms is worse than no spinner.

```ts
const spinnerDelay = 150
const minimumSpinnerTime = 400
```

That is a hook, not a prop. Here is the shape:

```tsx
const { buttonProps, track } = useButtonFeedback()

<Button {...buttonProps} onClick={() => track(save())}>
  Save
</Button>
```

`track` takes the promise. The hook decides whether the request was fast enough to skip the spinner, holds the spinner long enough not to flicker, and moves the button into success or error when the promise settles. The HextaUI [useButtonFeedback](https://hextaui.com/docs/use-button-feedback) hook and [useDelayedLoading](https://hextaui.com/docs/use-delayed-loading) do exactly this, and they are small enough to read in one sitting.

The same delay rule applies to skeletons. A skeleton that appears for 50ms and gets replaced by the content is a flash of grey. Delay it by 150ms, and when the content arrives, fade it in without moving anything around it.

## 2. Success and error, in place

After a save succeeds, the button should say so. "Saved" with a check, for about two seconds, then back to idle. After it fails, the button should say that too, and hold the error longer, about four seconds, because people need time to read an error and decide what to do.

Two details that matter more than they sound:

- **Do not reset while the pointer is on the button.** If someone is hovering, they are reading. Reset after they leave.
- **Ignore clicks while the request is in flight.** Not with `disabled`, which removes the button from the tab order and makes screen readers skip it. Use `aria-busy` and ignore the click.

A Switch has the same problem in a smaller space. Flip it, send the request, and if the request fails, flip it back. The user needs to see the rollback, so animate it, and show a brief pending state while the save is out.

## 3. Invalid, without punishing typing

Shake the field when a submit attempt finds it invalid. Never shake while someone is still typing. The rule is the trigger: validation on submit or on blur gets the shake, validation on change does not.

The shake itself should be short, three or four oscillations in about 300ms, and under `prefers-reduced-motion` it becomes a color change on the border and nothing else.

Native `:user-invalid` helps here. It only matches after the user has interacted, so you can style the invalid state in CSS without a `touched` flag in React.

## 4. Empty is a state, not an absence

An empty list is where new users land first, and the default is a blank area with a header above it. Every empty state needs three things: an icon or illustration so the space reads as intentional, one sentence that says what will appear here, and the action that makes something appear.

This is cheap to build and almost always skipped because the person building the feature has test data. Clear your database once in a while.

## 5. Reduced motion is not "no motion"

`prefers-reduced-motion: reduce` is on for a meaningful share of users, and the lazy implementation is a global `* { transition: none }`. That removes the information motion was carrying. A dialog that snaps open with no fade is harder to parse than one that fades.

The rule I use: anything that moves across the screen becomes a fade. Anything that fades stays a fade. Anything that loops stops. Durations get shorter, not zero.

Put the check in one place so every component reads it:

```ts
export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
```

And share the easing curves and durations too. If every component picks its own `cubic-bezier`, the app will feel like it was built by six people, because it was.

## 6. Motion you can interrupt

Open an accordion, then close it halfway through the opening animation. In a lot of implementations, it finishes opening and then closes, or it jumps. The right behavior is to reverse from wherever it is.

The Web Animations API makes this easy: keep a reference to the running animation, and on the next toggle, read its current time and animate from the current computed height. CSS transitions on `height: auto` cannot do this, and `grid-template-rows: 0fr` to `1fr` can but is harder to reverse mid-way. Pick the approach that lets you interrupt.

## 7. Touch targets and the iOS zoom

Two things break on phones that you will never see on a laptop:

- **Inputs under 16px zoom the page on iOS Safari.** Keep input text at 16px on coarse pointers even if your theme is 15px elsewhere. A single `@media (pointer: coarse)` rule covers it.
- **Tap targets under 44px miss.** Buttons can be 32px tall on desktop and grow on touch screens through the same media query.

## 8. Right-to-left

If you ever ship to Arabic or Hebrew users, every `ml-` and `pl-` and `left-` in your components is a bug. Use logical properties: `ms-`, `ps-`, `start-`. shadcn/ui added RTL support in January 2026, so new components you pull are fine, but the ones you copied in 2024 are not.

## Where this leaves you

None of these is hard. All of them together is a few weeks of work on a component set the size of shadcn/ui, and the work is invisible when it is done, which is why it gets cut.

I built [HextaUI](https://hextaui.com) because I kept doing this work on every project. It is a free, MIT-licensed registry you add to a shadcn/ui project. Same CLI, same component names, same theme tokens, and every one of the states above already handled, down to the 150ms spinner delay. If you would rather own the code and write the states yourself, the hooks are standalone and you can install just those.

```bash
npx shadcn@latest add https://hextaui.com/r/use-button-feedback.json
```

## FAQ

**Should I disable a button while loading?** Set `aria-busy="true"` and ignore clicks. `disabled` removes it from the tab order and hides it from screen readers mid-action.

**How long should a success state show?** About two seconds, longer if the pointer is still on the control. Errors about four seconds.

**Is a skeleton always better than a spinner?** A skeleton is better when you know the shape of what is coming. A spinner is better for actions. Both need the 150ms delay.

**Does reduced motion mean I should remove all animation?** No. Replace movement with fades, stop loops and shorten durations. Keep the information.
