# 🚀 Contributing

## 🛠️ Run Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/preetsuthar17/HextaUI.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd HextaUI
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in your browser:**

   Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file at the root and add:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
```

👉 [How to create a GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## 📁 Project Structure

```text
components/
  library/
    category-1/
      Component1.tsx
      Component2.tsx
      Component3.tsx
    category-2/
      Component1.tsx
      Component2.tsx
      Component3.tsx
content/
  docs/
    category-1/
      component-1.mdx
      component-2.mdx
      component-3.mdx
    category-2/
      component-1.mdx
      component-2.mdx
      component-3.mdx
```

## 🧱 Adding a New Component

### 1. Create Component File

Add your new component in the appropriate category:

```text
components/library/<category>/Component1.tsx
```

If unsure which category fits, search the component name online for context.

**Example:**

```tsx
"use client";

import * as React from "react";

const Component1 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl font-bold">Component 1</h1>
      <p className="text-lg">This is a sample component.</p>
    </div>
  );
};

export { Component1 };
```

### 2. Create Documentation File

Add documentation for your component:

```text
content/docs/<category>/component-1.mdx
```

**Template:**

````mdx
title: Component 1
description: This is a sample component.
new: true

import { Component1 } from "@/components/library/<category>/Component1";
import { PreviewContainer } from "@/components/PreviewContainer";

## Preview

<PreviewContainer>
  <Component1 />
</PreviewContainer>

## Installation

```package-install tab="CLI"
{/* Leave this blank */}
```

```tsx tab="Manually" title="Component1.tsx"
// Paste the full code of your component here
```

## Usage

```tsx title="App.tsx"
// Example usage of the component
```
````
