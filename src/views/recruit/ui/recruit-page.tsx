import RecruitHeader from '@/entities/recruit/ui/recruit-header';
import RecruitItemList from '@/widgets/recruit/ui/recruit-item-list';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
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
        <RecruitHeader />
        <Suspense
          fallback={
            <ItemListSkeletonLoading
              title="모집 공고"
              description="모집 공고를 불러오는 중입니다."
            />
          }
        >
          <RecruitItemList searchParams={searchParams} />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}
export default RecruitPage;
