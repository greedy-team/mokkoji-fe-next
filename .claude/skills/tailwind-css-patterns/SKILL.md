# Tailwind CSS Patterns — Implementation Pattern Reference

This skill is a collection of patterns to reference when implementing with Tailwind CSS v4.

## Key Reference Documents

- [Layout Patterns](./references/layout-patterns.md) — flex, grid, responsive layouts
- [Component Patterns](./references/component-patterns.md) — button, card, input common patterns
- [Animations](./references/animations.md) — transition, keyframe, motion patterns
- [Responsive Design](./references/responsive-design.md) — breakpoints, mobile-first
- [Accessibility](./references/accessibility.md) — keyboard navigation, screen reader, ARIA
- [Performance](./references/performance.md) — JIT, purge, bundle optimization

---

## Core Pattern Summary

### 1. Tailwind v4 @theme Token Usage

```css
/* src/app/theme.css */
@theme {
  --color-primary-500: #00e457;
  --color-text-primary: #000000;
}
```

```tsx
/* Use directly as utility */
className="bg-primary-500 text-text-primary"
```

### 2. cn Function (Conditional Class Merge)

```tsx
import { cn } from '@/shared/lib/utils';

className={cn(
  "base-class another-class",
  isActive && "active-class",
  variant === 'primary' && "primary-class",
  className  // External className passed
)}
```

### 3. cva (Variant Component)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const tagVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 label-medium',
  {
    variants: {
      color: {
        green: 'bg-primary-500/20 text-primary-500',
        gray:  'bg-text-tertiary/20 text-text-secondary',
        red:   'bg-alert-500/20 text-alert-500',
      },
    },
    defaultVariants: { color: 'green' },
  }
);
```

### 4. Responsive Pattern (Mobile First)

```tsx
// Base: mobile / sm:, md:, lg: order
className="flex-col sm:flex-row"
className="text-sm md:text-base"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 5. Transition Pattern

```tsx
// Color change
className="transition-colors duration-200"

// All properties
className="transition-all duration-300 ease-in-out"

// Mokkoji defined animation (globals.css)
className="animate-fade-left"
className="animate-scale-in"
className="animate-slide-in-left"
```

### 6. Accessibility Pattern

```tsx
// Focus ring (keyboard navigation)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"

// Screen reader only text
<span className="sr-only">Description</span>

// Clickable element
<button type="button" className="cursor-pointer" aria-label="Add to favorites">
```

### 7. Overflow Handling

```tsx
// Text truncate
className="truncate"               // Single line
className="line-clamp-2"           // Two lines (defined in globals.css)

// Scroll
className="overflow-y-auto"
className="overflow-x-hidden"
```

### 8. Dark Mode

```tsx
// @custom-variant dark (&:is(.dark *)) method (globals.css)
className="bg-white dark:bg-black"
className="text-text-primary dark:text-darkmode-line"
```
