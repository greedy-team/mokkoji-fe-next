import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  tab: parseAsString.withDefault(''),
});

export type FavoriteSearchParams = ReturnType<typeof searchParamsCache.parse>;
