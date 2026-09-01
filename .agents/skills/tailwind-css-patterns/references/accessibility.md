# Accessibility Patterns

## Focus Management

```tsx
// Keyboard focus ring
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"

// Hide mouse click focus, show keyboard only
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
```

## Screen Reader

```tsx
// Visually hidden but read by screen reader
<span className="sr-only">Add club to favorites</span>

// Hidden from screen reader (decorative)
<span aria-hidden="true">★</span>
```

## Button and Interactive Elements

```tsx
// Button: type must be explicit
<button type="button" className="cursor-pointer" aria-label="Open menu">
<button type="submit" className="cursor-pointer">

// Toggle button
<button
  type="button"
  aria-pressed={isActive}
  className={cn("cursor-pointer", isActive && "bg-primary-500")}
>

// Disabled button
<button type="button" disabled className="cursor-not-allowed opacity-50">
```

## Images

```tsx
// Meaningful image (alt required)
<Image src={clubImg} alt="Mokkoji club representative image" width={200} height={200} />

// Decorative image (alt empty string)
<Image src={decorativeImg} alt="" width={20} height={20} aria-hidden="true" />
```

## Form Elements

```tsx
// Connect label and input
<label htmlFor="search-input" className="sr-only">Search clubs</label>
<input id="search-input" type="text" aria-label="Search clubs" />

// Connect error message
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
<p id="email-error" role="alert" className="text-alert-500 label-regular">
  {error}
</p>
```

## Modal/Dialog

```tsx
// Use Radix UI Dialog (accessibility built-in)
import * as Dialog from '@radix-ui/react-dialog';

// Focus trap, Esc close, aria-modal auto-handled
```

## Navigation

```tsx
// Indicate current page
<a href="/search" aria-current="page" className="text-primary-500">Search</a>

// Navigation landmark
<nav aria-label="Main menu">
  <ul>...</ul>
</nav>
```

## Loading State

```tsx
// Announce loading state
<div aria-live="polite" aria-atomic="true">
  {isLoading && <span className="sr-only">Loading...</span>}
</div>

// Spinner
<div role="status" aria-label="Loading">
  <DotsPulseLoader />
</div>
```
