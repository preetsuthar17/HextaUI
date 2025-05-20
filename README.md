# 🌟 Build Stunning Websites Effortlessly
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

**HextaUI** provides modern, responsive, and customizable UI components for Next.js. Copy, adapt, and personalize them to build beautiful web interfaces with ease.

![Repobeats analytics image](https://repobeats.axiom.co/api/embed/5cd513309dd1bc807edd35a7da0044e27506ed5e.svg)

---

## 🚀 Getting Started

### 🛠️ Run Locally

Clone the repository:

```bash
git clone https://github.com/preetsuthar17/HextaUI.git
```

Navigate into the project directory:

```bash
cd HextaUI
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔐 Environment Variables

To run the project, create a `.env.local` file at the root and add:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
```

👉 [Learn how to create a GitHub token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## 📁 Project Structure

```bash
┣ components
┃ ┗ library
┃   ┣ category-1
┃   ┃ ┣ Component1.tsx
┃   ┃ ┣ Component2.tsx
┃   ┃ ┗ Component3.tsx
┃   ┗ category-2
┃     ┣ Component1.tsx
┃     ┣ Component2.tsx
┃     ┗ Component3.tsx
┣ content
┃ ┗ docs
┃   ┣ category-1
┃   ┃ ┣ component-1.mdx
┃   ┃ ┣ component-2.mdx
┃   ┃ ┗ component-3.mdx
┃   ┗ category-2
┃     ┣ component-1.mdx
┃     ┣ component-2.mdx
┃     ┗ component-3.mdx
```

---

## 🧱 Adding a New Component

### 1. Create Component File

Create your new component in the appropriate category:

```bash
components/library/<category>/Component1.tsx
```

If unsure which category fits, search the component name online for context.

#### Example

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

---

### 2. Create Documentation File

Add documentation for your component:

```bash
content/docs/<category>/component-1.mdx
```

#### Template

````mdx
---
title: Component 1
description: This is a sample component.
new: true
---

import { Component1 } from "@/components/library/<category>/Component1";
import { PreviewContainer } from "@/components/PreviewContainer";

## Preview

<PreviewContainer>
  <Component1 />
</PreviewContainer>

## Install Component

```bash tab="CLI" title="NPM"
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

---

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://chanhdai.com"><img src="https://avatars.githubusercontent.com/u/10192821?v=4?s=100" width="100px;" alt="Chánh Đại"/><br /><sub><b>Chánh Đại</b></sub></a><br /><a href="https://github.com/preetsuthar17/HextaUI/issues?q=author%3Ancdai" title="Bug reports">🐛</a> <a href="https://github.com/preetsuthar17/HextaUI/commits?author=ncdai" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

![GitHub contributors](https://img.shields.io/github/contributors/preetsuthar17/HextaUI)

---

## 📜 License

This project is licensed under the [MIT License](https://github.com/preetsuthar17/HextaUI/blob/master/LICENSE).

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=preetsuthar17/HextaUI&type=Date)](https://star-history.com/#preetsuthar17/HextaUI&Date)

Let me know if you want this split into individual files or formatted for a specific documentation tool like Docusaurus or VitePress.
