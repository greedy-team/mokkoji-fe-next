import ky from 'ky';

async function postClientFavorite(clubId: number): Promise<void> {
  await ky.post(`/api/favorites/${clubId}`);
}

export default postClientFavorite;
