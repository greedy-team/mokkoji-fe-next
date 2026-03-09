import ErrorBoundaryUi from '@/shared/ui/error-boundary-ui';
import getFavoriteList from '../api/getFavoriteList';
import FavoriteItemList from './favorite-item-list';

const MAX_FAVORITE_SIZE = 100;

async function FavoriteItemSection() {
  const favoriteListResponse = await getFavoriteList({
    page: 1,
    size: MAX_FAVORITE_SIZE,
  });

  if (!favoriteListResponse.ok || !favoriteListResponse.data) {
    return <ErrorBoundaryUi />;
  }

  return (
    <FavoriteItemList
      clubs={favoriteListResponse.data.clubs}
      totalElements={favoriteListResponse.data.pagination.totalElements}
    />
  );
}

export default FavoriteItemSection;
