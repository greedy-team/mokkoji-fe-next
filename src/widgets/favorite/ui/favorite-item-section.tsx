import { auth } from '@/auth';
import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getFavoriteList from '../api/getFavoriteList';
import FavoriteItemList from './favorite-item-list';

const MAX_FAVORITE_SIZE = 100;

async function FavoriteItemSection() {
  const session = await auth();

  if (!session) {
    return (
      <h1 className="mt-10 mb-5 text-sm font-bold text-[#00E457] lg:text-2xl">
        로그인 후 이용하실 수 있습니다.
      </h1>
    );
  }

  const data = await getFavoriteList({ page: 1, size: MAX_FAVORITE_SIZE });

  if (!data.ok || !data.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <FavoriteItemList
      clubs={data.data.clubs}
      totalElements={data.data.pagination.totalElements}
    />
  );
}

export default FavoriteItemSection;
