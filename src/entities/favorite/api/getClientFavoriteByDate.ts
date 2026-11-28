import clientApi from '@/shared/api/client-api';
import type { FavoriteDateItem } from '@/entities/favorite/model/type';

async function getClientFavoriteByDate(
  yearMonth: string,
): Promise<FavoriteDateItem[]> {
  const json = await clientApi
    .get('api/favorites/recruit', {
      searchParams: { yearMonth },
    })
    .json<{ data: FavoriteDateItem[] }>();
  return json.data ?? [];
}

export default getClientFavoriteByDate;
