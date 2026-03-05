import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  size: parseAsInteger.withDefault(100),
  keyword: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  affiliation: parseAsString.withDefault(''),
  recruitStatus: parseAsString.withDefault(''),
});

export type RecruitSearchParams = ReturnType<typeof searchParamsCache.parse>;
