# Project Context — mokkoji (mokkoji-fe-next)

University club information exploration and bookmarking service. Built with Next.js 15 App Router, communicates with external backend API.


> For folder structure, layer definitions, and agent pipeline, see `.claude/architecture.md`.

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 (@theme pattern)
- class-variance-authority (cva) — variant components
- clsx + tailwind-merge (cn function, `@/shared/lib/utils`)
- ky — HTTP client
- nuqs — URL search params state management
- dayjs — date handling
- @radix-ui — accessible UI primitives

## Architecture: FSD (Feature-Sliced Design)

Dependency direction (violation forbidden):
```
app → views → widgets → features → entities → shared
```
- Reverse imports absolutely forbidden
- No cross-domain imports in the same layer
- widgets may only import features from the same domain

## Design System

CSS tokens: `src/app/theme.css` / Animations: `src/app/globals.css`

## File Structure Rules

- Folder names: kebab-case
- New file names: PascalCase (preserve existing style when modifying existing files)
- `shared/ui/` — single file without subfolders

## Development Principles

1. **No raw colors**: Never use hex/rgba directly. Always use CSS variable tokens.
2. **Typography classes first**: Use `description-semibold` style classes instead of direct font-size/weight.
3. **Auto-generate states**: Apply design-system skill's "-1 step" rule for hover/active.
4. **Respect layer dependency direction**: Reverse imports absolutely forbidden.
5. **One-way props**: widgets and features/ui must not fetch internally. Pass data from views or page.
6. **No comments**: Exception only for complex, non-obvious logic.
7. **No abbreviated naming**: Use full words. (`btn` → `button`, `idx` → `index`)
8. **Server/Client separation**: Default to Server Component if no interaction. Use `'use client'` if `useState`/`useEffect`/event handlers exist.
9. **No raw fetch**: Always use ky for HTTP requests. Never use fetch directly.

## Commit Rules

Separate commits by work type (feature, refactor, fix, config, etc.), not by FSD layer.

- Never combine different types of work in a single commit.
- Do not use `git add -A` / `git add .`. Always specify files explicitly.
