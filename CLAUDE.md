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

## Repository Skills and Commands

Use the matching skill under `.claude/skills/` for component generation, design tokens, Tailwind patterns, Figma parsing, widget composition, verification, and Notion planning. Use the matching command under `.claude/commands/` for commits, issues, pull requests, and Discord/QA workflows. Load only what the current request requires.

For development work sourced from a Notion meeting note or task page, use [plan-from-notion](.claude/skills/plan-from-notion/SKILL.md) to extract source-backed candidates and hand the selected task to verification-loop. General Notion summaries do not require the development pipeline.

## Verification Policy

Before implementing a feature, fixing a bug, or refactoring behavior, read and apply [verification-loop](.claude/skills/verification-loop/SKILL.md). This applies to direct requests, Discord/QA and Notion tasks, and spec-driven agents. Read-only analysis and document-only edits do not enter the implementation loop.

- Keep scope, source links, confirmed Acceptance Criteria, strategy, and results in chat by default. Do not create per-task spec, plan, or report files unless requested. Reuse approvals and honor user-requested stage checkpoints.
- File existence, generated tests, and successful lint/build alone do not establish behavior completion.
- Agent handoffs include confirmed AC, existing changes, verification path, test commands/evidence, and remaining checks. Receiving agents read the skill before implementation.
- Once scope, AC and strategy are approved, continue through RED, implementation, GREEN and regression without repeated approval requests. Pause for material unresolved behavior or explicitly requested checkpoints.
- During authorized work, create local commits at coherent work-unit boundaries after relevant verification without requesting approval each time. Honor commit deferrals; push only when requested. Issue/PR creation, Discord posting and archiving require their own authorization.

Verification commands:

| Command | Scope |
|---|---|
| `pnpm test:unit` | Node tests under `tests/unit/**/*.test.{cjs,mjs,js,ts}`, with tsx for TypeScript; fails when no files are found |
| `pnpm typecheck` | TypeScript check without emitted files or incremental cache |
| `pnpm verify` | Unit tests → typecheck → lint; stops on failure; CI runs this before build |
| `pnpm test` | Existing Playwright E2E/Storybook projects; separate environment setup required |

Use `node:test` for new Unit tests (`tests/unit/{domain}/Name.test.ts`). `verify` does not include build or browser verification; run those when the task requires them. A filtered run does not replace the full regression command. There is no `test:integration` script or dedicated server Integration harness; inspect the current runner before selecting commands. Compare Node/pnpm versions with `package.json`, the lockfile and CI before installing dependencies.

## Custom Agents

Project-scoped Claude Code agents live in `.claude/agents/`.

- For ordinary focused changes, work directly unless the user requests delegation.
- For a spec-driven implementation, use `spec-parser`, then `project-orchestrator`, and follow the builder/validator pipeline in the architecture reference.
- Keep dependent implementation stages sequential. Parallelize only independent exploration or validation and wait for all required results.

When the user supplies or requests file-based spec/design inputs, use `.claude/spec.md` and `.claude/figma/`; both are ignored by git. Chat-based tasks do not require these files.
