# Project Context — mokkoji (mokkoji-fe-next)

University club information exploration and bookmarking service built with Next.js 15 App Router and an external backend API.

Before modifying application code, read the rules that apply to the task:

- Architecture and layer ownership: `.agents/references/architecture.md`
- API clients, Server Actions, Route Handlers, and react-query: `.agents/references/api-conventions.md`
- Hard prohibitions and accepted alternatives: `.agents/references/forbidden.md`
- Spec-driven workflow: `.agents/references/workflow-guide.md`

## Tech stack

| Concern | Use |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript |
| HTTP | Preconfigured `ky` instances in `shared/api/` |
| Client cache | `@tanstack/react-query`; keys in `{domain}/api/queries.ts` |
| URL state | `nuqs` |
| Styling | Tailwind CSS v4 `@theme` tokens, `cva`, and `cn` |
| UI primitives | Radix UI |
| Async UI | `react-error-boundary` through `shared/ui/AsyncBoundary` |
| User feedback | `react-toastify` through `useServerAction` |
| Testing | Playwright and MSW |

## Architecture

Respect the FSD dependency direction:

```text
app → views → widgets → features → entities → shared
```

- Folder names use kebab-case.
- New file names use PascalCase; preserve the established style in existing files.
- `shared/ui/` components remain single files without component subfolders.
- CSS tokens live in `src/app/theme.css`; animations live in `src/app/globals.css`.

## Repository skills

Use the matching skill under `.agents/skills/` for component generation, design tokens, Tailwind patterns, Figma parsing, widget composition, commits, issues, pull requests, and Discord/QA workflows. Load only the skills relevant to the current request.

## Custom agents

Project-scoped Codex agents live in `.codex/agents/`.

- For ordinary focused changes, work directly unless the user requests delegation.
- For a spec-driven implementation, use `spec-parser`, then `project-orchestrator`, and follow the builder/validator pipeline in the architecture reference.
- Keep dependent implementation stages sequential. Parallelize only independent exploration or validation and wait for all required results.

Temporary spec and design inputs belong in `.agents/spec.md` and `.agents/figma/`; both are ignored by git.
