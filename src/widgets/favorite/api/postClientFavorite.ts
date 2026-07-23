import clientApi from '@/shared/api/client-api';

async function postClientFavorite(clubId: number): Promise<void> {
  await clientApi.post(`/api/favorites/${clubId}`);
}

export default postClientFavorite;
