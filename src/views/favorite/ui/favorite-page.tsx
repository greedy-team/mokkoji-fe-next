import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { SearchParams } from '@/views/favorite/model/type';

async function FavoritePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams.searchParams;
  const page = Number(params?.page ?? '1');
  const size = Number(params?.size ?? '6');

  return (
    <>
      <FavoriteItemSection page={page} size={size} />
      <FavoriteDateSection />
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
