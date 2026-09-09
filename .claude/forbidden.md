# Forbidden Conventions — mokkoji

Hard rules. Each entry states what is banned, why, and the only accepted alternative. This file is the single source for every ban — `CLAUDE.md` imports it rather than restating it, so add a rule here, not there.

## Styling

### Raw color values

Never write hex, `rgb()`, `rgba()`, or a named color in a component. Colors exist only as CSS variable tokens defined in [`src/app/theme.css`](../src/app/theme.css).

**Why:** raw values bypass the token system, so a palette change silently misses them and dark/light variants drift apart.

```tsx
// Forbidden
<div className="bg-[#4F46E5] text-[rgba(0,0,0,0.6)]" />
// Correct
<div className="bg-primary text-description" />
```

If a needed color has no token, add the token first — do not inline it "temporarily".

### Ad-hoc font sizing

Do not reach for `text-[15px]`, `font-[600]`, or a bare `text-sm font-semibold` pair when a typography class covers the case. Use the design system classes (`description-semibold` and friends).

**Why:** typography classes bundle size, weight, line-height, and letter-spacing. Reassembling them by hand produces near-misses that never match the design.

## Architecture

### Reverse and cross-domain imports

The dependency direction is `app → views → widgets → features → entities → shared`. Importing against that arrow is forbidden, with no exceptions.

Also forbidden: importing another domain's slice inside the same layer. A widget may only import features from its own domain.

**Why:** the arrow is what keeps `shared` reusable and domains independently deletable. One reverse import makes the lower layer un-liftable forever.

If two domains need the same thing, move it down to `shared` (or the relevant `entities` slice) instead of importing sideways.

### `shared` importing anything

`shared/` is the end of the arrow, so it imports from no layer at all — not `entities`, not `features`, not `widgets`, not `views`. Inside `shared` a file may import other `shared` files and third-party packages, nothing else.

**Why:** `shared` is the only layer every other layer depends on. One import out of it makes the whole graph circular, and the module that reached upward can no longer be lifted into another project, which was the entire reason for putting it there.

The arrow rule above already covers this. It is restated because the failure mode is specific: a `shared` component grows a feature-shaped need — a session, a role check, a domain modal — and reaching upward looks like the smallest fix. It never is. A `shared/ui` file that needs a domain component is not a shared component; it is a widget filed in the wrong place. Move the file, do not add the import.

### Re-export shims across a layer boundary

A file whose entire body imports one thing from another layer and re-exports it is forbidden.

```tsx
// Forbidden — shared/ui/login-required.tsx
import LoginRequired from '@/widgets/login/ui/login-required';

export default LoginRequired;
```

**Why:** this is a reverse import wearing a disguise. The violation is not removed, only moved into a file nobody reads — and it gets worse, because call sites now import `@/shared/...` and no grep, audit, or reviewer can see which layer they actually reached. A direct reverse import is at least visible.

The shims are what a well-meant cleanup produces when the implementation is lifted to the correct layer but the call sites are left untouched. Finish the move: delete the file at the old path and repoint every caller at the real one. If a caller cannot legally import the implementation, that caller is the misplaced file — fix it there.

### Fetching inside `widgets` and `features/ui`

Presentational components do not fetch. Data is resolved in `views/` or `app/**/page.tsx` and passed down as props, or primed via react-query prefetch + `HydrationBoundary` (see [`api-conventions.md`](./api-conventions.md) §4).

**Why:** fetching inside the composition layers makes those components untestable in isolation, unusable in Storybook, and impossible to reuse under a different data source.

The accepted client-side pattern is a component reading an already-hydrated cache with `useSuspenseQuery(domainQueries.x())` — the fetch was scheduled by the view, not by the widget.

> Known violations: [ClubManagementWidget.tsx](../src/widgets/admin/ui/ClubManagementWidget.tsx), [favorite-dynamic-section.tsx](../src/widgets/favorite/ui/favorite-dynamic-section.tsx), [ClientFavoriteButton.tsx](../src/widgets/favorite/ui/ClientFavoriteButton.tsx) still hold their own `useQuery`/`useMutation`. Do not copy them into new code.

## Data fetching

### Raw `fetch` and ad-hoc ky instances

Never call `fetch` directly, and never call `ky.create` outside `shared/api/`. Pick one of the five preconfigured instances.

**Why:** the instances carry auth injection, the `server-only` / browser guards, and the base URL. A hand-rolled call quietly ships without any of them.

Exception: `shared/lib/user-request.ts` calls bare `ky` on purpose — it *is* the proxy layer and must control `throwHttpErrors` and headers itself. Route Handlers use `requestByUser`, not their own ky.

### Crossing the server/client boundary with the wrong client

- `client-api` on the server — throws at runtime by design.
- `auth-api` / `dashboard-api` / any `getServer*` imported into a client component — `server-only` breaks the build.

Do not delete a `'server-only'` import to make an error go away. It means the call belongs on the other side of a Route Handler.

### Inline `queryKey`

Do not write a `queryKey` array inside a component or hook. Keys live in `{layer}/{domain}/api/queries.ts` as `queryOptions` / `infiniteQueryOptions` factories.

**Why:** duplicated key literals drift, and invalidation then misses caches it was supposed to clear.

### Swallowing errors in Server Actions

A Server Action must not return a bare `null`, rethrow raw, or hand-format an error message. Failures go through `createErrorResponse`, producing `{ ok, message, data?, status }`.

**Why:** `useServerAction` branches on `ok` and surfaces `message`. Any other shape means the user sees nothing when the call fails.

## Naming and typing

### Abbreviated names

Use whole words. `btn` → `button`, `idx` → `index`, `res` → `response`, `cfg` → `config`, `usr` → `user`.

**Why:** abbreviations are only unambiguous to whoever wrote them, and they make grep unreliable.

### Magic strings for fixed value sets

When a value can only be one of a known set — tab keys, statuses, sort orders — never type it as `string`.

```ts
// Forbidden
function selectTab(tab: string) {}

// Correct
const CLUB_TABS = ['info', 'recruitment', 'review'] as const;
type ClubTab = (typeof CLUB_TABS)[number];
function selectTab(tab: ClubTab) {}
```

**Why:** a plain `string` lets a typo pass type checking and fail silently at runtime.

### Uppercase codes in URLs, and call-site case conversion

API/enum codes are uppercase (`SEJONG`, `CULTURAL_ART`); URL codes are lowercase (`/sejong/club?category=cultural_art`). Two things are banned:

1. interpolating an API/enum code into a URL directly
2. calling `.toLowerCase()` / `.toUpperCase()` on a code anywhere outside the converter

```ts
// Forbidden
href={`/${universityCode}/club?category=${ClubCategoryToLabel[category]}`}
router.push(`/${university.code.toLowerCase()}`);

// Correct
href={`/${universityCode}/club?category=${toUrlCode(ClubCategoryToLabel[category])}`}
router.push(`/${toUrlCode(university.code)}`);
```

[`shared/lib/urlCodeConverter.ts`](../src/shared/lib/urlCodeConverter.ts) is the only place either conversion may happen. Do not add domain-specific casing wrappers — they duplicate the converter and reintroduce the drift it exists to prevent.

Inside `[universityCode]` routes, `useUniversityCode()` already returns the URL code. Use it as is; convert only when handing the value to the API.

## Code hygiene

### Comments

Do not annotate what the code already says. A comment is justified only when the **why** is non-obvious — a workaround, a spec quirk, a deliberate deviation.

```ts
// Forbidden
// set loading to true
setIsPending(true);
```

### Client component by default

Do not add `'use client'` reflexively. It is required only when the file uses `useState` / `useEffect` / event handlers / browser APIs. Everything else stays a Server Component.

**Why:** every unnecessary `'use client'` pulls its whole import subtree into the browser bundle.

## Git

### `git add -A` and `git add .`

Always stage files explicitly.

**Why:** blanket staging sweeps in build artifacts, local config, and unrelated work-in-progress, and it is the usual cause of a commit that mixes concerns.

### Mixed-purpose commits

One commit holds one type of work — feature, refactor, fix, chore. Never combine them. Split by work unit, not by FSD layer.

Format: `[#{issue}|no-issue] {type}: {subject}`.
