import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import ItemListSkeletonLoading from '@/shared/ui/item-list-skeleton-loading';
import ClubHeader from '@/widgets/club/ui/club-header';
import ClubItemList from '@/widgets/club/ui/club-item-list';
import PageContainer from '@/shared/ui/page-container';
import ScrollProgressBar from '@/shared/ui/scroll-progress-bar';

function ClubPage() {
  return (
    <>
      <PageContainer>
        <ScrollProgressBar />
        <ClubHeader />
        <Suspense fallback={<ItemListSkeletonLoading />}>
          <ClubItemList />
        </Suspense>
      </PageContainer>
      <ScrollTopButton />
    </>
  );
}

export default ClubPage;
