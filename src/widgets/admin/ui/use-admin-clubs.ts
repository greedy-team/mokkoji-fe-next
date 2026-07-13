'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import adminQueries from '@/entities/admin/api/queries';

function useAdminClubs() {
  const { data: adminMe } = useQuery(adminQueries.me());

  const infiniteQuery = useInfiniteQuery(
    adminQueries.clubs(adminMe?.universityCode),
  );

  // TODO: 백엔드 admin/clubs 4페이지에서 UserRole.GREEDY_ADMIN enum 파싱 실패로 500 반환 — 수정 전까지 방어
  const clubs =
    infiniteQuery.data?.pages.flatMap((page) => page?.clubs ?? []) ?? [];

  return {
    clubs,
    isLoading: !adminMe || infiniteQuery.isLoading,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
}

export default useAdminClubs;
