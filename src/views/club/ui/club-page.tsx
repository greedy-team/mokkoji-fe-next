import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import RecruitHeader from '@/entities/club/ui/recruit-header';
import RecruitItemList from '@/widgets/club/ui/recruit-item-list';

function ClubPage() {
  return (
    <>
      <div className="w-full sm:w-4xl lg:w-6xl">
        <Suspense
          fallback={
            <ItemListSkeletonLoading
              title="전체 동아리"
              description="우리 학교엔 이런 동아리들이 있어요."
              header
            />
          }
        >
          <RecruitHeader />
          <RecruitItemList />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
