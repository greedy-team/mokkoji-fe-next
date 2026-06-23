# Project Architecture — mokkoji

## Folder Structure

```
src/
├── app/                    ← Next.js App Router (pages, layouts, Route Handlers)
│   ├── (admin)/            ← admin route group
│   ├── (home)/             ← home route group
│   ├── (main)/             ← main route group
│   ├── api/                ← Route Handlers (auth, health check, etc.)
│   ├── globals.css         ← global styles + animation keyframes
│   └── theme.css           ← @theme color token definitions
├── shared/
│   ├── ui/                 ← atomic UI components (buttons, inputs, dialogs, etc.)
│   ├── api/                ← shared API functions
│   ├── hooks/              ← shared custom hooks
│   ├── lib/                ← utility functions, context (utils.ts, session-context.tsx, etc.)
│   └── model/              ← shared types/constants
├── entities/               ← domain data models
│   └── {domain}/           ← club, favorite, home, login, my, search ...
├── features/               ← domain business logic
│   └── {domain}/           ← api/, model/, ui/, util/ structure
├── widgets/                ← composite widgets (combines multiple features)
│   └── {domain}/ui/        ← {WidgetName}.tsx
└── views/                  ← page containers (page-level composition)
    └── {domain}/
```

## Layer Definitions

| Layer | Location | Description | Examples |
|-------|----------|-------------|----------|
| Atomic UI | `shared/ui/` | Reusable atomic components | Button, Input, Dialog |
| Domain Components | `features/{domain}/ui/` | Domain-specific components | ClubCard, SearchInput |
| Widgets | `widgets/{domain}/ui/` | Composite components combining multiple features | ClubListWidget, HomeSearchWidget |
| Views | `views/{domain}/` | Page-level containers | HomeView, ClubDetailView |
| Entities | `entities/{domain}/` | Domain data models, types | ClubEntity, FavoriteEntity |

## File Structure Patterns

```
shared/ui/
└── {ComponentName}.tsx        ← single file (no subfolders)

features/{domain}/
├── api/
├── model/
├── ui/
│   └── {ComponentName}.tsx
└── util/

widgets/{domain}/
└── ui/
    └── {WidgetName}.tsx

views/{domain}/
└── ui/
    └── {ViewName}.tsx

app/{route}/
└── page.tsx
```

## Agent Pipeline

```
spec-parser → project-orchestrator
  → api-builder       (features/{domain}/api/)
  → component-builder (shared/ui/)
  → block-builder     (features/{domain}/ui/)
  → widget-builder    (widgets/{domain}/ui/)
  → page-builder      (views/{domain}/ui/ + app/{route}/page.tsx)
```

Individual calls are also possible. Each agent runs independently.

Validation pipeline:
```
implementation complete → structure-validator → css-validator (when Figma CSS available) → semantic-validator
```

## PNG / Figma CSS Delivery Methods

```
Method A: Attach image directly in Claude Code
Method B: Specify file path (.claude/figma/{component-name}/{component-name}.png)
```

For CSS: Copy from Figma right panel → "Copy as CSS" → paste in chat
Or provide as css file under `.claude/figma/{component-name}/` folder