import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { SearchParams } from '@/views/favorite/model/type';
import { Suspense } from 'react';
import FavoriteListSkeletonLoading from '@/shared/ui/favorite-list-skeleton-loading';

async function FavoritePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? '1');
  const size = Number(params.size ?? '6');

  return (
    <>
      <div className="mt-5 max-w-6xl px-6">
        <Suspense fallback={<FavoriteListSkeletonLoading />}>
          <FavoriteItemSection page={page} size={size} />
        </Suspense>
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
