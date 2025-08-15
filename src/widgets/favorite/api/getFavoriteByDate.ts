'use server';

import authApi from '@/shared/api/auth-api';
import { ApiResponse } from '@/shared/model/type';
import { FavoriteDateItem } from '@/views/favorite/model/type';

interface GetFavoriteByDateParams {
  yearMonth: string;
}

async function getFavoriteByDate({ yearMonth }: GetFavoriteByDateParams) {
  const response: ApiResponse<FavoriteDateItem[]> = await (await authApi())
    .get(`favorites/recruit?yearMonth=${yearMonth}`, {})
    .json();
  return response;
}

export default getFavoriteByDate;
