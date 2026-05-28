import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(6),
});

export type FavoriteSearchParams = ReturnType<typeof searchParamsCache.parse>;
