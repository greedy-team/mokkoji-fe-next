import clientApi from '@/shared/api/client-api';

async function deleteClientFavorite(clubId: number): Promise<void> {
  await clientApi.delete(`api/favorites/${clubId}`);
}

export default deleteClientFavorite;
