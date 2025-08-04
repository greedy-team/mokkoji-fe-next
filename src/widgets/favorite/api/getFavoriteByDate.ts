import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/type';
import { FavoriteDateList } from '@/views/favorite/model/type';

interface GetFavoriteByDateParams {
  yearMonth: string;
  accessToken: string;
}

async function getFavoriteByDate({
  yearMonth,
  accessToken,
}: GetFavoriteByDateParams) {
  const response: ApiResponse<FavoriteDateList> = await serverApi
    .get(`favorites/recruit?yearMonth=${yearMonth}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();
  return response.data;
}

export default getFavoriteByDate;
