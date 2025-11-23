Fix improper spacing utilities in your codebase.

Tailwind utility classes like `space-x-*`, `space-y-*`, or hardcoded margin utilities (`mb-*`, `mr-*`, `ml-*`, `mt-*`) should not be used for spacing. Instead, use flexible layout containers with `flex`, `flex-col`/`flex-row`, and the appropriate `gap-*` utilities.

### Steps:

1. **Find improper spacing:**  
   Search your codebase for usages of:
   - `space-x-`
   - `space-y-`
   - `mb-`
   - `mr-`
   - `ml-`
   - `mt-`
   - And similar hardcoded spacing utilities

   Example grep command (case-insensitive, recursive in `src/`):

   ```
   grep -Er "space-[xy]-|m[blrt]-" src/
   ```

2. **Refactor spacing:**  
   For each instance:
   - Replace `space-x-N` or `space-y-N` on a parent element with:
     - `flex flex-row gap-N` (for horizontal spacing)
     - `flex flex-col gap-N` (for vertical spacing)
     - Adjust for layout direction as needed.
   - For hardcoded margin utilities between siblings:
     - Remove per-child margins and move to a `gap-*` utility on their flex/grid parent.
     - Example:

       ```jsx
       {/* BAD */}
       <div className="mb-4">First</div>
       <div className="mb-4">Second</div>

       {/* GOOD */}
       <div className="flex flex-col gap-4">
         <div>First</div>
         <div>Second</div>
       </div>
       ```

3. **Verify layouts:**
   - Check affected UIs to ensure spacing and alignment look correct after refactor.

4. **Repeat:**
   - Ensure all such spacing utilities are removed throughout the codebase.

> **NEVER:** Use `space-x-`, `space-y-`, or hardcoded margin utilities for spacing.  
> **ALWAYS:** Use flex/grid and `gap-*` utilities for spacing between elements.