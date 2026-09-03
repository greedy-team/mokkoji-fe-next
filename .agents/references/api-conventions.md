# API Conventions — mokkoji

How data enters and leaves this app. Read this before adding any API function, Server Action, Route Handler, or react-query usage. Bans referenced here are defined in [`forbidden.md`](./forbidden.md).

## 1. Pick the right ky instance

All HTTP goes through a preconfigured ky instance in `shared/api/`.

| Instance                      | Runtime      | Auth                                      | Use for                                                 |
| ----------------------------- | ------------ | ----------------------------------------- | ------------------------------------------------------- |
| `shared/api/server-api.ts`    | server       | none                                      | Anonymous reads whose response is identical for everyone |
| `shared/api/auth-api.ts`      | server only  | user session Bearer, auto-injected        | Reads and Server Actions whose response is per-user      |
| `shared/api/client-api.ts`    | browser only | none (cookie flows through Route Handler) | Client-side reads, always aimed at our own `app/api/**` |
| `shared/api/dashboard-api.ts` | server only  | dashboard session Bearer                  | Admin dashboard endpoints                               |

`auth-api`, `dashboard-api`, and every `getServer*` function import `'server-only'`. `client-api` throws if it is reached on the server. These two guards are the enforcement.

`client-api` has `prefixUrl: '/'`, so paths are relative with no leading slash: `clientApi.get('api/favorites')`.

### Choosing between `server-api` and `auth-api`

The question is not "does this endpoint need a token" but **"is this response shareable across users"**. The backend returns extra per-user fields when a token is present — `ClubType.isFavorite` is the canonical example — so the same endpoint yields shareable data anonymously and personal data authenticated.

Endpoints that serve both audiences branch on the session to pick the client:

```ts
const isAuthenticated = !!session?.accessToken;
const client = isAuthenticated ? api : serverApi;
```

Personal responses are never cached — `cache: 'no-store'`. Anonymous responses are the only ones *allowed* into the shared cache, but being allowed is not a reason to cache: see §5 for what disqualifies a read. Reads that are personal by nature (`entities/my/*`) use `auth-api` + `no-store` unconditionally.

**The two branches must land on the same cache policy.** If the anonymous branch caches and the authenticated one does not, the same resource renders differently depending on whether the visitor is logged in. `getClubList` shipped that split in #706 and served stale recruitment status to logged-out users until #724 put both branches back on `no-store`.

Reference: [getClubList.ts](../../src/widgets/club/api/getClubList.ts).

## 2. Error handling: one handler for RSC and Server Actions

Every Server Action and server-side API function wraps its call and funnels failures through [`shared/lib/error-message.ts`](../../src/shared/lib/error-message.ts).

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

Reference: [postClubRegister.ts](../../src/features/club-register/api/postClubRegister.ts).

## 3. Form submission: Server Action + `useServerAction`

Mutations triggered by a form go through a Server Action, driven from the client by [`useServerAction`](../../src/shared/hooks/useServerAction.ts).

```ts
const { mutate, isPending } = useServerAction(postClubRegister, {
  onSuccess: () => router.push('/'),
});
```

- The action must return the `{ ok, message, data? }` shape from section 2 — the hook branches on `ok`.
- Feedback is a **react-toastify toast**, not a modal: `toast.error(message)` on failure, `toast.success(message)` on success when a message is present. Opt out per call with `showErrorToast: false` / `showSuccessToast: false`.
- `onSuccess` runs only after a successful action and may be async.
- **Double-submit protection lives at the call site.** `mutate` does not guard on `isPending` internally, so the caller must bind `isPending` to the submit control's `disabled`. Omitting this leaves the form racing.

## 4. Client-side reads: Route Handler + SSR prefetch

The browser never talks to the backend directly. The chain is:

```
client component → queries.ts → getClient*() → clientApi → app/api/**/route.ts → proxy helper → backend
```

**Route Handler** — a thin proxy over one of two helpers, chosen by which session the endpoint belongs to:

| Helper                                | Session           | Token refresh                                |
| ------------------------------------- | ----------------- | -------------------------------------------- |
| `shared/lib/user-request.ts` (`requestByUser`)   | user cookie session      | on 401, refreshes once, rewrites the cookie, retries |
| `shared/lib/admin-request.ts` (`requestByAdmin`) | dashboard session | none — a 401 is returned as-is               |

```ts
export async function GET(request: NextRequest) {
  return requestByUser('favorites', {
    searchParams: request.nextUrl.searchParams,
  });
}
```

Add a Route Handler whenever a client component needs authenticated data.

**Paired fetchers** — the same resource gets two functions in the same `api/` folder:

- `getClient*.ts` → `clientApi`, hits `api/...`
- `getServer*.ts` → `auth-api` + `'server-only'`, hits the backend directly

Both unwrap the envelope and return the payload, so they are interchangeable as a `queryFn`.

**Prefetch and hydrate** — the view (a Server Component) primes the cache with the *server* fetcher, wraps the tree in `HydrationBoundary`, and the client component reads it with `useSuspenseQuery(favoriteQueries.list(params))` — no data props.

```ts
const queryClient = getServerQueryClient();
await queryClient.prefetchQuery({
  queryKey: favoriteQueries.list({ page, size }).queryKey,
  queryFn: () => getServerFavoriteList({ page, size }),
});
```

`getServerQueryClient` is `cache`-wrapped, so one client is shared per request. Wrap suspending subtrees in `AsyncBoundaryWithQuery` (not bare `Suspense`) so an error reset also resets the query cache.

Reference: [favorite-page.tsx](../../src/views/favorite/ui/favorite-page.tsx) + [favorite-item-section.tsx](../../src/widgets/favorite/ui/favorite-item-section.tsx).

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

Each domain collects its keys in `{layer}/{domain}/api/queries.ts` as a single default-exported object of `queryOptions` / `infiniteQueryOptions` factories.

```ts
const favoriteQueries = {
  list: (params: { page: number; size: number }) =>
    queryOptions({
      queryKey: ['favorites', params.page, params.size],
      queryFn: () => getClientFavoriteList(params),
      staleTime: 60 * 1000,
    }),
};
```

- Keys are hierarchical: domain first, then qualifier, then params — so `['favorites']` invalidates the whole domain.
- Consumers spread the factory: `useSuspenseQuery(favoriteQueries.list(params))`. Reach for `.queryKey` alone only when prefetching with a different `queryFn`.
- Per-query options (`staleTime`, `enabled`, `getNextPageParam`) belong in the factory, not in the component. [`createQueryClient`](../../src/shared/lib/query-client.ts) sets no global defaults on purpose.
- To prefetch an infinite query, override `queryFn` with the server fetcher while spreading the factory — see [prefetchAdminClubs.ts](../../src/entities/admin/api/prefetchAdminClubs.ts).

## 7. API function file conventions

**Placement**

| Kind                         | Location                                            |
| ---------------------------- | --------------------------------------------------- |
| Server Action (mutation)     | `features/{domain}/api/`                            |
| Read fetchers + `queries.ts` | `widgets/{domain}/api/` or `entities/{domain}/api/` |
| Cross-domain client/helper   | `shared/api/`, `shared/lib/`                        |

**Rules**

- One function per file, default export, filename matching the function name (`getClientFavoriteList.ts`). Group only when the functions are one CRUD unit on one resource (`comment-api.ts`).
- Name as HTTP verb + resource: `getServerFavoriteList`, `postClubRegister`, `patchRecruitmentForm`, `deleteEmail`. Read fetchers additionally carry the `Client` / `Server` marker.
- The backend envelope is [`ApiResponse<T>`](../../src/shared/model/type.ts) — `{ ok, message, data, error, status }`. Type the response with it and return `response.data`, so components never see the envelope:

  ```ts
  const response = await api.get('clubs', { searchParams }).json<ApiResponse<ClubsResponse>>();
  ```

  A few older fetchers inline `.json<{ data: T }>()`; prefer `ApiResponse<T>` in new code.

- Request/response types go next to the function or in `{domain}/model/type.ts`.
- After a mutation, burst the matching server cache tag (section 5) and invalidate the matching react-query key prefix (section 6).
