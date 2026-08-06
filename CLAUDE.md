# Project Context — mokkoji (mokkoji-fe-next)

University club information exploration and bookmarking service. Built with Next.js 15 App Router, communicates with external backend API.

> For folder structure, layer definitions, and agent pipeline, see `.claude/architecture.md`.
> For API clients, error handling, Server Actions, Route Handlers, and react-query, see `.claude/api-conventions.md`.

@.claude/forbidden.md

## Tech Stack

Sanctioned choice per concern. The full dependency list is `package.json` — this section records the decision, not the inventory. Bans live in `.claude/forbidden.md`.

| Concern | Use |
|---|---|
| Framework | Next.js 15 App Router + React 19 + TypeScript |
| HTTP | ky — preconfigured instances in `shared/api/` |
| Client cache | @tanstack/react-query — keys in `{domain}/api/queries.ts` |
| URL state | nuqs |
| Styling | Tailwind CSS v4 `@theme` tokens + cva + `cn` (`@/shared/lib/utils`) |
| UI primitives | @radix-ui |
| Async UI | react-error-boundary via `shared/ui/AsyncBoundary` |
| User feedback | react-toastify — through `useServerAction` |
| Icons | lucide-react |
| Rich text | @tiptap — `shared/ui/ClubDescriptionEditor` |
| Date | dayjs |
| E2E / mocking | Playwright / MSW |
| Error tracking | @sentry/nextjs |

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

Rationale, examples, and exceptions for every forbidden item live in `.claude/forbidden.md`.

1. **No raw colors** — CSS variable tokens only, never hex/rgba.
2. **Typography classes first** — `description-semibold` and friends, not ad-hoc font-size/weight.
3. **Auto-generate states**: Apply design-system skill's "-1 step" rule for hover/active.
4. **Respect layer dependency direction** — reverse and cross-domain imports forbidden.
5. **One-way props** — widgets and features/ui must not fetch internally. Data comes from views or page.
6. **No comments** — only when the *why* is non-obvious.
7. **No abbreviated naming** — full words (`btn` → `button`, `idx` → `index`).
8. **Server/Client separation**: Default to Server Component if no interaction. Use `'use client'` if `useState`/`useEffect`/event handlers exist.
9. **No raw fetch** — use a preconfigured ky instance from `shared/api/`.
10. **No magic strings for fixed value sets** — `as const` array plus a derived union type.
11. **Lowercase URL codes, always via converter** — `toUrlCode` / `toApiCode` from `@/shared/lib/urlCodeConverter` is the only place casing may convert.

## Commit Rules

Separate commits by work type (feature, refactor, fix, config, etc.), not by FSD layer.

- Never combine different types of work in a single commit.
- Do not use `git add -A` / `git add .`. Always specify files explicitly.

See `.claude/forbidden.md` for details.
