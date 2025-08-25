import ClubHeader from '@/entities/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';

function ClubPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <div className="mx-auto sm:w-4xl lg:w-6xl">
        <Suspense
          fallback={
            <ItemListSkeletonLoading
              title="전체 동아리"
              description="우리 학교엔 이런 동아리들이 있어요."
            />
          }
        >
          <ClubHeader />
          <ClubItemList searchParams={searchParams} />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
