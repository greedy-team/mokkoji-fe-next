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

### Inline `queryKey` — reads and invalidation alike

Never write a key array outside `queries.ts`. This covers `useQuery` / `useSuspenseQuery` / `useInfiniteQuery` and equally `invalidateQueries`, `removeQueries`, `setQueryData`, `getQueryData`, and `cancelQueries`.

**Why:** duplicated key literals drift, and invalidation then misses caches it was supposed to clear. Invalidation is where this actually bites — a read call site that spreads the factory stays correct for free, while a hand-written prefix silently stops matching the moment the factory's key shape changes.

Each domain's keys live in `{layer}/{domain}/api/queries.ts` as one default-exported object. The object owns **both** halves: the factories and the prefixes callers invalidate through.

```ts
const favoriteQueries = {
  all: ['favorites'] as const,
  list: (params: { page: number; size: number }) =>
    queryOptions({
      queryKey: [...favoriteQueries.all, 'list', params],
      queryFn: () => getClientFavoriteList(params),
      staleTime: 60 * 1000,
    }),
  recruit: (yearMonth: string) =>
    queryOptions({
      queryKey: [...favoriteQueries.all, 'recruit', yearMonth],
      queryFn: () => getClientFavoriteByDate(yearMonth),
    }),
};
```

```ts
// Forbidden
queryClient.invalidateQueries({ queryKey: ['favorites'] });
// Correct
queryClient.invalidateQueries({ queryKey: favoriteQueries.all });
```

Key shape is fixed at three tiers — `[domain, qualifier, params]`:

- `all` is the domain root and the only literal in the file. Every factory spreads it.
- The qualifier segment is mandatory even when a domain has one factory today. Without it, sibling factories are distinguished only by the runtime type of their first parameter, and the second factory added to the domain collides with the first.
- Parameters come last. Pass an object rather than positional segments, so adding a parameter does not reshuffle the key.

If a domain grows past one invalidation target, add the intermediate prefix to the object (`clubsAll: () => [...adminQueries.all, 'clubs'] as const`) — do not hand-write it at the call site. Reach for `.queryKey` alone only when prefetching with a different `queryFn` ([`api-conventions.md`](./api-conventions.md) §4).

### `queries.ts` outside `entities`

A domain's `queries.ts` lives in `entities/{domain}/api/`, never in `widgets`, `features`, or `views`.

**Why:** a query key is a claim about domain data, not about one screen's composition, and its useful lifetime is longer than any single widget's. Placing it higher makes it unreachable from everything below — which is exactly how `shared/ui/favorite-button.tsx` ended up hand-writing `['favorites']`: the factory sat in `widgets/favorite`, so no lower layer could import it. `entities` is the lowest layer that may hold domain knowledge, so a key placed there is reachable, by the dependency arrow, from every layer that could ever need it.

**The read fetchers follow the keys.** A `queryFn` references its fetcher, so a key in `entities` whose fetcher sits in `widgets` is a reverse import. `getClient*` and its `getServer*` pair belong in the same `entities/{domain}/api/` folder as the `queries.ts` that names them.

Mutations do not move. `mutations.ts` and its `postClient*` / `deleteClient*` fetchers stay in `features/{domain}/api/` — a mutation is a user action, and every consumer of one sits above `features`.

```
entities/{domain}/api/     queries.ts, getClient*.ts, getServer*.ts, prefetch*.ts
features/{domain}/api/     mutations.ts, postClient*.ts, Server Actions
```

If a widget is the only consumer of a query today, that is not a reason to keep the key next to it. The cost of the wrong placement is not paid at write time — it is paid by the next component that needs the same key and sits one layer too low to import it.

### Cache knowledge below the domain layer

A component that cannot import its domain's `queries.ts` must not invalidate that domain's cache. `shared/` sits below every domain, so a `shared/ui` component naming a domain key is always writing a literal it has no way to keep in sync.

**Why:** the import is blocked by the dependency arrow, so the literal is unverifiable by construction — nothing fails when the key moves, and the stale prefix survives every refactor of the factory it was copied from.

When a shared component appears to need invalidation, one of three things is true, in this order of likelihood:

1. **No such query is mounted on the screens that render it.** Then the call is a no-op — delete it. `shared/ui/favorite-button.tsx` carried `invalidateQueries(['favorites'])` while the only screen holding a `favorites` cache renders `ClientFavoriteButton` instead.
2. **The component belongs to the domain, not to `shared`.** Move it up and let it import the factory.
3. **It is genuinely shared and the caller knows the cache.** Inject the domain-aware variant through a slot prop — the pattern [`club-item.tsx`](../src/entities/club/ui/club-item.tsx) already uses for `favoriteButton`.

Adding a domain key file under `shared/` to satisfy the import is not a fourth option. It relocates the coupling instead of removing it.

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
