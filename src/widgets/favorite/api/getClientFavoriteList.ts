import clientApi from '@/shared/api/client-api';
import type { FavoriteList } from '@/shared/model/type';

interface GetClientFavoriteListParams {
  page: number;
  size: number;
}

async function getClientFavoriteList({
  page,
  size,
}: GetClientFavoriteListParams): Promise<FavoriteList> {
  const json = await clientApi
    .get('/api/favorites', {
      searchParams: { page: String(page), size: String(size) },
    })
    .json<{ data: FavoriteList }>();
  return json.data;
}

export default getClientFavoriteList;
