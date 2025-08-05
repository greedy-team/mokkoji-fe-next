import FavoriteDateSection from '@/widgets/favorite/ui/favorite-date-section';
import FavoriteItemSection from '@/widgets/favorite/ui/favorite-item-section';
import getFavoriteList from '@/widgets/favorite/api/getFavoriteList';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import ScrollTopButton from '@/features/recruit/ui/scroll-top-button';
import { auth } from '@/auth';
import SearchParams from '@/views/favorite/model/type';

async function FavoritePage({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams?.page ?? '1');
  const size = Number(searchParams?.size ?? '6');

  const session = await auth();
  let data;
  let login;
  if (!session) {
    data = { clubs: [] };
    login = false;
  } else {
    try {
      data = await getFavoriteList({ page, size });
    } catch (error) {
      return <ErrorBoundaryUi />;
    }
    login = true;
  }

  return (
    <>
      <FavoriteItemSection
        data={data.clubs}
        login={login}
        page={data.pagination?.page || 1}
        size={data.pagination?.size || 6}
        total={data.pagination?.totalElements || 1}
      />
      <FavoriteDateSection data={data.clubs} login={login} />
      <ScrollTopButton />
    </>
  );
}

export default FavoritePage;
