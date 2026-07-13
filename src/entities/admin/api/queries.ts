import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query';
import getAdminMe from './getAdminMe';
import getManagementClubs from './getManagementClubs';

const adminQueries = {
  me: () =>
    queryOptions({
      queryKey: ['admin', 'me'],
      queryFn: getAdminMe,
    }),

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
        allPages.length < lastPage.page.totalPages
          ? allPages.length + 1
          : undefined,
      enabled: !!universityCode,
    }),
};

export default adminQueries;
