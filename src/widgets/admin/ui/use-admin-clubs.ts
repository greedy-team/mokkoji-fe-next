'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import adminQueries from '@/entities/admin/api/queries';

function useAdminClubs(universityCode?: string) {
  const infiniteQuery = useInfiniteQuery(adminQueries.clubs(universityCode));

  const clubs = infiniteQuery.data?.pages.flatMap((page) => page.clubs) ?? [];

  return {
    clubs,
    universityCode: universityCode?.toLowerCase() ?? '',
    isLoading: infiniteQuery.isLoading,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
}

export default useAdminClubs;
