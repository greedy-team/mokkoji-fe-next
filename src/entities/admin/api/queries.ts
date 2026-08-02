import { infiniteQueryOptions } from '@tanstack/react-query';
import getManagementClubs from './getManagementClubs';

const adminQueries = {
  clubs: (universityCode?: string) =>
    infiniteQueryOptions({
      queryKey: ['admin', 'clubs', universityCode],
      queryFn: ({ pageParam }) =>
        getManagementClubs({
          page: pageParam as number,
          size: 20,
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
