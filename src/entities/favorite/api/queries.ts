import { queryOptions } from '@tanstack/react-query';
import getClientFavoriteList from './getClientFavoriteList';
import getClientFavoriteByDate from './getClientFavoriteByDate';

export const favoriteBaseKey = ['favorites'] as const;

export function getFavoriteListOptions(params: { page: number; size: number }) {
  return queryOptions({
    queryKey: [...favoriteBaseKey, params.page, params.size],
    queryFn: () => getClientFavoriteList(params),
    staleTime: 0,
  });
}

export function getFavoriteRecruitOptions(yearMonth: string) {
  return queryOptions({
    queryKey: [...favoriteBaseKey, 'recruit', yearMonth],
    queryFn: () => getClientFavoriteByDate(yearMonth),
  });
}
