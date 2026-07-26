'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import adminQueries from '@/entities/admin/api/queries';

function useAdminClubs() {
  const { data: adminMe } = useQuery(adminQueries.me());

  const infiniteQuery = useInfiniteQuery(
    adminQueries.clubs(adminMe?.universityCode),
  );

  const clubs = infiniteQuery.data?.pages.flatMap((page) => page.clubs) ?? [];

  return {
    clubs,
    universityCode: adminMe?.universityCode?.toLowerCase() ?? '',
    isLoading: !adminMe || infiniteQuery.isLoading,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
}

export default useAdminClubs;
