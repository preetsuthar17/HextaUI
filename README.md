# Build stunning websites effortlessly

Modern, responsive, customizable UI components for Next.js. Copy, adapt, and personalize them.

![Alt](https://repobeats.axiom.co/api/embed/5cd513309dd1bc807edd35a7da0044e27506ed5e.svg "Repobeats analytics image")

## Contribution Guide

### Run Locally

Clone the project

```bash
  git clone https://github.com/preetsuthar17/HextaUI.git
```

Go to the project directory

```bash
  cd HextaUI
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Environment variables

To run the project, you need to create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
```

[Managing GitHub tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### File structure

```bash
┣ components
┃ ┣ library
┃ ┃ ┣ category 1
┃ ┃ ┃ ┣ Component1.tsx
┃ ┃ ┃ ┣ Component2.tsx
┃ ┃ ┃ ┣ Component3.tsx
┃ ┃ ┣ category 2
┃ ┃ ┃ ┣ Component1.tsx
┃ ┃ ┃ ┣ Component2.tsx
┃ ┃ ┣ Component3.tsx
┣ content
┃ ┣ docs
┃ ┃ ┣ category 1
┃ ┃ ┃ ┣ Component1.mdx
┃ ┃ ┃ ┣ Component2.mdx
┃ ┃ ┃ ┣ Component3.mdx
┃ ┃ ┣ category 2
┃ ┃ ┃ ┣ Component1.mdx
┃ ┃ ┃ ┣ Component2.mdx
┃ ┃ ┃ ┣ Component3.mdx
```

### Code Structure

Suppose you are adding new component called `Component1`. Create new file in `components/library/category/Component1.tsx`

Choose the category that best fits your component. If you are unsure, you can google the component name to see which category it falls under.

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

this is how basic component code should look like. You can add your own styles and logic as per your requirement.

### Docs Structure

Just like you created a new file in `components/library/category/Component1.tsx`, create a new file in `content/docs/category/component-1.mdx`

````mdx
---
title: Component 1
description: This is a sample component.
new: true
---

import { Component1 } from "@/components/library/category/Component1";
import { PreviewContainer } from "@/components/PreviewContainer";

## Preview

<PreviewContainer>
  <Component1 />
</PreviewContainer>

## Install Component

```bash tab="CLI" title="NPM"
{/* keep this empty */}
```

```tsx tab="Manually" title="Component1.tsx"
// Code for your component file
```

## Usage

```tsx title="App.tsx"
// Usage of your component
```

## License

Licensed under the [MIT license.](https://github.com/preetsuthar17/HextaUI/blob/master/LICENSE)

# Star History

[![Star History Chart](https://api.star-history.com/svg?repos=preetsuthar17/HextaUI&type=Date)](https://star-history.com/#preetsuthar17/HextaUI&Date)
````
