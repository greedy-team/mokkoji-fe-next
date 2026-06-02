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

## Commit Rules

Separate commits by FSD layer boundaries when implementing one feature. Commit immediately upon layer completion and move to the next layer.

```
[#issue-number] feat: {domain} API and type definitions
  → features/{domain}/api/, features/{domain}/model/

[#issue-number] feat: {domain} Block component implementation
  → features/{domain}/ui/

[#issue-number] feat: {domain} widget implementation
  → widgets/{domain}/ui/

[#issue-number] feat: {domain} page and route connection
  → views/{domain}/, app/, shared changes
```

- Never combine multiple layers in a single commit.
- Do not use `git add -A` / `git add .`. Always specify files explicitly.
