import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import { RecruitmentSearchParams } from '@/shared/model/recruit-type';

async function RecruitPage({
  searchParams,
}: {
  searchParams: Promise<RecruitmentSearchParams>;
}) {
  return (
    <>
      <div className="w-full sm:w-4xl lg:w-6xl">
        <Suspense
          fallback={
            <ItemListSkeletonLoading
              title="모집 공고"
              description={
                '관심 있는 동아리의 최신 모집 공고를\n한눈에 확인할 수 있어요.'
              }
              header
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
