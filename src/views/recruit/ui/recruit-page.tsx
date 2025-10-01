import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import { RecruitItemListProps } from '@/widgets/recruit/model/type';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';

function RecruitPage({ searchParams }: RecruitItemListProps) {
  return (
    <>
      <div className="w-full sm:w-4xl lg:w-6xl">
        <Suspense
          fallback={
            <ItemListSkeletonLoading
              data-testid="skeleton"
              title="모집 공고"
              description={
                '관심 있는 동아리의 최신 모집 공고를\n한눈에 확인할 수 있어요.'
              }
            />
          }
        >
          <RecruitHeader />
          <RecruitItemList searchParams={searchParams} />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
