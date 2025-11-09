# Contributing Guide

This guide explains how to add new blocks and components to HextaUI.

## Table of Contents

- [Adding a New Block](#adding-a-new-block)
- [Adding a New Component](#adding-a-new-component)
- [File Structure](#file-structure)

---

## Adding a New Block

Blocks are complex, feature-rich components organized by category (AI, Auth, Billing, Settings).

### Step 1: Create Component Files

Create the component file in two locations:

1. **Main component** (used in the app):
   ```
   components/blocks/{category}/{block-id}.tsx
   ```
   Example: `components/blocks/ai/ai-new-feature.tsx`

2. **Registry component** (for shadcn registry):
   ```
   registry/new-york/blocks/{category}/{block-id}.tsx
   ```
   Example: `registry/new-york/blocks/ai/ai-new-feature.tsx`

**Note:** Both files should contain the same component code. The registry file is used for the shadcn CLI, while the components file is used in the application.

### Step 2: Update Blocks Registry

Edit `lib/blocks-registry.tsx`:

1. **Import the component** at the top:
   ```tsx
   import AINewFeature from "@/components/blocks/ai/ai-new-feature";
   ```

2. **Add to `blocksList`** array (in the appropriate category section):
   ```tsx
   {
     id: "ai-new-feature",
     title: "New Feature",
     description: "Description of what this block does.",
     category: "ai", // or "auth", "billing", "settings"
   },
   ```

3. **Add to `blockComponents`** mapping:
   ```tsx
   "ai-new-feature": AINewFeature,
   ```

### Step 3: Add Example Props

Edit `lib/block-examples.tsx`:

Add a new case in the `getBlockExampleProps` function:

```tsx
case "ai-new-feature": {
  return {
    // Add example props matching your component's interface
    prop1: "value1",
    prop2: 123,
    onAction: () => {
      /* example action */
    },
  };
}
```

### Step 4: Add Usage Snippets

Edit `lib/block-snippets.ts`:

Add a new entry in the `blockSnippets` object:

```tsx
"ai-new-feature": {
  usageImports: `import AINewFeature from "@/components/blocks/ai/ai-new-feature";`,
  usageCode: `<AINewFeature
  prop1="value1"
  prop2={123}
  onAction={() => {
    /* handle action */
  }}
/>`,
},
```

### Step 5: Update Registry JSON

Edit `registry.json`:

Add a new entry in the `items` array (after the UI components, with other blocks):

```json
{
  "name": "ai-new-feature",
  "type": "registry:component",
  "title": "New Feature",
  "description": "Description of what this block does.",
  "registryDependencies": [
    "button",
    "card",
    "input-group"
  ],
  "files": [
    {
      "path": "registry/new-york/blocks/ai/ai-new-feature.tsx",
      "type": "registry:component"
    }
  ]
}
```

**Important:** 
- List all UI components used in `registryDependencies` (e.g., `button`, `card`, `dialog`, etc.)
- Use the registry file path (`registry/new-york/blocks/...`)
- Verify dependencies match actual imports from `@/components/ui/`

### Step 6: Verify

1. Check that the block appears in `/blocks` page
2. Check that the block page loads at `/blocks/ai-new-feature`
3. Verify the demo works with example props
4. Verify usage examples display correctly

---

## Adding a New Component

Components are foundation UI elements (like Button, Card, Dialog, etc.).

### Step 1: Create Component File

Create the component in the registry:

```
registry/new-york/ui/{component-id}.tsx
```

Example: `registry/new-york/ui/new-component.tsx`

### Step 2: Update Components Registry

Edit `lib/components-registry.tsx`:

1. **Import the demo component** (if you have one):
   ```tsx
   import NewComponentDemo from "@/components/demo/new-component-demo";
   ```

2. **Add to `componentsList`** array:
   ```tsx
   {
     id: "new-component",
     title: "New Component",
     description: "Description of what this component does.",
   },
   ```

3. **Add to `demoComponents`** mapping (if you have a demo):
   ```tsx
   "new-component": NewComponentDemo,
   ```

### Step 3: Add Usage Snippets

Edit `lib/registry/snippets.ts`:

Add a new entry in the `componentSnippets` object:

```tsx
"new-component": {
  usageImports: `import { NewComponent } from "@/components/ui/new-component"`,
  usageCode: `<NewComponent>
  Content here
</NewComponent>`,
  demoCode: `"use client";

import { NewComponent } from "@/components/ui/new-component";

export function NewComponentDemo() {
  return (
    <NewComponent>
      Demo content
    </NewComponent>
  );
}`,
},
```

### Step 4: Update Registry JSON

Edit `registry.json`:

Add a new entry in the `items` array (with other UI components):

```json
{
  "name": "new-component",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-..."],
  "registryDependencies": ["button"],
  "files": [
    {
      "path": "registry/new-york/ui/new-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

**Important:**
- Add external npm dependencies in `dependencies` (e.g., `@radix-ui/react-dialog`)
- Add registry component dependencies in `registryDependencies` (e.g., `button`, `card`)
- Only include dependencies that are actually imported and used

### Step 5: Verify

1. Check that the component appears in `/components` page
2. Check that the component page loads at `/components/new-component`
3. Verify the demo works
4. Verify usage examples display correctly

---

## File Structure

```
HextaUI/
├── components/
│   ├── blocks/              # Block components (used in app)
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── billing/
│   │   └── settings/
│   └── ui/                   # UI components (from registry)
├── registry/
│   └── new-york/
│       ├── blocks/           # Block registry files
│       │   ├── ai/
│       │   ├── auth/
│       │   ├── billing/
│       │   └── settings/
│       └── ui/               # Component registry files
├── lib/
│   ├── blocks-registry.tsx   # Block metadata and mapping
│   ├── block-examples.tsx    # Example props for blocks
│   ├── block-snippets.ts     # Usage examples for blocks
│   ├── components-registry.tsx # Component metadata and mapping
│   └── registry/
│       └── snippets.ts       # Usage examples for components
└── registry.json             # Shadcn registry configuration
```

---

## Quick Checklist

### For Blocks:
- [ ] Component file in `components/blocks/{category}/`
- [ ] Registry file in `registry/new-york/blocks/{category}/`
- [ ] Added to `blocksList` in `lib/blocks-registry.tsx`
- [ ] Added to `blockComponents` mapping
- [ ] Added example props in `lib/block-examples.tsx`
- [ ] Added usage snippets in `lib/block-snippets.ts`
- [ ] Added entry to `registry.json` with correct dependencies

### For Components:
- [ ] Component file in `registry/new-york/ui/`
- [ ] Added to `componentsList` in `lib/components-registry.tsx`
- [ ] Added demo component (if needed)
- [ ] Added usage snippets in `lib/registry/snippets.ts`
- [ ] Added entry to `registry.json` with correct dependencies

---

## Tips

1. **Naming Convention:**
   - Blocks: `{category}-{feature}` (e.g., `ai-chat-history`, `auth-login-form`)
   - Components: `{feature}` (e.g., `button`, `card`, `dialog`)

2. **Dependencies:**
   - Always verify `registryDependencies` match actual imports
   - Use the audit script to check for missing/extra dependencies
   - Only include UI components from `@/components/ui/`

3. **Example Props:**
   - Make examples realistic and practical
   - Include all required props
   - Use proper TypeScript types

4. **Usage Snippets:**
   - Keep snippets concise but complete
   - Show the most common use case
   - Include necessary imports

5. **Testing:**
   - Always test the component/block after adding
   - Verify the demo works
   - Check that all pages load correctly

---

## Need Help?

If you encounter issues:
1. Check existing blocks/components for reference
2. Verify all file paths are correct
3. Ensure TypeScript types match
4. Run the linter to catch errors
5. Check the browser console for runtime errors

