import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
});

export type RecruitSearchParams = ReturnType<typeof searchParamsCache.parse>;
