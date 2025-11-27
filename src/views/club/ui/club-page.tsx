import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import ClubHeader from '@/widgets/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';

function ClubPage() {
  return (
    <>
      <div className="w-full sm:w-4xl lg:w-6xl">
        <ClubHeader />
        <Suspense fallback={<ItemListSkeletonLoading />}>
          <ClubItemList />
        </Suspense>
      </div>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
