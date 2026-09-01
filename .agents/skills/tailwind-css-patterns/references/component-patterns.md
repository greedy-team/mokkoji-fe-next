# Component Patterns

## Button

```tsx
// Primary button
<button type="button" className="bg-primary-500 text-white body-medium px-4 py-2 rounded-lg hover:bg-primary-300 active:bg-primary-500/80 disabled:bg-disabled disabled:text-text-tertiary disabled:cursor-not-allowed cursor-pointer transition-colors">
  Register club
</button>

// Outline button
<button type="button" className="border border-text-tertiary text-text-secondary body-medium px-4 py-2 rounded-lg hover:border-primary-500 hover:text-text-primary active:bg-primary-500/10 cursor-pointer transition-colors">
  Cancel
</button>

// Ghost button
<button type="button" className="text-text-secondary body-medium px-3 py-1.5 rounded-md hover:text-text-primary hover:bg-primary-500/10 cursor-pointer transition-colors">
  More
</button>
```

## Card

```tsx
// Basic card
<div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
  ...
</div>

// Hover effect card
<div className="bg-white rounded-2xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
  ...
</div>

// Clickable card (link)
<Link href={`/club/${id}`} className="block bg-white rounded-2xl border border-border p-4 hover:border-primary-500 transition-colors">
  ...
</Link>
```

## Tag / Badge

```tsx
// Primary tag
<span className="inline-flex items-center bg-primary-500/20 text-primary-500 label-medium px-2 py-0.5 rounded-full">
  Recruiting
</span>

// Gray tag
<span className="inline-flex items-center bg-text-tertiary/20 text-text-secondary label-medium px-2 py-0.5 rounded-full">
  Closed
</span>

// Alert tag
<span className="inline-flex items-center bg-alert-500/20 text-alert-500 label-medium px-2 py-0.5 rounded-full">
  Closing soon
</span>
```

## Input Field

```tsx
// Basic input
<input
  type="text"
  className="w-full border border-text-tertiary rounded-lg px-3 py-2 body-regular text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:outline-none transition-colors"
  placeholder="Search club name"
/>

// Error state
<input
  type="text"
  className="w-full border border-alert-500 rounded-lg px-3 py-2 body-regular text-text-primary focus:outline-none"
/>
<p className="description-regular text-alert-500 mt-1">Required field.</p>
```

## Divider

```tsx
<hr className="border-t border-border" />
<div className="h-px bg-border" />
```

## Skeleton Loading

```tsx
// Text skeleton
<div className="h-4 bg-text-tertiary/20 rounded animate-pulse" />

// Image skeleton
<div className="w-full aspect-video bg-text-tertiary/20 rounded-xl animate-pulse" />

// Card skeleton
<div className="bg-white rounded-2xl border border-border p-4 space-y-3">
  <div className="h-6 bg-text-tertiary/20 rounded animate-pulse w-3/4" />
  <div className="h-4 bg-text-tertiary/20 rounded animate-pulse w-1/2" />
</div>
```

## Empty State

```tsx
<div className="flex flex-col items-center justify-center py-16 gap-3">
  <p className="body-medium text-text-tertiary">No clubs found.</p>
  <button type="button" className="description-medium text-primary-500 hover:underline cursor-pointer">
    Register a club
  </button>
</div>
```
