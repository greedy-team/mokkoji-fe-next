# Component Codegen — Code Generation Standard

## 1. Server Component vs Client Component

Next.js App Router default rules:
- **Default is Server Component** — data fetching, static rendering
- **`'use client'` needed when**: `useState`, `useEffect`, event handlers, browser APIs, `useRouter`, `useParams`

```tsx
// Server Component (default — no 'use client')
function ClubCard({ name, description }: ClubCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="body-semibold text-text-primary">{name}</h3>
      <p className="description-regular text-text-secondary">{description}</p>
    </div>
  );
}

// Client Component (interaction needed)
'use client';

function FavoriteButton({ clubId }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const handleClick = () => setIsFavorited(!isFavorited);
  return (
    <button type="button" onClick={handleClick} className="cursor-pointer">
      ...
    </button>
  );
}
```

---

## 2. Basic Component Template

### Simple Component (no variant)

```tsx
// src/shared/ui/SectionHeader.tsx
import { cn } from '@/shared/lib/utils';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <h2 className="h2-semibold text-text-primary">{title}</h2>
    </div>
  );
}

export default SectionHeader;
```

### Variant Component (cva)

```tsx
// src/shared/ui/Button.tsx
'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors cursor-pointer focus-visible:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-300 active:bg-primary-500/80 disabled:bg-disabled disabled:text-text-tertiary',
        outline: 'border border-text-tertiary text-text-secondary hover:border-primary-500 hover:text-text-primary active:bg-primary-500/10 disabled:border-disabled disabled:text-text-tertiary',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-primary-500/10 active:bg-primary-500/20',
      },
      size: {
        sm: 'h-8 px-3 description-regular',
        md: 'h-10 px-4 body-regular',
        lg: 'h-12 px-5 body-semibold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

export default Button;
```

---

## 3. File Structure Rules (FSD)

> Folder name: kebab-case / New file name: PascalCase
> [Note] When modifying existing file: maintain that file's existing naming style

```
src/
├── shared/
│   └── ui/                          ← Atomic UI (single file, no subfolders)
│       └── {ComponentName}.tsx
├── features/
│   └── {domain}/
│       └── ui/
│           └── {ComponentName}.tsx  ← Domain-specific component
├── widgets/
│   └── {domain}/
│       └── ui/
│           └── {WidgetName}.tsx     ← Composite widget
├── views/
│   └── {domain}/
│       └── {ViewName}.tsx           ← Page container
└── entities/
    └── {domain}/
        └── model/
            └── types.ts             ← Domain type definitions
```

---

## 4. Naming Convention

| Target | Rule | Example |
|--------|------|---------|
| Folder name | kebab-case | `club-detail/`, `post-recruitment/` |
| New file name (.tsx) | PascalCase | `ClubCard.tsx`, `FavoriteButton.tsx` |
| Component function | PascalCase | `ClubCard`, `FavoriteButton` |
| Props interface | ComponentName + `Props` | `ClubCardProps`, `ButtonProps` |
| Custom hook file | kebab-case | `use-media-query.ts` |
| Custom hook function | camelCase | `useMediaQuery` |
| Event handler | `handle` + verb | `handleClick`, `handleSubmit` |

---

## 5. Tailwind CSS Usage Rules (v4)

- No `tailwind.config.js` → `src/app/theme.css` `@theme` block defines tokens
- Token usage: `bg-primary-500`, `text-text-primary`, `bg-gradient-primary`
- Complex variant: use `cva`
- Dynamic class composition: use `cn` (`@/shared/lib/utils`)
- Never use direct font-size/weight → use typography classes

### Prioritize Standard Classes (minimize arbitrary values)

Tailwind v4 spacing scale: 1 unit = 4px

| arbitrary value | standard class |
|-----------------|-----------------|
| `w-[520px]` | `w-130` |
| `h-[60px]` | `h-15` |
| `p-[10px]` | `p-2.5` |
| `gap-[20px]` | `gap-5` |
| `rounded-[12px]` | `rounded-xl` |

**Exception**: Multi-value (`rounded-[20px_20px_0_0]`), spacing values not on scale

---

## 6. Data Flow Principle

```
app/page.tsx (Server Component)
  → data fetching (ky, fetch, etc.)
  → pass props to views/{domain}/{ViewName}.tsx

views/{domain}/{ViewName}.tsx
  → pass props to widgets/{domain}/ui/{WidgetName}.tsx

widgets/{domain}/ui/{WidgetName}.tsx
  → combine features/{domain}/ui/ components
  → no internal fetch

shared/ui/ component
  → accept only props, no external state
```

---

## 7. Forbidden Patterns

```tsx
// [Forbidden] export function directly
export function Button({ children }: ButtonProps) { ... }

// [Recommended] correct way
function Button({ children }: ButtonProps) { ... }
export default Button;

// [Forbidden] React.FC usage
const Button: React.FC<ButtonProps> = ({ children }) => { ... };

// [Forbidden] any type
const handleData = (data: any) => { ... };

// [Forbidden] inline style
<div style={{ color: '#00e457' }}>   // forbidden
<div className="text-primary-500">   // [Recommended]

// [Forbidden] button/input without type
<button onClick={handleClick}>       // forbidden
<button type="button" onClick={handleClick}>  // [Recommended]

// [Forbidden] clickable element without cursor-pointer
<button type="button" onClick={...}>  // forbidden
<button type="button" onClick={...} className="cursor-pointer ...">  // [Recommended]

// [Forbidden] component internal fetch
function ClubCard() {
  useEffect(() => { fetch('/api/clubs') }, []);  // forbidden
}
```
