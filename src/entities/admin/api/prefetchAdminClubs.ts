import type { QueryClient } from '@tanstack/react-query';
import adminQueries, { ADMIN_CLUBS_PAGE_SIZE } from './queries';
import getServerManagementClubs from './getServerManagementClubs';

function prefetchAdminClubs(
  queryClient: QueryClient,
  universityCode: string | null,
) {
  if (!universityCode) return null;

  return queryClient.prefetchInfiniteQuery({
    ...adminQueries.clubs(universityCode),
    queryFn: ({ pageParam }) =>
      getServerManagementClubs({
        page: pageParam as number,
        size: ADMIN_CLUBS_PAGE_SIZE,
        universityCode,
      }),
  });
}

export default prefetchAdminClubs;
