'use server';

import authApi from '@/shared/api/auth-api';

async function postFavorite(clubId: number) {
  const response = await (await authApi()).post(`favorites/${clubId}`).json();

  return response;
}

export default postFavorite;
