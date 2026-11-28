import clientApi from '@/shared/api/client-api';

async function deleteClientFavorite(clubId: number): Promise<void> {
  await clientApi.delete(`favorites/${clubId}`);
}

export default deleteClientFavorite;
