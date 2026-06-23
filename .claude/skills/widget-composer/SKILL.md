# Widget Composer — FSD Hierarchical Assembly Rules

## 1. FSD 3-Layer Composite Structure

```
shared/ui/ (atomic)
    ↓ combine
features/{domain}/ui/ (Block)    ← Figma mid-frame basis
    ↓ combine
widgets/{domain}/ui/ (Widget)    ← Figma main section basis
    ↓ place
views/{domain}/ (View)           ← Page unit
```

---

## 2. Figma Frame → FSD Layer Mapping Standard

### Block (`features/{domain}/ui/`) Pattern
- 2~5 shared/ui components combined
- One clear role (info display card, single form field, etc.)
- Accepts domain-specific data as props, displays

### Widget (`widgets/{domain}/ui/`) Pattern
- 2~6 Blocks combined
- Owns one functional domain (club list, search results, etc.)
- Forms main page section

### Ambiguous Judgment
- Frame reused across multiple domains → promote to `shared/ui/`
- Single domain only, simple → Block (`features/{domain}/ui/`)
- Single domain only, complex → Widget (`widgets/{domain}/ui/`)
- Covers entire page → View (`views/{domain}/`)

---

## 3. Props Design Principles

### Block: Pure Display

```typescript
// [Recommended] Good Block props
interface ClubCardProps {
  id: number;
  name: string;
  category: string;
  status: 'recruiting' | 'closed';
  className?: string;
}

// [Forbidden] Bad Block props (internal fetch or external logic)
interface ClubCardProps {
  clubId: number;        // Fetch internally — forbidden
  onRefresh: () => void; // External action — Widget responsibility
}
```

### Widget: Domain Data Unit

```typescript
// [Recommended] Good Widget props (receive as domain objects)
interface ClubListWidgetProps {
  clubs: ClubType[];
  onClubSelect?: (clubId: number) => void;
}

// Widget distributes data to Blocks
function ClubListWidget({ clubs, onClubSelect }: ClubListWidgetProps) {
  return (
    <ul className="flex flex-col gap-3">
      {clubs.map(club => (
        <li key={club.id}>
          <ClubCard                  // Block
            id={club.id}
            name={club.name}
            category={club.category}
            status={club.status}
            onClick={() => onClubSelect?.(club.id)}
          />
        </li>
      ))}
    </ul>
  );
}
```

---

## 4. Layout Patterns (Figma Auto Layout Based)

### Horizontal Layout

```tsx
<div className="flex flex-row gap-{spacing}">
  <Block1 />
  <Block2 />
</div>
```

### Vertical Layout

```tsx
<div className="flex flex-col gap-{spacing}">
  <Block1 />
  <Block2 />
</div>
```

### Grid Layout (even distribution)

```tsx
<div className="grid grid-cols-{n} gap-{spacing}">
  {items.map(item => <Block key={item.id} {...item} />)}
</div>
```

### Scroll Area

```tsx
<div className="overflow-y-auto max-h-{height}">
  <div className="flex flex-col gap-2">
    {items.map(...)}
  </div>
</div>
```

---

## 5. Loading/Error/Empty State Handling

View fetches data and passes to Widget. Widget defensively handles `null` data:

```tsx
interface ClubListWidgetProps {
  clubs: ClubType[] | null;
}

function ClubListWidget({ clubs }: ClubListWidgetProps) {
  if (!clubs || clubs.length === 0) return <EmptyState message="No clubs." />;

  return (
    <ul className="flex flex-col gap-3">
      {clubs.map(club => (
        <li key={club.id}>
          <ClubCard {...club} />
        </li>
      ))}
    </ul>
  );
}
```

---

## 6. Completeness Checklist

Block (`features/{domain}/ui/`):
- [ ] All text received as props (no hardcoding)
- [ ] `className` prop allows external style override
- [ ] Only `shared/ui/` components imported (no cross-domain)
- [ ] No internal fetch

Widget (`widgets/{domain}/ui/`):
- [ ] Defensive handling of null/empty arrays
- [ ] Only Blocks and shared/ui combined
- [ ] Event handlers injected as props (no internal routing)
- [ ] No internal fetch (data received as props from View)
