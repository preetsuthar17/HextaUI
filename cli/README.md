# HextaUI CLI

A command-line interface for installing HextaUI components in your Next.js projects.

## Installation

```bash
npx hextaui@latest init
```

## Usage

### Initialize HextaUI in your project

```bash
npx hextaui init
```

This will:

- Create `src/components/ui/` directory
- Add utility functions in `src/lib/utils.ts`

### Add components

```bash
npx hextaui add
```

This will:

- Show an interactive list of available components
- Allow you to select multiple components (press `a` to toggle all)
- Download and install selected components
- Automatically install required dependencies

### List available components

```bash
npx hextaui list
# or
npx hextaui ls
```

View all available components with descriptions.

## Available Components

- **Button** - Customizable button with variants
- **Card** - Flexible content containers
- **Input** - Styled form inputs
- **Label** - Accessible form labels
- **Avatar** - User profile avatars
- **Separator** - Visual separators
- **Tooltip** - Hover information tooltips
- **Breadcrumb** - Navigation breadcrumbs
- **Kbd** - Keyboard key display
- **Accordion** - Collapsible content sections
- **Alert** - Messages and notifications
- **Badge** - Status and label indicators
- **Calendar** - Date selection calendar
- **Checkbox** - Custom styled checkboxboxes
- **Chip** - Interactive tags and selections
- **ColorPicker** - Color selection component
- **CommandMenu** - Command palette
- **DatePicker** - Date picker with calendar
- **Drawer** - Slide-out drawer
- **DropdownMenu** - Action menus
- **FileUpload** - Drag & drop file upload
- **InputOTP** - One-time password input
- **Loader** - Loading indicators
- **MenuBar** - Application menu bar
- **Modal** - Dialog modals
- **Pagination** - Navigation pagination
- **Progress** - Progress indicators
- **Radio** - Radio button groups
- **ScrollArea** - Custom scrollable areas

## Requirements

- Next.js project
- React 18+
- Tailwind CSS v4

## Package Managers

The CLI automatically detects your package manager:

- **pnpm** (if `pnpm-lock.yaml` exists)
- **yarn** (if `yarn.lock` exists)
- **npm** (fallback)

## Project Structure

After initialization, your project will have:

```
src/
├── components/
│   └── ui/
│       └── [selected-components]
└── lib/
    └── utils.ts
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test the CLI
5. Submit a pull request

## License

MIT
