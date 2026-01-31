import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getFavoriteList from '../api/getFavoriteList';
import FavoriteItemList from './favorite-item-list';

const MAX_FAVORITE_SIZE = 100;

async function FavoriteItemSection() {
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
