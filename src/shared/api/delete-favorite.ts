'use server';

import authApi from '@/shared/api/auth-api';

async function deleteFavorite(clubId: number) {
  const response = await (await authApi()).delete(`favorites/${clubId}`).json();

  return response;
}

export default deleteFavorite;
