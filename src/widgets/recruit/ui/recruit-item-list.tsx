'use client';

import { ClubCategory } from '@/shared/model/type';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import { useSearchParams } from 'next/navigation';
import { Session } from 'next-auth';
import RecruitItemClientList from './recruit-item-client-list';
import useClubRecruitList from '../model/useClubRecruitList';

function RecruitItemList({ session }: { session: Session | null }) {
  const params = useSearchParams();
  const { data } = useClubRecruitList({
    page: Number(params.get('page') || 1),
    size: Number(params.get('size') || 1000),
    category: params.get('category')?.toUpperCase() as ClubCategory,
    session,
  });

  if (!data) {
    return <ErrorBoundaryUi />;
  }

  if (data?.recruitments.length === 0) {
    return (
      <p className="mt-30 w-full text-center text-sm font-bold text-[#00E457]">
        모집 공고가 없습니다.
      </p>
    );
  }

  return (
    <Suspense
      fallback={
        <ItemListSkeletonLoading
          title="모집 공고"
          description="모집 공고를 불러오는 중입니다."
        />
      }
    >
      <RecruitItemClientList recruitments={data?.recruitments} />
    </Suspense>
  );
}

export default RecruitItemList;
