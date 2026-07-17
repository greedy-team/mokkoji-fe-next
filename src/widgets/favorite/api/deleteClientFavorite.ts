import ky from 'ky';

async function deleteClientFavorite(clubId: number): Promise<void> {
  await ky.delete(`/api/favorites/${clubId}`);
}

export default deleteClientFavorite;
