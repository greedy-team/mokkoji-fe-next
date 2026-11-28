import { infiniteQueryOptions } from '@tanstack/react-query';
import getManagementClubs from './getManagementClubs';

export const ADMIN_CLUBS_PAGE_SIZE = 20;

export const adminClubBaseKey = ['admin', 'clubs'] as const;

export function getAdminClubListOptions(universityCode?: string) {
  return infiniteQueryOptions({
    queryKey: [...adminClubBaseKey, universityCode],
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
  });
}
