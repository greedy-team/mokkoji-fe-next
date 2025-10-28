import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/shared/ui/scroll-top-button';
import { Suspense } from 'react';
import FavoriteListSkeletonLoading from '@/entities/favorite/ui/favorite-list-skeleton-loading';

async function FavoritePage() {
  return (
    <>
      <div className="mx-auto w-full px-4 sm:w-4xl sm:px-5 lg:w-6xl">
        <Suspense fallback={<FavoriteListSkeletonLoading />}>
          <FavoriteItemSection />
        </Suspense>
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
