import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import getFavoriteList from '@/widgets/favorite/api/getFavoriteList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { auth } from '@/auth';

async function FavoritePage() {
  const session = await auth();
  let data;
  let login;
  if (!session) {
    data = { data: [] };
    login = false;
  } else {
    try {
      data = await getFavoriteList();
    } catch (error) {
      return <ErrorBoundaryUi />;
    }
    login = true;
  }

  return (
    <>
      <FavoriteItemSection data={data.data} login={login} />
      <FavoriteDateSection data={data.data} login={login} />
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
