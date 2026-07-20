import { queryOptions } from '@tanstack/react-query';
import getClientFavoriteList from './getClientFavoriteList';
import getClientFavoriteByDate from './getClientFavoriteByDate';

const favoriteQueries = {
  list: (params: { page: number; size: number }) =>
    queryOptions({
      queryKey: ['favorites', params.page, params.size],
      queryFn: () => getClientFavoriteList(params),
    }),
  recruit: (yearMonth: string) =>
    queryOptions({
      queryKey: ['favorites', 'recruit', yearMonth],
      queryFn: () => getClientFavoriteByDate(yearMonth),
    }),
};

export default favoriteQueries;
