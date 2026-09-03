# Layout Patterns

## Flex Pattern

```tsx
// Horizontal layout (default)
className="flex items-center gap-3"

// Vertical layout
className="flex flex-col gap-4"

// Space between
className="flex items-center justify-between"

// Center alignment
className="flex items-center justify-center"

// Wrapping
className="flex flex-wrap gap-2"
```

## Grid Pattern

```tsx
// Dynamic columns
className="grid grid-cols-2 gap-4"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Auto-fill
className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
```

## Full-screen Layout

```tsx
// Full page height
className="min-h-screen flex flex-col"

// Sidebar + main layout
className="flex min-h-screen"
// Sidebar: className="w-64 flex-shrink-0"
// Main:    className="flex-1 overflow-hidden"
```

## Container Pattern

```tsx
// Center-aligned container
className="max-w-screen-lg mx-auto px-4"
className="container mx-auto px-4 py-8"

// Mobile full width → desktop constrained
className="w-full max-w-[390px] mx-auto"  // Mobile app width limit
```

## Positioning

```tsx
// Fixed position (header, footer)
className="fixed top-0 left-0 right-0 z-50"

// Absolute position (relative to parent)
className="relative"   // Parent
className="absolute inset-0"  // Child (fill)
className="absolute top-2 right-2"  // Child (top-right)

// Sticky
className="sticky top-0 z-10"
```

## Scroll

```tsx
// Horizontal scroll
className="overflow-x-auto scrollbar-hide"

// Vertical scroll
className="overflow-y-auto max-h-[400px]"

// Mokkoji rolling banner (use globals.css animate-rolling)
className="animate-[rolling_20s_linear_infinite]"
```
