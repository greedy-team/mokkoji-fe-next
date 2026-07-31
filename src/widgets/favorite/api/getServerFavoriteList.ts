import 'server-only';
import api from '@/shared/api/auth-api';
import type { FavoriteList } from '@/shared/model/type';

interface GetServerFavoriteListParams {
  page: number;
  size: number;
}

async function getServerFavoriteList({
  page,
  size,
}: GetServerFavoriteListParams): Promise<FavoriteList> {
  const json = await api
    .get('favorites', {
      searchParams: { page: String(page), size: String(size) },
    })
    .json<{ data: FavoriteList }>();
  return json.data;
}

export default getServerFavoriteList;
