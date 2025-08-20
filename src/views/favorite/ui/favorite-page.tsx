import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { SearchParams } from '@/views/favorite/model/type';

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
        <FavoriteItemSection page={page} size={size} />
        <FavoriteDateSection />
      </div>
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
