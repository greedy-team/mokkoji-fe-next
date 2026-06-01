# Color Scale Guide — Detailed Reference

## Complete Color Scale Map

### Black (Light → Dark)

```
0   #fefefe  ← Background, card background, white icon
50  #e5e5e5  ← Disabled background, divider line
100 #d0d0d0  ← Placeholder text, disabled text, secondary border
200 #a0a0a0  ← Inactive icon, secondary placeholder
300 #6b6b6b  ← Secondary text, caption, sub-label
400 #363636  ← Body text, standard label
500 #000000  ← Emphasized text, heading, focus state
```

### Blue (Light → Dark)

```
50  #e0e1eb  ← Blue background tint, selected row background
100 #b4b9e7  ← Hover entry step 2, inactive icon
200 #707ce0  ← Hover state, focus ring
300 #0018ec  ← Primary color base, CTA button, link
```

### Yellow (Light → Dark)

```
50  #e9e6d4  ← Yellow background tint
100 #ebe5c2  ← Hover entry step 2
200 #ebdd99  ← Secondary badge, warning background
300 #eedb77  ← Active step 2
400 #f1d858  ← Hover state
500 #f1d029  ← Secondary/Accent color base
```

---

## Complete State Transition Mapping

### Blue-based Components

| State | Background | Text |
|-------|-----------|------|
| Default | `blue-300` | `black-0` |
| Hover | `blue-200` | `black-0` |
| Active | `blue-100` | `black-500` |
| Disabled | `black-50` | `black-200` |
| Placeholder | `blue-50` | `black-200` |

### Yellow-based Components

| State | Background | Text |
|-------|-----------|------|
| Default | `yellow-500` | `black-500` |
| Hover | `yellow-400` | `black-500` |
| Active | `yellow-300` | `black-500` |
| Disabled | `black-50` | `black-200` |

### Black-based Components (Text, Icon, Border)

| State | Color | Purpose |
|-------|-------|---------|
| Default | `black-400` | General body text |
| Hover | `black-300` | Hover feedback |
| Active/Selected | `black-500` | Selection/focus emphasis |
| Placeholder | `black-200` | Inactive, hint |
| Disabled | `black-100` | Disabled state |

---

## Exception Case Handling

### 1. When Placeholder is Grayscale

If placeholder text in an input field appears gray in PNG:
```tsx
// Default — use black-200
className="placeholder:text-[--color-black-200]"

// For lighter hint text — use black-100
className="placeholder:text-[--color-black-100]"
```

### 2. Outline/Ghost Button (No Background)

```tsx
// Outline (border only)
// Default: border blue-300, text blue-300
// Hover: border blue-200, text blue-200, bg blue-50
className={cn(
  "border border-[--color-blue-300] text-[--color-blue-300]",
  "hover:border-[--color-blue-200] hover:text-[--color-blue-200] hover:bg-[--color-blue-50]"
)}
```

### 3. Icon-only Button (No Text)

Apply the same rules to icon color:
```tsx
// Default: black-400 icon → Hover: black-300
className="text-[--color-black-400] hover:text-[--color-black-300]"
```

### 4. Border Color State

Border changes in the same direction:
```tsx
// Strengthens on focus (black-100 → black-400)
className="border-[--color-black-100] focus:border-[--color-black-400]"

// Error state uses red scale, but use black-500 if unavailable
```

---

## Quick Reference for Color Step Calculation

To quickly calculate hover/active for any color:

```
Input: blue-300 (DEFAULT)
  → hover:  blue-300 - 100 = blue-200
  → active: blue-300 - 200 = blue-100

Input: yellow-500 (DEFAULT)
  → hover:  yellow-500 - 100 = yellow-400
  → active: yellow-500 - 200 = yellow-300

Input: black-400 (DEFAULT)
  → hover:  black-400 - 100 = black-300
  → active: black-400 - 200 = black-200
```

> Black-0 is excluded from step calculation. Used only for white background/text purposes.
