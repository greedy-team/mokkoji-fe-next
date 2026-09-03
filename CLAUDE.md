# Project Context — mokkoji (mokkoji-fe-next)

University club information exploration and bookmarking service. Built with Next.js 15 App Router, communicates with external backend API.

> For folder structure, layer definitions, and agent pipeline, see `.claude/architecture.md`.
> For API clients, error handling, Server Actions, Route Handlers, and react-query, see `.claude/api-conventions.md`.

@.claude/forbidden.md

## Tech Stack

Sanctioned choice per concern. The full dependency list is `package.json` — this section records the decision, not the inventory.

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
| Deploy | Vercel — 프로덕션·프리뷰 모두. `Dockerfile`과 `deploy-*docker*` 워크플로는 미사용 |

## Architecture: FSD (Feature-Sliced Design)

Dependency direction:

```
app → views → widgets → features → entities → shared
```

## Design System

CSS tokens: `src/app/theme.css` / Animations: `src/app/globals.css`

Hover and active states are derived, not designed — apply the design-system skill's "-1 step" rule.

## File Structure Rules

- Folder names: kebab-case
- New file names: PascalCase (preserve existing style when modifying existing files)
- `shared/ui/` — single file without subfolders
