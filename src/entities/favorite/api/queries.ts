import { queryOptions } from '@tanstack/react-query';
import getClientFavoriteList from './getClientFavoriteList';
import getClientFavoriteByDate from './getClientFavoriteByDate';

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

export default favoriteQueries;
