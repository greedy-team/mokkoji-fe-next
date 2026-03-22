import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import ClubHeader from '@/widgets/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

function ClubPage() {
  return (
    <>
      <ScrollProgressBar />
      <div className="mx-auto w-full sm:w-4xl lg:w-6xl">
        <ClubHeader />
        <div className="mx-auto w-full sm:w-4xl lg:w-6xl">
          <Suspense fallback={<ItemListSkeletonLoading />}>
            <ClubItemList />
          </Suspense>
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
