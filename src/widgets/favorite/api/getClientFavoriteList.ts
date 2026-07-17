import ky from 'ky';
import type { FavoriteList } from '@/shared/model/type';

interface GetClientFavoriteListParams {
  page: number;
  size: number;
}

async function getClientFavoriteList({
  page,
  size,
}: GetClientFavoriteListParams): Promise<FavoriteList> {
  const json = await ky
    .get('/api/favorites', {
      searchParams: { page: String(page), size: String(size) },
    })
    .json<{ data: FavoriteList }>();
  return json.data;
}

export default getClientFavoriteList;
