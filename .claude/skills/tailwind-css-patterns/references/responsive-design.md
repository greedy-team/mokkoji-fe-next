# Responsive Design Patterns

## Breakpoints (Mobile First)

| prefix | Min width | Target device |
|--------|-----------|---------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide |

## Mokkoji Mobile App Pattern

Mokkoji uses mobile app style layout:

```tsx
// Max width 390px (mobile app width limit)
<div className="max-w-[390px] mx-auto min-h-screen">

// Full width on mobile, constrained on desktop
<div className="w-full lg:max-w-screen-md lg:mx-auto">
```

## Layout Transition Pattern

```tsx
// Mobile: vertical / Desktop: horizontal
<div className="flex flex-col md:flex-row gap-4">

// Mobile: 1 column / Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Mobile: hidden / Desktop: visible
<div className="hidden md:block">
<div className="md:hidden">
```

## Responsive Text Size

```tsx
// Mobile: small / Desktop: large
<h1 className="h3-bold md:h2-bold lg:h1-bold">

// Mobile body, desktop emphasis
<p className="description-regular md:body-regular">
```

## Responsive Spacing

```tsx
<div className="p-4 md:p-6 lg:p-8">
<div className="gap-2 md:gap-4">
```

## Responsive Images

```tsx
// Next.js Image with fill
<div className="relative w-full aspect-video">
  <Image src={src} alt={alt} fill className="object-cover rounded-xl" />
</div>

// Different aspect ratios
className="aspect-square"      // 1:1
className="aspect-[4/3]"       // 4:3
className="aspect-[16/9]"      // 16:9
```
