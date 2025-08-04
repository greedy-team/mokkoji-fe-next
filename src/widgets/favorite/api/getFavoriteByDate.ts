import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import { FavoriteDateList } from '@/views/favorite/model/type';

interface GetFavoriteByDateParams {
  yearMonth: string;
}

async function getFavoriteByDate({ yearMonth }: GetFavoriteByDateParams) {
  const response: ApiResponse<FavoriteDateList> = await authApi
    .get('favorites/recruit', {
      json: { yearMonth },
    })
    .json();
  return response.data;
}

export default getFavoriteByDate;
