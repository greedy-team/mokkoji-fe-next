# Visual Parser — PNG + CSS Analysis Rules

## Input File Types

```
Provided:
  1. PNG file  — Component/widget image exported from Figma
  2. CSS text  — Figma "Copy as CSS" result (text or css file)

Not provided (need to infer):
  - hover / active / focus states (only shown state in PNG)
```

---

## Phase 1 — Analyze PNG

Read PNG in this order:

### 1-1. Parse Overall Structure

```
1. Outermost container size and background color
2. Horizontal/vertical layout direction (Flexbox row/column judgment)
3. Internal element placement relationship (center, space-between, etc.)
4. Gap pattern (repeated equal gaps reveal gap value)
```

### 1-2. Identify Element Types

| Visual Feature | Judgment |
|---|---|
| Rounded box + text | Button |
| Underline or border input area | Input / Textarea |
| Short rounded tag | Badge / Chip |
| Round image or initials box | Avatar |
| Checkbox shape | Checkbox |
| Toggle switch | Toggle |
| Dropdown arrow | Select |
| Card area | Card |
| Horizontal line | Divider |

### 1-3. Detect Variants

If multiple states shown side-by-side in PNG:
- Same component repeated, color/size different → `COMPONENT_SET`
- Size difference, not state → `size` variant
- Color/style difference → `variant` prop

**Single-state PNG case** → Apply `design-system` skill state rules to generate other states

---

## Phase 2 — Analyze CSS

Figma "Copy as CSS" output follows these patterns.

### Common Figma CSS → Tailwind Conversion

| Figma CSS | Tailwind Class | Note |
|---|---|---|
| `display: flex` | `flex` | |
| `flex-direction: row` | `flex-row` | Default, can omit |
| `flex-direction: column` | `flex-col` | |
| `align-items: center` | `items-center` | |
| `justify-content: center` | `justify-center` | |
| `justify-content: space-between` | `justify-between` | |
| `gap: 8px` | `gap-2` | 4px = 1 unit |
| `padding: 12px 16px` | `py-3 px-4` | |
| `border-radius: 8px` | `rounded-lg` | |
| `border-radius: 9999px` | `rounded-full` | |
| `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` | `shadow-md` | |
| `width: 100%` | `w-full` | |
| `height: 40px` | `h-10` | |
| `font-weight: 600` | → typography class | |

### Figma Color → Design System Token Mapping

Extract hex from CSS, convert to design system token:

```
#fefefe → --color-black-0
#e5e5e5 → --color-black-50
#d0d0d0 → --color-black-100
#a0a0a0 → --color-black-200
#6b6b6b → --color-black-300
#363636 → --color-black-400
#000000 → --color-black-500

#e0e1eb → --color-blue-50
#b4b9e7 → --color-blue-100
#707ce0 → --color-blue-200
#0018ec → --color-blue-300

#e9e6d4 → --color-yellow-50
#ebe5c2 → --color-yellow-100
#ebdd99 → --color-yellow-200
#eedb77 → --color-yellow-300
#f1d858 → --color-yellow-400
#f1d029 → --color-yellow-500
```

Use Tailwind v4 utilities directly:
```tsx
// CSS: color: #0018ec
// → className="text-blue-300"
```

### font-size / font-weight → Typography Class Conversion

Don't use font properties directly. Replace with `design-system` typography classes:

```
font-size: 16px + font-weight: 400 → body-regular
font-size: 16px + font-weight: 600 → body-semibold
font-size: 14px + font-weight: 500 → description-medium
font-size: 12px + font-weight: 400 → label-regular
font-size: 10px + font-weight: 600 → caption-semibold
```

---

## Phase 3 — Summarize Analysis

After PNG + CSS analysis, pass to component-builder:

```
[Analysis Results]
ComponentName: Button
Layout: flex row, items-center, justify-center
Size: h-10 px-4 (medium base)
Background: --color-blue-300
Text: body-semibold, --color-black-0
border-radius: rounded-lg
Variant detected: size(small/medium/large), variant(primary/secondary)
Hover rule: --color-blue-300 → --color-blue-200 (apply design-system skill)
```

---

## Common CSS Parsing Issues

### rgba Color Handling

Figma exports rgba() → convert to hex, map to token:
```
rgba(0, 24, 236, 1) → #0018ec → --color-blue-300
rgba(54, 54, 54, 0.5) → semi-transparent → black-400 + opacity-50
```

### px Value → Tailwind Unit

Tailwind base unit (4px):
```
4px  → 1  (gap-1, p-1)
8px  → 2
12px → 3
16px → 4
20px → 5
24px → 6
32px → 8
40px → 10
48px → 12
```

Non-multiples of 4 → use `[{n}px]` arbitrary value.
