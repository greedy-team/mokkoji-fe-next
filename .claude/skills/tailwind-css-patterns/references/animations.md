# Animation Patterns

## Mokkoji Project Defined Animations (globals.css)

```tsx
// Left→right slide fade-in
className="animate-fade-left"       // opacity 0 + translateX(-40px) → 1 + 0
className="animate-fade-left-2"     // opacity 0 + translateX(-100px) → 1 + 0

// Right→left clip animation
className="reveal-rightToleft"

// Fade-in
className="reveal"                  // delay: 0.2s
className="reveal-0"                // delay: 0.3s
className="reveal-1"                // delay: 0.6s
className="reveal-2"                // delay: 0.9s

// Laptop 3D open animation
className="laptop"

// Slide-in
className="animate-slide-in-left"
className="animate-slide-in-right"

// Scale
className="animate-scale-in"
className="animate-scale-out"

// Up-down movement (scroll button)
className=".animate-up-down"
```

## @theme Animations (Use CSS variables directly)

```tsx
// Horizontal rolling banner
className="animate-[rolling_20s_linear_infinite]"
className="animate-[rolling-reverse_20s_linear_infinite]"

// Fade-in
className="animate-[reveal_0.3s_ease-out_forwards]"

// Scale-up entrance
className="animate-[scale-in_0.2s_ease-out_forwards]"
```

## Tailwind Default Transitions

```tsx
// Color change (for hover state conversion)
className="transition-colors duration-200"

// Smooth all property change
className="transition-all duration-300 ease-in-out"

// Opacity change
className="transition-opacity duration-200"

// Transform change (movement, scaling)
className="transition-transform duration-300"
```

## Conditional Animation Pattern

```tsx
// Toggle animation based on state
<div className={cn(
  "transition-all duration-300",
  isOpen ? "animate-scale-in opacity-100" : "opacity-0 pointer-events-none"
)}>
```

## Motion Reduction Accessibility

```tsx
// Respect motion-sensitive users
className="motion-reduce:animate-none motion-reduce:transition-none"
```
