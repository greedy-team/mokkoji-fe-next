# API Conventions — mokkoji

How data enters and leaves this app. Read this before adding any API function, Server Action, Route Handler, or react-query usage. Bans referenced here are defined in [`forbidden.md`](./forbidden.md).

## 1. Pick the right ky instance

All HTTP goes through a preconfigured ky instance in `shared/api/`.

| Instance                      | Runtime      | Auth                                      | Use for                                                 |
| ----------------------------- | ------------ | ----------------------------------------- | ------------------------------------------------------- |
| `shared/api/server-api.ts`    | server       | none                                      | Anonymous reads whose response is identical for everyone |
| `shared/api/auth-api.ts`      | server only  | forwards the user's auth cookies, auto-injected | Reads and Server Actions whose response is per-user |
| `shared/api/client-api.ts`    | browser only | backend HttpOnly cookies (`credentials: 'include'`) | Client-side reads and mutations, straight to the backend |
| `shared/api/dashboard-api.ts` | server only  | dashboard session Bearer                  | Admin dashboard endpoints                               |

`auth-api`, `dashboard-api`, and every `getServer*` function import `'server-only'`. `client-api` throws if it is reached on the server. These two guards are the enforcement.

`client-api` has `prefixUrl` set to the backend (`NEXT_PUBLIC_API_URL`), so paths are backend paths with no leading slash: `clientApi.get('favorites')`.

### Choosing between `server-api` and `auth-api`

The question is not "does this endpoint need a token" but **"is this response shareable across users"**. The backend returns extra per-user fields when a token is present — `ClubType.isFavorite` is the canonical example — so the same endpoint yields shareable data anonymously and personal data authenticated.

Endpoints that serve both audiences branch on the session to pick the client:

```ts
const session = await getSession();
const client = session ? api : serverApi;
```

Personal responses are never cached — `cache: 'no-store'`. Anonymous responses are the only ones *allowed* into the shared cache, but being allowed is not a reason to cache: see §5 for what disqualifies a read. Reads that are personal by nature (`entities/my/*`) use `auth-api` + `no-store` unconditionally.

**The two branches must land on the same cache policy.** If the anonymous branch caches and the authenticated one does not, the same resource renders differently depending on whether the visitor is logged in. `getClubList` shipped that split in #706 and served stale recruitment status to logged-out users until #724 put both branches back on `no-store`.

Reference: [getClubList.ts](../src/widgets/club/api/getClubList.ts).

## 2. Error handling: one handler for RSC and Server Actions

Every Server Action and server-side API function wraps its call and funnels failures through [`shared/lib/error-message.ts`](../src/shared/lib/error-message.ts).

```ts
'use server';

export async function postClubRegister(data: ClubRegisterRequest) {
  try {
    await api.post('clubs', { json: data });
    revalidateTag('clubs');
    return { ok: true, message: '등록이 완료되었습니다.', status: 200 };
  } catch (e) {
    return createErrorResponse(e as Error);
  }
}
```

The result shape is always `{ ok, message, data?, status }`. `createErrorResponse` resolves the message in this order:

1. `message` field from the backend response body
2. a caller-supplied `CustomErrorMapping[]` entry matching the status
3. the default copy for that status code (400/401/403/404/409/500)

Pass custom mappings only when a status needs domain-specific copy — do not restate the defaults.

Reference: [postClubRegister.ts](../src/features/club-register/api/postClubRegister.ts).

## 3. Form submission: Server Action + `useServerAction`

Mutations triggered by a form go through a Server Action, driven from the client by [`useServerAction`](../src/shared/hooks/useServerAction.ts).

```ts
const { mutate, isPending } = useServerAction(postClubRegister, {
  onSuccess: () => router.push('/'),
});
```

- The action must return the `{ ok, message, data? }` shape from section 2 — the hook branches on `ok`.
- Feedback is a **react-toastify toast**, not a modal: `toast.error(message)` on failure, `toast.success(message)` on success when a message is present. Opt out per call with `showErrorToast: false` / `showSuccessToast: false`.
- `onSuccess` runs only after a successful action and may be async.
- **Double-submit protection lives at the call site.** `mutate` does not guard on `isPending` internally, so the caller must bind `isPending` to the submit control's `disabled`. Omitting this leaves the form racing.

## 4. Authentication: backend cookies, no proxy

The backend issues `access_token` / `refresh_token` as HttpOnly cookies on `Domain=.mokkoji.site`, so the browser and the Next server both receive them. Nothing in the frontend reads or stores a token.

```
browser : client component → queries.ts → getClient*() → clientApi ──(cookies, credentials: 'include')──▶ backend
server  : RSC / Server Action → auth-api ──(forwards the two auth cookies + Origin)──▶ backend
```

- **No proxy Route Handlers.** The browser calls the backend directly. Route Handlers remain only where the browser cannot call the backend itself: the Kakao OAuth callback (it relays the backend's `Set-Cookie` with `relaySetCookies`) and the dashboard (`requestByAdmin`, separate session).
- **Token refresh** happens in two places, both sending the `refresh_token` cookie to `users/auth/refresh`:
  - middleware, before a server render, when the access token is missing or about to expire (`needsTokenRefresh`); the new cookies go to the browser and to the same request's RSC (`applySetCookie`).
  - `client-api`, when a browser request gets 401; it refreshes once (shared across concurrent requests) and retries.
- **Who is logged in** comes from the backend, not from a cookie value. `getSession()` (`shared/lib/cookie-session.ts`) calls `GET users` and is `cache`-wrapped, so one request makes one call no matter how many components ask. The root layout passes its result to `AppSessionProvider`; client components read `useSession()` and never fetch it again. App Router keeps layouts across navigations, so the server call happens on a full load and on pages that check the role themselves (admin layouts, post-recruitment, my page).
- **State-changing requests** from the server carry `Origin: NEXT_PUBLIC_BASE_URL`, because the backend checks the origin of cookie-authenticated POST/PUT/PATCH/DELETE.

### Client-side reads

A client component reads with `useSuspenseQuery(get{Name}Options())`; the `queryFn` is the `getClient*` fetcher calling the backend directly. No server twin and no `HydrationBoundary` are needed for per-user data.

`useSuspenseQuery` also runs during server rendering, where `client-api` throws. Render such a subtree on the client only — `next/dynamic` with `ssr: false` — inside `AsyncBoundaryWithQuery`. Reference: [favorite-list-section.tsx](../src/widgets/favorite/ui/favorite-list-section.tsx).

Server prefetch (`getServer*` + `prefetchQuery` + `HydrationBoundary`) is still the pattern for data that must be in the first HTML, such as SEO content or the dashboard ([prefetchAdminClubs.ts](../src/entities/admin/api/prefetchAdminClubs.ts)). `getServerQueryClient` is `cache`-wrapped, so one client is shared per request. Wrap suspending subtrees in `AsyncBoundaryWithQuery` (not bare `Suspense`) so an error reset also resets the query cache.

Reference: [favorite-page.tsx](../src/views/favorite/ui/favorite-page.tsx) + [favorite-item-section.tsx](../src/widgets/favorite/ui/favorite-item-section.tsx).

## 5. Server cache: tags and invalidation

Cacheable reads carry a tag; mutations that touch the same resource burst it. **The two halves are a pair** — a tag on a read with no matching `revalidateTag`, or a `revalidateTag` for a tag no read declares, fails silently and serves stale data.

```ts
// read
await serverApi.get('clubs', { searchParams, next: { tags: ['clubs'] } });

// mutation on the same resource
revalidateTag('clubs');
```

The vocabulary is fixed. Do not invent a tag without adding it here:

| Tag             | Covers                                     |
| --------------- | ------------------------------------------ |
| `clubs`         | club detail and the sitemap's club id sweep |
| `users`         | user profile and account settings          |
| `universities`  | the university list                        |
| `String(clubId)` | everything scoped to one club — its detail and all of its recruitment reads |

The club list and club search are **not** on this table. They are `no-store` on both branches — see below.

Recruitment mutations burst only `String(clubId)`, never a global `recruitments` tag. A global tag would clear every club's cache on every posting edit, which costs the most exactly during recruiting season when traffic peaks. Reads that cannot see a clubId take one as a parameter for this reason — see `getRecruitDetail`.

`next: { revalidate: seconds }` alone is for data with **no** mutation path — `sitemap.ts`, the university list. If any Server Action bursts a tag that covers the resource, the read must carry that tag too. `revalidate` and `tags` combine; time-based expiry is not a substitute for invalidation.

### Server-derived fields disqualify a read from caching

If any field in the response is computed by the backend from the **current time**, no tag can keep it correct. Nothing mutates when a deadline passes, so no `revalidateTag` fires, and the cached value stays frozen at whatever the clock said when it was first fetched.

`recruitStatus` is the case that bit us: `IMMINENT` and `CLOSED` are derived from `recruitEnd` versus now. A cached club list kept advertising closed recruitments as open. `no-store` is the fix, not a shorter `revalidate` — a bounded window still shows a closed posting as open for the length of that window, and the user who clicks through in that window is the one being harmed.

Before attaching a cache policy to a `serverApi` read, check four things:

1. Does any field derive from the current time? If yes, stop — the read is `no-store`.
2. Does a Server Action mutate this resource? If yes, `tags` is mandatory — `revalidate` alone serves stale data until it expires, no matter what the mutation does.
3. Does that action actually call `revalidateTag` with the same tag? Verify both directions; each half is silent when its pair is missing.
4. If only `revalidate` is set, is the resource genuinely fine to serve up to that many seconds stale?

> **Next 15 footgun:** a fetch with `next: { tags }` but no `cache` or `revalidate` falls into `autoNoCache`, so no cache entry is created and the paired `revalidateTag` has nothing to burst. When you find one, the fix is to answer the four questions above — not to reflexively add `cache: 'force-cache'`. #706 did the latter and turned a read that was silently uncached into a permanently cached one, which is how #724 happened.

## 6. react-query: keys live in `queries.ts`

Each domain collects its queries in `entities/{domain}/api/queries.ts` (§7). One query is one function named `get{Name}Options` that returns `queryOptions` / `infiniteQueryOptions`. The domain's base key sits in the same file.

```ts
export const favoriteBaseKey = ['favorites'] as const;

export function getFavoriteListOptions(params: { page: number; size: number }) {
  return queryOptions({
    queryKey: [...favoriteBaseKey, params.page, params.size],
    queryFn: () => getClientFavoriteList(params),
  });
}
```

- **Naming**: `get{Name}Options` — `getFavoriteListOptions`, `getAdminClubListOptions`. Mutations follow the same shape: `{verb}{Name}MutationOptions`.
- **Exports**: named exports. A file that exports a single function uses `export default` instead, as `import/prefer-default-export` requires.
- **Keys** are hierarchical — base key first, then qualifier, then params — and every key is built from the base key.
- **Invalidation** uses the base key too: `invalidateQueries({ queryKey: favoriteBaseKey })`. Never write the key array again at the call site. A component that cannot import its domain's `queries.ts` (anything in `shared/`) does not invalidate that domain's cache — see [`forbidden.md`](./forbidden.md) § Cache knowledge below the domain layer.
- **Consumers** spread the options: `useSuspenseQuery(getFavoriteListOptions(params))`. Reach for `.queryKey` alone only when prefetching with a different `queryFn`.
- **staleTime** comes from the layout's `QueryProvider` default: 10 minutes under `[universityCode]` and the root `(home)`, 0 under `(admin)/dashboard`. Override it in an options function only with a written reason. The favorites list sets `staleTime: 0` so it is always refetched when the page is opened.
- Other per-query options (`enabled`, `getNextPageParam`) belong in the options function, not in the component.
- To prefetch an infinite query, override `queryFn` with the server fetcher while spreading the options — see [prefetchAdminClubs.ts](../src/entities/admin/api/prefetchAdminClubs.ts).

## 7. API function file conventions

**Placement**

| Kind                                                   | Location                     |
| ------------------------------------------------------ | ---------------------------- |
| `queries.ts`, read fetchers (`getClient*` / `getServer*`), `prefetch*` | `entities/{domain}/api/`     |
| Server Actions, `mutations.ts`, mutation fetchers       | `features/{domain}/api/`     |
| Cross-domain client/helper                              | `shared/api/`, `shared/lib/` |

Reads sit in `entities` so every layer above can reach the key; mutations sit in `features` because every consumer of one is already above it. See [`forbidden.md`](./forbidden.md) § `queries.ts` outside `entities`.

**Rules**

- One function per file, default export, filename matching the function name (`getClientFavoriteList.ts`). Group only when the functions are one CRUD unit on one resource (`comment-api.ts`).
- Name as HTTP verb + resource: `getServerFavoriteList`, `postClubRegister`, `patchRecruitmentForm`, `deleteEmail`. Read fetchers additionally carry the `Client` / `Server` marker.
- The backend envelope is [`ApiResponse<T>`](../src/shared/model/type.ts) — `{ ok, message, data, error, status }`. Type the response with it and return `response.data`, so components never see the envelope:

  ```ts
  const response = await api.get('clubs', { searchParams }).json<ApiResponse<ClubsResponse>>();
  ```

  A few older fetchers inline `.json<{ data: T }>()`; prefer `ApiResponse<T>` in new code.

- Request/response types go next to the function or in `{domain}/model/type.ts`.
- After a mutation, burst the matching server cache tag (section 5) and invalidate the matching react-query key prefix (section 6).
