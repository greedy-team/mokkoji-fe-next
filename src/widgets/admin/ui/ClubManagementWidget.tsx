'use client';

import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { AsyncBoundaryWithQuery } from '@/shared/ui/AsyncBoundary';
import filterClubsByName from '@/features/admin/model/filter-clubs';
import getManagementClubs from '@/features/admin/api/getManagementClubs';
import ClubManagementRow from '@/features/admin/ui/ClubManagementRow';

interface ClubListProps {
  searchClubQuery: string;
}

function ClubList({ searchClubQuery }: ClubListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['admin', 'clubs'],
      queryFn: ({ pageParam }) =>
        getManagementClubs({
          page: pageParam as number,
          size: 20,
          universityCode: 'SEJONG',
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return undefined;
        return allPages.length < lastPage.page.totalPages
          ? allPages.length + 1
          : undefined;
      },
    });

  const clubs = data.pages.flatMap((page) => page?.clubs ?? []);

  const filteredClubs = filterClubsByName(clubs, searchClubQuery);

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // TODO: 삭제 API 미구현 — DELETE /clubs/{clubId} 연동 후 아래 캐시 업데이트 활성화
  // const handleDelete = (clubId: number) => {
  //   queryClient.setQueryData(['admin', 'clubs'], (old: typeof data) => {
  //     if (!old) return old;
  //     return {
  //       ...old,
  //       pages: old.pages.map((page) =>
  //         page
  //           ? {
  //               ...page,
  //               clubs: page.clubs.filter(
  //                 (club: ClubType) => club.id !== clubId,
  //               ),
  //             }
  //           : page,
  //       ),
  //     };
  //   });
  // };

  if (filteredClubs.length === 0) {
    return (
      <div className="py-10 text-center text-[14px] leading-[140%] font-medium text-[#8B95A1]">
        {searchClubQuery
          ? '검색 결과가 없습니다.'
          : '등록된 동아리가 없습니다.'}
      </div>
    );
  }

  return (
    <>
      {filteredClubs.map((club, index) => (
        <ClubManagementRow
          key={club.id}
          index={index + 1}
          name={club.name}
          category={club.category}
          onDelete={() => {}}
        />
      ))}
      {isFetchingNextPage && (
        <div className="py-6 text-center text-[14px] leading-[140%] font-medium text-[#8B95A1]">
          불러오는 중...
        </div>
      )}
      <div ref={sentinelRef} className="h-4" />
    </>
  );
}

function ClubManagementWidget() {
  const [searchClubQuery, setSearchClubQuery] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <p className="text-[16px] leading-[140%] font-medium text-[#000000]">
          동아리 검색
        </p>
        <input
          value={searchClubQuery}
          onChange={(e) => setSearchClubQuery(e.target.value)}
          placeholder="동아리명을 입력해주세요."
          className="h-[52px] w-full rounded-xl border border-[#D6D6D6] px-4 text-[14px] leading-[140%] text-[#474747] outline-none placeholder:text-[#9C9C9C] focus:border-[#4AF38A]"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex w-full items-center border-t border-b border-[#8B95A1] py-2.5">
          <span className="w-[80px] text-[14px] leading-[140%] font-semibold text-[#474747]">
            No.
          </span>
          <span className="flex-1 text-[14px] leading-[140%] font-semibold text-[#474747]">
            동아리명
          </span>
          <span className="w-[160px] text-[14px] leading-[140%] font-semibold text-[#474747]">
            분류
          </span>
          <span className="w-[100px]" />
        </div>

        <AsyncBoundaryWithQuery
          pendingFallback={
            <div className="py-10 text-center text-[14px] leading-[140%] font-medium text-[#8B95A1]">
              불러오는 중...
            </div>
          }
          rejectedFallback={
            <div className="py-10 text-center text-[14px] leading-[140%] font-medium text-[#8B95A1]">
              불러오기에 실패했습니다.
            </div>
          }
        >
          <ClubList searchClubQuery={searchClubQuery} />
        </AsyncBoundaryWithQuery>
      </div>
    </div>
  );
}

export default ClubManagementWidget;
