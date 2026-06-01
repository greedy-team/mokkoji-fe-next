# Design System — Mokkoji Tokens & Rules

Token definition location: `src/app/theme.css` (@theme block)

---

## 1. Color Tokens

```css
/* Primary (mokkoji green) */
--color-primary-500: #00e457   /* Main action, emphasis */
--color-primary-300: #93f3b8   /* Hover state, light emphasis */

/* Text */
--color-text-primary:   #000000   /* Heading, main text */
--color-text-secondary: #474747   /* Body text */
--color-text-tertiary:  #9f9f9f   /* Placeholder, inactive text */

/* Semantic */
--color-alert-500: #ff383c   /* Error, warning */
--color-disabled:  #cccccc   /* Disabled state */

/* Dark mode specific */
--color-darkmode-line: #43E780
--color-darkmode-tag:  #1AE166
--color-lightmode-tag: #4AF38A
```

> [Note] **Black scale direction**: Higher number = darker (0=white, 500=black)
> [Note] **Primary/Yellow scale**: Higher number = darker (300=light, 500=dark)
> [Note] **Blue scale**: Higher number = darker (50=light, 300=dark)

### Existing Black/Blue/Yellow Scale (see design-system/references/color-scale-guide.md)

This project maintains compatibility with existing Composite Dev design system, also using Black/Blue/Yellow scales.
If token not in `theme.css`, check `color-scale-guide.md` for hex values and use them.

---

## 2. Typography Classes

Custom classes defined with Tailwind `@layer utilities`.
Choose from combinations of `font-size` / `font-weight`.

### Heading

| Class | Size | Weight |
|-------|------|--------|
| `h1-bold` | 28px | 700 |
| `h1-semibold` | 28px | 600 |
| `h1-medium` | 28px | 500 |
| `h2-bold` | 24px | 700 |
| `h2-semibold` | 24px | 600 |
| `h2-medium` | 24px | 500 |
| `h3-bold` | 20px | 700 |
| `h3-semibold` | 20px | 600 |
| `h3-medium` | 20px | 500 |

### Body / Description / Label / Caption

| Class | Size | Weight |
|-------|------|--------|
| `body-bold` | 16px | 700 |
| `body-semibold` | 16px | 600 |
| `body-medium` | 16px | 500 |
| `body-regular` | 16px | 400 |
| `description-semibold` | 14px | 600 |
| `description-medium` | 14px | 500 |
| `description-regular` | 14px | 400 |
| `label-semibold` | 12px | 600 |
| `label-medium` | 12px | 500 |
| `label-regular` | 12px | 400 |
| `caption-semibold` | 10px | 600 |
| `caption-medium` | 10px | 500 |
| `caption-regular` | 10px | 400 |

> Usage example: `<p className="body-regular text-text-secondary">...</p>`

---

## 3. State Color Rules ("One Step Lower" Principle)

### Core Principle: "One Step Lower"

Use **one step lower number** from DEFAULT color for hover.

```
DEFAULT: primary-500  →  HOVER: primary-300
DEFAULT: blue-300     →  HOVER: blue-200
DEFAULT: black-400    →  HOVER: black-300
DEFAULT: yellow-500   →  HOVER: yellow-400
```

### Primary Button (primary-500 based)

| State | Class |
|-------|--------|
| DEFAULT | `bg-primary-500 text-white` |
| hover | `hover:bg-primary-300` |
| active | `active:bg-primary-500/80` |
| disabled | `disabled:bg-disabled disabled:text-text-tertiary disabled:cursor-not-allowed` |

### Outline Button

| State | Class |
|-------|--------|
| DEFAULT | `border border-text-tertiary text-text-secondary` |
| hover | `hover:border-primary-500 hover:text-text-primary` |
| active | `active:bg-primary-500/10` |
| disabled | `disabled:border-disabled disabled:text-text-tertiary disabled:cursor-not-allowed` |

### Ghost Button

| State | Class |
|-------|--------|
| DEFAULT | `text-text-secondary` |
| hover | `hover:text-text-primary hover:bg-primary-500/10` |
| active | `active:bg-primary-500/20` |

### Input

| State | Class |
|-------|--------|
| DEFAULT | `border border-text-tertiary text-text-primary` |
| focus | `focus:border-primary-500 focus:outline-none` |
| placeholder | `placeholder:text-text-tertiary` |
| disabled | `disabled:bg-disabled/20 disabled:text-text-tertiary disabled:cursor-not-allowed` |

### Hover Rule (Black/Blue/Yellow Scale)

| DEFAULT | HOVER |
|---------|-------|
| `blue-300` | `blue-200` |
| `blue-200` | `blue-100` |
| `black-500` | `black-400` |
| `black-400` | `black-300` |
| `yellow-500` | `yellow-400` |
| `yellow-400` | `yellow-300` |

**Exception**: DEFAULT `black-0` → HOVER `black-100`

### Active (Pressed) Rule

When active exists, use one step higher than DEFAULT:

```
DEFAULT: blue-300  →  HOVER: blue-200  →  ACTIVE: blue-400
DEFAULT: primary-500 → HOVER: primary-300 → ACTIVE: primary-500/80
```

---

## 4. Utility Classes

```tsx
// Gradient background
<div className="bg-gradient-primary">...</div>

// Selection highlight (::selection)
// Defined in globals.css: #22cf6460 background, white text
```

---

## 5. Variant Inference Rules (PNG only)

1. **If PNG has variant UIs side-by-side** → Visually analyze each state
2. **If only single state shown** → Apply state rules above to auto-generate other states
3. **If CSS provided** → Extract colors from CSS, reverse-engineer to tokens

---

## 6. Tailwind Implementation Pattern

### Color Token Usage

```tsx
// [Recommended] Use @theme token directly
className="text-text-primary"
className="bg-primary-500"
className="border-text-tertiary"

// [Forbidden] Direct hex (when token exists)
className="text-[#000000]"
className="bg-[#00e457]"
```

> Design system colors only. Colors not in system can use `bg-[#FF0000]` format as exception.

### State Combination Example (Primary Button)

```tsx
className={cn(
  "bg-primary-500 text-white",
  "hover:bg-primary-300",
  "active:bg-primary-500/80",
  "disabled:bg-disabled disabled:text-text-tertiary disabled:cursor-not-allowed",
  "cursor-pointer"
)}
```

---

Detailed scale rules: [references/color-scale-guide.md](./references/color-scale-guide.md)
