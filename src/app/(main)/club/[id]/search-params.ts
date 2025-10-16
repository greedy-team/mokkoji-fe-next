import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  id: parseAsInteger.withDefault(1),
});

export type IdSearchParams = ReturnType<typeof searchParamsCache.parse>;
