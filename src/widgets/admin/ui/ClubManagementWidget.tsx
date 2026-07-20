'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { AsyncBoundaryWithQuery } from '@/shared/ui/AsyncBoundary';
import filterClubsByName from '@/features/admin/model/filter-clubs';
import useAdminClubs from '@/widgets/admin/ui/use-admin-clubs';
import { ClubCategoryLabel } from '@/shared/model/type';
import ClubManagementRow from '@/features/admin/ui/ClubManagementRow';
import DeleteDialog from '@/features/admin/ui/DeleteDialog';
import deleteClubMutationOptions from '@/features/admin/api/mutations';

interface ClubListProps {
  searchClubQuery: string;
}

function ClubList({ searchClubQuery }: ClubListProps) {
  const queryClient = useQueryClient();
  const {
    clubs,
    universityCode,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminClubs();

  const { mutate: deleteClubMutate, isPending: isDeleting } = useMutation({
    ...deleteClubMutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'clubs'] });
    },
  });

  useEffect(() => {
    if (searchClubQuery && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [searchClubQuery, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredClubs = filterClubsByName(clubs, searchClubQuery);

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const [deleteTarget, setDeleteTarget] = useState<{
    clubId: number;
    clubName: string;
  } | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteClubMutate(deleteTarget.clubId);
      setDeleteTarget(null);
    }
  };

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
          key={club.clubId}
          index={index + 1}
          clubId={club.clubId}
          universityCode={universityCode}
          name={club.clubName}
          category={ClubCategoryLabel[club.category]}
          disabled={isDeleting}
          onDelete={() =>
            setDeleteTarget({ clubId: club.clubId, clubName: club.clubName })
          }
        />
      ))}
      {isFetchingNextPage && (
        <div className="py-6 text-center text-[14px] leading-[140%] font-medium text-[#8B95A1]">
          불러오는 중...
        </div>
      )}
      <div ref={sentinelRef} className="h-4" />

      <DeleteDialog
        targetName={deleteTarget?.clubName}
        open={deleteTarget !== null}
        pending={isDeleting}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
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
