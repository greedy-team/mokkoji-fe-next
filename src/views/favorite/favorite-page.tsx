import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import getFavoriteList from '@/widgets/favorite/api/getFavoriteList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';

async function FavoritePage() {
  let data;
  try {
    data = await getFavoriteList();
  } catch (error) {
    return <ErrorBoundaryUi />;
  }
  return (
    <>
      <FavoriteItemSection data={data.data} />
      <FavoriteDateSection data={data.data} />
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
