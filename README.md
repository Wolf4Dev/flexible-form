# Flexible Form

A professional Next.js application with TypeScript, Tailwind CSS, shadcn/ui, and best practices.

## 🚀 Tech Stack

- **Framework:** Next.js 15.1.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (36+ components)
- **Package Manager:** pnpm
- **Code Quality:** ESLint, Prettier, Husky
- **Validation:** Zod
- **Icons:** Lucide React

## 📁 Project Structure

```
flexible-form/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── features/       # Feature-specific components
│   │   └── layouts/        # Layout components
│   ├── lib/                # Library code and utilities
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # Application constants
│   ├── config/             # Configuration files
│   └── styles/             # Global styles
├── public/                 # Static assets
└── ...config files
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (installed globally)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

Build for production:

```bash
pnpm build
```

### Other Commands

```bash
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint errors
pnpm format        # Format code with Prettier
pnpm format:check  # Check code formatting
pnpm type-check    # TypeScript type checking
```

## 🎨 Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for running linters on staged files

## 📝 Features

- ✅ TypeScript with strict mode
- ✅ Path aliases configured (@/...)
- ✅ Tailwind CSS for styling
- ✅ **36+ shadcn/ui components**
- ✅ Professional folder structure
- ✅ Code quality tools (ESLint, Prettier)
- ✅ Git hooks with Husky
- ✅ Environment variables setup
- ✅ Reusable components and hooks
- ✅ API client utility
- ✅ Type-safe development

## 🎨 shadcn/ui Components Installed

### Form Components
- Button, Input, Label, Textarea
- Select, Checkbox, Radio Group, Switch
- Form (with React Hook Form integration)

### Layout Components
- Card, Separator, Tabs
- Accordion, Aspect Ratio
- Scroll Area, Table

### Feedback Components
- Alert, Alert Dialog, Toast
- Dialog, Popover, Hover Card
- Progress, Skeleton

### Navigation Components
- Dropdown Menu, Context Menu
- Menubar, Navigation Menu
- Command, Tooltip

### Display Components
- Avatar, Badge
- Calendar, Slider, Toggle

### Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js
