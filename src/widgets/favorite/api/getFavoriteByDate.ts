import serverApi from '@/shared/api/server-api';
import { ApiResponse } from '@/shared/model/type';
import { FavoriteDateItem } from '@/views/favorite/model/type';

interface GetFavoriteByDateParams {
  yearMonth: string;
  accessToken: string;
}

async function getFavoriteByDate({
  yearMonth,
  accessToken,
}: GetFavoriteByDateParams) {
  console.log(yearMonth);

  const response: ApiResponse<FavoriteDateItem[]> = await serverApi
    .get(`favorites/recruit?yearMonth=${yearMonth}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json();
  return response;
}

export default getFavoriteByDate;
