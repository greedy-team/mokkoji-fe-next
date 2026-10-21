import { infiniteQueryOptions } from '@tanstack/react-query';
import getManagementClubs from './getManagementClubs';

export const ADMIN_CLUBS_PAGE_SIZE = 20;

const adminQueries = {
  all: ['admin'] as const,
  clubs: (universityCode?: string) =>
    infiniteQueryOptions({
      queryKey: [...adminQueries.all, 'clubs', universityCode],
      queryFn: ({ pageParam }) =>
        getManagementClubs({
          page: pageParam as number,
          size: ADMIN_CLUBS_PAGE_SIZE,
          universityCode,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.page && allPages.length < lastPage.page.totalPages
          ? allPages.length + 1
          : undefined,
      enabled: !!universityCode,
    }),
};

export default adminQueries;
